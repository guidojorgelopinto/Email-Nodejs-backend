const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middlewares/auth');

//policies
const PostPolicy = require('../policies/PostPolicy');

// Controllers
const AuthController = require('../controllers/AuthController');
const PostController = require('../controllers/PostController');

// Home
router.get('/', (req, res) => res.json({ hello: "World" }));

//login y registro
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

// Rutas posts: token valido - busco post - validacion de usuario - sesion

router.get('/api/posts', auth, PostController.findDest, PostController.show);
router.get('/api/posts', auth, PostController.findRemit, PostController.show);
router.post('/api/posts', PostPolicy.show, PostController.index);
router.post('/api/posts/:id', PostPolicy.show, PostController.index);
router.get('/api/posts/:id', auth, PostController.find, PostPolicy.show, PostController.show);
router.patch('/api/posts/:id', auth, PostController.find, PostPolicy.update, PostController.update);
router.delete('/api/posts/:id', auth, PostController.find, PostPolicy.delete, PostController.delete);

module.exports = router;
