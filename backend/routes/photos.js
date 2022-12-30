const { Router } = require('express');
const { multer } = require('../conf/cloud');

const { photosController } = require('../controllers');
const { validateAuth } = require('../middlewares/validate-auth');

const router = Router();

router.post('/', [
    validateAuth,
    multer.single('url')
], photosController.save);

router.post('/add-to-album', validateAuth, photosController.addToAlbum)

router.get('/', [
    validateAuth,
    multer.single('url')
] ,photosController.get);

router.put('/change-favorite/:id', [
    validateAuth,
], photosController.changeFavorite);

router.delete('/:id', [
    validateAuth,
], photosController.deletePhoto);

router.delete('/remove-album/:id', [
    validateAuth,
], photosController.removePhotoFromAlbum);





module.exports = router
