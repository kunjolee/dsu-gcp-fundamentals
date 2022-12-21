const { Router } = require('express');
const { body } = require('express-validator');

const { authController } = require('../controllers');
const { validateFields } = require('../middlewares/');

const router = Router();

router.post('/', [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password required').notEmpty(),
    validateFields
] ,authController.login);

router.get('/verify', authController.verifyAuth)


module.exports = router