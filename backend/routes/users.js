const { Router } = require('express');
const { multer } = require('../conf/cloud');

const { usersController } = require('../controllers');

const router = Router();

router.post('/', multer.single('image'), usersController.save)
router.get('/', usersController.get);


module.exports = router




