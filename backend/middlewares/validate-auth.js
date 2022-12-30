const { verifyJWT } = require("../helpers");
const User = require("../models/user");


const validateAuth = async ( req, res, next ) => {

    const token = req.header('token');

    try {
        const uid = await verifyJWT( token );
        const user = await User.findByPk(uid);

        if (!user) {
            return res.status(400).json({ msg: 'No user with that ID that is coming from the authentication' })
        }

        req.authUser = user;

        next();

    } catch (error) {
        console.log('error validate auth', error);
        res.status(500).json({
            msg: 'Error in server validate auth'
        });
    }
}


module.exports = {
    validateAuth
}