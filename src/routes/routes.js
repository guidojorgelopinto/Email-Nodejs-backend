const express = require('express');
const router = express.Router();

//Controller

const AuthController = require('../controllers/AuthController');
const PostController = require('../controllers/PostController');

//home

router.get('/', (req, res) => res.json({ Hello: 'World!' }));


// api/singin - api/signin

router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);


//rutas post
router.get('/api/posts', PostController.index);


module.exports = router;
