const { Router } = require('express');
const { multer } = require('../conf/cloud');

const { usersController } = require('../controllers');

const router = Router();

router.post('/', multer.single('image'), usersController.save)
router.get('/', usersController.get);


module.exports = router





// const { check } = require('express-validator');

// const { validateFields } = require('../middlewares/');

// const { existEmail } = require('../helpers')


// router.post('/', [
//     check('name', 'Name required').notEmpty(),
//     check('email', 'Invalid email').isEmail(),
//     check('email').custom(existEmail),
//     check('email', 'Email required').notEmpty(),
//     check('password', 'Password required').notEmpty(),
//     check('biography', 'Biography required').notEmpty(),
//     check('image', 'Image required').notEmpty(),
//     multer.single('image'),
//     validateFields
// ], usersController.save)