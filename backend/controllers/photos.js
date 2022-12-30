const { response } = require('express');
const db = require('../db/connection');
const { uploadFileCloud } = require('../helpers');
const Album = require('../models/album');
const AlbumDetail = require('../models/albumDetail');
const Photo = require('../models/photo');
const User = require('../models/user');

const save = async (req, res = response) => {
    try {
        const { description } = req.body;
        const { authUser, file } = req; 

        const url = await uploadFileCloud({ file });

        await Photo.create({
            url,
            description,
            idUser: authUser.id
        });

        res.status(201).json({
            msg: 'Photo saved successfully'
        });


    } catch (error) {
        console.log('Error saving the Photo - controllers', error);

        res.status(500).json({
            msg: error
        });
    }
}

const get = async (req, res = response) => {
    try {

        const { authUser } = req;
        const { id } = authUser;
        
        const myQuery = `
            select 
                p.id, p.url, p.description, p.state, p."idUser"
            from photos p where p."idUser" = ${ id }
            order by "createdAt" desc
        `

        const [ photos ] = await db.query(myQuery)

        res.json({
            photos
        });

        
    } catch (error) {
        console.log('Error getting the photo - controllers', error);
        res.status(500).json({
            msg: 'Error getting the photo - contact your admin'
        });
    }
}

const changeFavorite = async (req, res =  response) => {

    const { authUser, params, body } = req;
    const { id = 0 } = params;
    const { state = 0 } = body; 


    try {
        const user = await User.findByPk( authUser.id );
        const photo = await Photo.findByPk( id );

        if ( !user ) {
            return res.status(400).json({ msg: 'User not found'})
        }
        
        if ( !photo ) {
            return res.status(400).json({ msg: `Photo with id ${id} does not exist`})
        }
        
        if ( authUser.id !== photo.idUser ) {
            return res.status(400).json({ msg: `This photo does not belong to ${ user.name }`})
        }
        
        await Photo.update({ state }, {
            where: {
                idUser: authUser.id,
                id
            }
        })


        if (state === 1 || state === '1') {
            res.json({ msg: 'successfully added to favorites'});
            
        } else if (state === 0 || state === '0') {
            res.json({ msg: 'successfully removed from favorites'});

        }
        
    } catch (error) {
        console.log('Error addFavorite - controllers',error);
        res.status(500).json({
            msg: 'Error add to favorite - contact your admin'
        });
    }
}

const deletePhoto = async (req, res = response) => {
    try {
        
        const { params, authUser } = req;
        const { id = '0' } = params;

        const user = await User.findByPk( authUser.id );
        const photo = await Photo.findByPk( id );
        
        if (!user) {
            res.status(400).json({
                msg: 'User not found'
            });
        }

        if ( !photo ) {
            return res.status(400).json({ msg: `Photo with id ${id} does not exist`})
        }
        
        if ( authUser.id !== photo.idUser ) {
            return res.status(400).json({ msg: `This photo does not belong to ${ user.name }`})
        }
        
        const albumDetail = await AlbumDetail.findOne({
            where: {    
                photoId: id
            }
        });
        
        // si intenta eliminar una foto que esta en un album debe dar error (las fotos agregadas a un album se pueden eliminar solo dentro de ese album);

        if (albumDetail) {

            return res.status(400).json({
                msg: `You can't delete this picture. It belongs to an album`
            })
        };
        
        await Photo.destroy({
            where: {
                id,
                idUser: authUser.id,
            },
        });

        res.status(200).json({
            msg: 'Photo deleted successfully'
        })

    } catch (error) {
        console.log('Error delete photo - controllers', error);
        res.status(500).json({
            msg: 'Server error - contact your admin'
        });

    }
}

const removePhotoFromAlbum = async (req, res = response) => {
            
     try {
        const { id = 0 } = req.params;
        const albumDetail =  await AlbumDetail.findByPk( id );
    
    
        if (!albumDetail) {
            return res.status(400).json({
                msg: 'Album with foto - id not found' 
            });
        }
    
        const [ results ] = await db.query(`select * from "albumDetails" where "albumId"=${albumDetail.albumId}`)
        
        if (results.length === 1) {
            return res.status(400).json({
                msg: `Can't remove photo - This album contains only one photo`
            })
        };

        await AlbumDetail.destroy({
            where: {
                id,
            },
        });


        res.status(200).json({
            msg: 'Photo removed from album successfully'
        });

    } catch (error) {
        console.log('error remove photo from album',error);
        res.status(500).json({
            msg: 'Server error - contact your adming'
        })
    }
}

const addToAlbum = async ( req, res = response ) => {
    const { authUser, body } = req;
    const { idAlbum = 0 , idPhoto = 0} = body;
    try {

        const [ album, photo, user ] = await Promise.all([
             Album.findByPk(idAlbum),
             Photo.findByPk(idPhoto),
             User.findByPk(authUser.id),
        ]);

        // res.json({
        //     msg: 'test'
        // })
        // return; 
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
        if (!photo) {
            return res.status(400).json({
                msg: 'Photo not found'
            });
        }

        if (album.idUser !== user.id) {
            return res.status(400).json({
                msg: `Album does not belong to ${user.name}`
            });
        }

        if (photo.idUser !== user.id) {
            return res.status(400).json({
                msg: `Photo does not belong to ${user.name}`
            });
        }

        const albumDetail = await AlbumDetail.findOne({
            where: {
                photoId: idPhoto,
                albumId: idAlbum
            }
        });

        if (albumDetail) {
            return res.status(400).json({
                msg: `This photo already exist in ${album.name} album`
            })
        }

        await AlbumDetail.create({
            photoId: idPhoto,
            albumId: idAlbum
        });

        res.json({
            msg: `Photo added to ${album.name} album successfully`,
        });

    } catch (error) {
        console.log('error add photo to an album - controllers', error);
        res.status(500).json({
            msg: 'Server error - contact your admin'
        });
    }
}

module.exports = {
    changeFavorite,
    deletePhoto,
    get,
    removePhotoFromAlbum,
    save,
    addToAlbum
}