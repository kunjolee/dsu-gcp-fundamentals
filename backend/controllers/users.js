const { request, response } = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/user');
const { generateJWT, uploadFileCloud } = require('../helpers/');

const save = async ( req = request, res = response ) => {
    try {

        const { file } = req;
        const { password='', email ,...rest } = req.body;

        const existUser = await User.findOne({
            where: {
                email
            }
        });

        if(existUser){
            return res.status(400).json({
                msg: 'Email already exist. Use other email'
            })
        }

        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(password, salt);

        const image = await uploadFileCloud({ file });
        
        const user = await User.create({
            ...rest,
            password: hash,
            image,
            email
        });

        const token = await generateJWT(user.id, user.email);

        res.status(201).json({
            msg: 'User saved successfully',
            token,
            user
        });


    } catch (error) {
        console.log('Error saving the user in controllers', error);
        res.status(500).json({
            msg: error, 
        })      
    }
}

const get = async ( req = request, res = response ) => {
    try {
        const users = await User.findAll();
           
        res.status(200).json({
            users
        });
        
    } catch (error) {
        console.log('Error server getting users - controllers', error);

        res.status(500).json({
            msg: 'Error server - contact your admin'
        });
    }
}

module.exports = {
    get,
    save
}