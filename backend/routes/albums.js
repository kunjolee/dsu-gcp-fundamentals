const { Router } = require('express');

const { multer } = require('../conf/cloud');
const { albumsController } = require('../controllers');
const { validateAuth } = require('../middlewares/');

const router = Router();

router.post('/', [
    validateAuth,
    multer.single('url')
], albumsController.save);

router.get('/', [ 
    validateAuth 
],albumsController.getAlbums);

router.get('/:idAlbum', [ 
    validateAuth 
],albumsController.getAlbumsWithPhoto);

router.delete('/:id', [
    validateAuth
], albumsController.deleteAlbum);


module.exports = router
