const path = require('path');
const { Storage } = require('@google-cloud/storage');
const { GOOGLE_APPLICATION_CREDENTIALS } = require('./environment')
const Multer = require('multer');

const gcStorage = new Storage({
    keyFilename: path.join(__dirname, GOOGLE_APPLICATION_CREDENTIALS ),
    projectId: 'gcp-fundamentals-372116',
});

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024
    }
  })

 module.exports = {
    gcStorage,
    multer
 }