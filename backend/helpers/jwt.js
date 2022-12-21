const jwt = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = require('../conf/environment');

const generateJWT = (uid, email) => {
    return new Promise(( resolve, reject ) => {

        const options = {
            expiresIn: '3h'
        }

        const payload = {
            uid,
            email
        }

        jwt.sign(payload, JWT_PRIVATE_KEY, options, (err, token) => {
            if (err) {
                console.log('error generating the token', err);
                reject('Error generating your token');
            }

            resolve( token );
        });

    });
}

const verifyJWT = ( token ) => {
    if (!JWT_PRIVATE_KEY) {
        throw new Error('Environment variables: JWT_SECRET_KEY is not defined');
    }

    return new Promise(( resolve, reject ) => {

        try {
            jwt.verify( token, JWT_PRIVATE_KEY, (err,payload) => {
                if (err) {
                    console.log('error verifying your token - helper', err)
                    reject('invalid token');
                } else {
                    const { uid } = payload;
                    resolve(uid);
                }
            })
        } catch (error) {
            console.log('Verify JWT error in helper', error)
        }

    });
}

module.exports = {
    generateJWT,
    verifyJWT
}