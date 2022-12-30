const validateFields = require('./validate-fields');
const validateAuth =  require('./validate-auth')

module.exports = {
    ...validateFields,
    ...validateAuth
}