const { Router } = require('express');

const { usersController } = require('../controllers')

const router = Router();

router.get('/', usersController.get)


module.exports = router