const { response } = require('express')
const db = require('../db/connection')

const getProfile = async(req, res = response ) => {
    try {
        const { id: idUser } = req.params;
    
        const [ validationResults ] = await db.query(`select id from users where id = ${ idUser }`);
    
        if(validationResults.length < 1){
            return res.status(400).json({
                msg: `User not found`
            });
        }

        const photosQuery = `
            select id as "idPhoto", url, description, state from photos p 
            where p.id not in ( select ad."photoId" from "albumDetails" ad ) and "idUser" = ${ idUser }
            order by "createdAt" desc
        `
        const albumsQuery = `select id as "idAlbum", name as "album", id from albums where "idUser" = ${ idUser }`

        const usersQuery = ` select id, name, email, biography, image from users where id = ${ idUser }`


        const [ [ photosResults ], [ albumsResults ], [ usersResults ] ] = await Promise.all([
            db.query( photosQuery ),
            db.query( albumsQuery ),
            db.query( usersQuery ),
        ])

        res.json({
            user: usersResults[0],
            photos: photosResults,
            albums: albumsResults
        });
        
    } catch (error) {
        console.log('error user profile API - contact your admin', error);
        res.status(500).json({
            msg: 'Error getting user profile - contact your admin'
        })
    }
}

const getUsers = async ( req, res ) => {
    try {
        const [users] = await db.query('select u.id, u."name", u.email, u.biography, u.image from users u')

        res.status(200).json({
            users
        });
        
    } catch (error) {
        console.log('Error server getting users - controllers', error);

        res.status(500).json({
            msg: 'Error server cloud function - contact your admin'
        });
    }
}

module.exports = {
    getProfile,
    getUsers
}