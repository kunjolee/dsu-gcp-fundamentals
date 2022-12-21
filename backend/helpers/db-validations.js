const User = require('../models/user')

const existEmail = async ( email ) => {

    const user = await User.findOne({
        where: {
            email
        }
    })

    if (user) return Promise.reject(`${ email } already exist`)
}

module.exports = {
    existEmail
}