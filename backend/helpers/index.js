const jwt           = require('./jwt');
const dbValidations = require('./db-validations');
const uploadFile    = require('./upload-file.js');

module.exports = {
    ...jwt,
    ...dbValidations,
    ...uploadFile,
}