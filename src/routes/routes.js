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

// Rutas posts: token valido - buscamos post - validacion de usuario
router.get('/api/posts', PostController.index); //(le falta el auth//)
router.get('/api/posts/:id', PostController.find, PostPolicy.show, PostController.show); //(le falta el auth//)
router.patch('/api/posts/:id', auth, PostController.find, PostPolicy.update, PostController.update);
router.delete('/api/posts/:id', auth, PostController.find, PostPolicy.delete, PostController.delete);

module.exports = router;
