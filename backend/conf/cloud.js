const path = require('path');
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');

const gcStorage = new Storage({
    keyFilename: path.join(__dirname, '../gcp-fundamentals-372116-b914cd7ab424.json'),
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