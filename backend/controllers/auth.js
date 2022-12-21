const { request, response } = require('express');
const User = require('../models/user');

const bcryptjs = require('bcryptjs');

const { generateJWT, verifyJWT } = require('../helpers');

const login = async ( req = request, res = response ) => {
    // TODO: login done now i have to implement it to the frontend part
    try {
        
        const { email='', password='' } = req.body;

        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({
                msg: 'User not founded'
            });
        }

        if( !bcryptjs.compareSync(password, user.password) ) {
            return res.status(400).json({
                msg: 'Invalid authentication - user credentials do not coincide'
            })
        }

        const token = await generateJWT(user.id, user.email);

        res.status(200).json({
            msg: 'Authenticated successfully',
            token,
            user
        });


    } catch (error) {
        console.log('error in login - Contact your admin', error)
        res.status(500).json({
            ok: false,
            msg: 'error in login - Contact your admin'
        });
    }
}


const verifyAuth = async ( req = request, res = response ) => {
    const token = req.header('token');

    try {
        const uid = await verifyJWT( token );

        const user = await User.findByPk( uid );

        if (!user) {
            return res.status(400).json({ msg: 'No user with that ID' });
        }

        res.status(200).json({
            msg: 'Successfully verified',
            token,
            user
        });

    } catch (error) {
        console.log('error verify token in controller - ', error);
        res.status(400).json({
            msg: 'Error in verifyAuth controller - invalid token '
        });
    }
}

module.exports = {
    login,
    verifyAuth
}