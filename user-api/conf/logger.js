const winston =  require('winston');

const { LoggingWinston: GoogleTransport } = require('@google-cloud/logging-winston');
const expressWinston = require('express-winston');

const createLogger = () => {
    const transports = [ new winston.transports.Console({ level: 'info' }) ]

    if ( !process.env.GOOGLE_APPLICATION_CREDENTIALS ) {
        console.error('No service account. Env $GOOGLE_APPLICATION_CREDENTIALS=gcp-fundamentals-372116-b914cd7ab424.json')
        
        throw new Error();
    }

    transports.push(new GoogleTransport({
        enabled: true,
        logName: 'default',
        resource: {
            type: 'generic_node',
            labels: {
                node_id: 'mypicz-app',
                localtion: 'default',
                namespace: 'mypicz-app'
            }
        }

    }))

    const logger = winston.createLogger({
        level: 'info',
        transports
    });

    logger.info({
        message: 'initializing stackdriver '
    });

    const requestLogger = expressWinston.logger({
        winstonInstance: logger
    });

    return {
        logger,
        requestLogger
    }
}

const { requestLogger, logger } = createLogger();

const logEvent = ( message, { status, action, ...rest } ) => {

    const logFunc = status === 'FAILURE' ? logger.error : logger.info

    const eventInfo = {
        ...rest,
        status,
        action,
        type: 'EVENT'
    }

    logFunc(`${ action } - ${ message }`, eventInfo)
}

const logSuccess = (message, info) => {
    logEvent(message, {
        ...info,
        status: 'SUCCESS'
    })
}

const logFailure = (message, info) => {
    logEvent(message, {
      ...info,
      status: 'FAILURE'
    })
}

module.exports = {
    requestLogger, 
    logger,
    logSuccess,
    logFailure
}
