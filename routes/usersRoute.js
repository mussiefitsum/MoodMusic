const express = require('express');
router = express.Router();
usersRoute = require('../controllers/usersControllers');

router.get('/', usersRoute.usersController);

module.exports = router;