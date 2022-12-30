const { response } = require('express');
const db = require('../db/connection');
const { uploadFileCloud } = require('../helpers');
const Album = require('../models/album');
const Photo = require('../models/photo');
const User = require('../models/user');

// TODO: Save the image without an album backend and frontend (make the page)


// PUedo eliminar una foto del album ( solo si el album tiene mas de 1 foto) porque un album siempre debe tener al menos 1 foto							

const save = async (req, res = response) => {
    try {

        const { file, authUser } = req;
        const { name='', description='' } = req.body;

        const publicUrl = await uploadFileCloud({ file });

        await Album.create({
            name,
            idUser: authUser.id,
            photos: [
                {
                    url: publicUrl,
                    description,
                    idUser: authUser.id,
                }
            ],
        }, {
            include: Photo
        });

        res.status(201).json({
            msg: 'Album saved successfully'
        });


    } catch (error) {
        console.log('Error saving the album - controllers', error);

        res.status(500).json({
            msg: error
        });
    }
}

const getAlbums = async ( req, res ) => {
    try {
        const { authUser } = req;
        const { id } = authUser;

        const [ albums ] = await db.query(`
            select a."id", a."name", a."idUser" from albums a where a."idUser" = ${ id }
        `);

        res.json({
            albums
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error get albums table - controller'
        });
    }

}

const getAlbumsWithPhoto = async ( req, res ) => {

    const { authUser, params } = req;
    const { idAlbum } = params;
    const { id } = authUser;

    const album = Album.findByPk( idAlbum );

    if (!album) {
        return res.status(400).json({
            msg: 'Album not found'
        });
    }

    try {
        const myQuery = `
            select 
                a."name" as "albumName",
                ad."id" as "AlbumDetailsId", ad."photoId" as "idPhoto", ad."albumId" as "idAlbum", 
                p.url, p.state
            
            from "albumDetails" ad
        
                join albums a on ad."albumId" = a.id
                join photos p on ad."photoId" = p.id
        
            where ad."albumId" = ${idAlbum} and a."idUser" = ${ id }
        `;

        const [ albums ] = await db.query(myQuery);

        res.status(200).json({
            albums
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error get albums with photo - controller'
        });
    }

}

const deleteAlbum = async (req, res = response) => {
    try {
        const { params, authUser } = req;
        const { id = 0} = params;

        const user = await User.findByPk( authUser.id );
        const album = await Album.findByPk( id );

        if (!user) {
            return res.status(400).json({
                msg: 'User not found'
            });
        }
        
        if (!album) {
            return res.status(400).json({
                msg: 'Album not found'
            });
        }

        if (user.id !== album.idUser) {
            return res.status(400).json({
                msg: `This album does not belong to ${user.name}`
            })
        }

        await Album.destroy({
            where:{
                id,
                idUser: authUser.id
            }
        });

        res.status(200).json({
            msg: 'Album deleted succesfully'
        });

    } catch (error) {
        console.log('Error delete the album - controllers', error);

        res.status(500).json({
            msg: 'Error delete album - controller'
        });
    }
}

module.exports = {
    save,
    getAlbums,
    deleteAlbum,
    getAlbumsWithPhoto
}

