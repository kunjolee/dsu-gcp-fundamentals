const { gcStorage } = require('../conf/cloud');
const { v4: uuidv4 } = require('uuid');

const uploadFileCloud = ({ file, validExtensions = ['png', 'jpg', 'jpeg', 'svg'] }) => {

    return new Promise (( resolve, reject ) => {

        const bucket = gcStorage.bucket('dsu-gcp-images');

        if (!file) {
            reject('Please upload an image!');
            return;
        }

        const { originalname, buffer } = file;

        const cutName   = originalname.split('.');
        const extension = cutName[ cutName.length - 1 ];

        if ( !validExtensions.includes(extension) ) {

            reject(`Invalid extension ${ extension } - ${ validExtensions }`);
            return;
        }

        const tmpName = uuidv4() + '.' +extension;
        const blob = bucket.file(tmpName);
        const blobStream = blob.createWriteStream();

        blobStream.on('finish', () => {
            resolve(blob.publicUrl())
        });

        blobStream.end(buffer);
    });
}


module.exports = {
    uploadFileCloud
}