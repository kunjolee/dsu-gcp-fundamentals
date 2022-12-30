const { Router } = require('express');

const { getProfile, getUsers } = require('../controllers/user');

const router = Router();

router.get('/:id', getProfile);
router.get('/', getUsers);


module.exports = router;
