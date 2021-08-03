const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middlewares/auth');

// Controllers
const AuthController = require('../controllers/AuthController');
const PostController = require('../controllers/PostController');

// Home
router.get('/', (req, res) => res.json({ hello: "World" }));

//login y registro
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

// Rutas posts
router.get('/api/posts', auth, PostController.index);
router.get('/api/posts/:id', auth, PostController.find, PostController.show);
router.patch('/api/posts/:id', auth, PostController.find,  PostController.update);
router.delete('/api/posts/:id', auth, PostController.find,  PostController.delete);

module.exports = router;
