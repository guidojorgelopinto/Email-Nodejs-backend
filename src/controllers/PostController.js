const { Post } = require('../models/Post');

module.exports = {

    async find(req, res, next) {
        let post = await Post.findByPk(req.params.id);

        if (!post) {
            res.status(404).json({ msg: "El post no encontrado" });
        } else {
            req.post = post;
            next();
        }
    },

    async findDest(req, res, next) {

        //  Model.post.findAll({
        //     where: {
        //         attr1: 42,
        //         attr2: 'cake'
        //     }
        //     });
            

        let post = await Post.findAll({
            where: {
                to: req.user.id
            }
        });
    
        if (post.length === 0) { 
            res.status(404).json({ msg: "El post no encontrado" });
        } else {
            req.post = post;
            next();
        }
    },

    async index(req, res) {
        let posts = await Post.findAll();

        res.json(posts);
    },

    // Show
    async show(req, res) {
        res.json(req.post);
    },

        // Create
        async create(req, res) {
            req.post.to = req.body.to;
            req.post.userId = req.body.userId;
            req.post.title = req.body.title;
            req.post.body = req.body.body;
    
            req.post.save().then(post => {
                res.json(post);
            })
    
        },

    // Update
    async update(req, res) {

        req.post.title = req.body.title;
        req.post.body = req.body.body;

        req.post.save().then(post => {
            res.json(post);
        })

    },

    // Delete
    async delete(req, res) {
        req.post.destroy().then(post => {
            res.json({ msg: "El post ha sido eliminado " });
        })
    },

}