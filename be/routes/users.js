var express = require('express');
var router = express.Router();

const Users = require('../controllers/users')


/* GET users listing. */
router.post('/signup', Users.signup);
router.post('/signin',Users.signin)
router.get('/isSignin',Users.isSignin)
router.get('/signout',Users.signout)



module.exports = router;










