const { Post } = require('../models/index');

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

    async findRemit(req, res, next) {            

        let post = await Post.findAll({
            where: {
                userId: req.user.id
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

    async create(req, res) {

        Post.create({
            to: req.body.to,
            title: req.body.title,
            body: req.body.body,
            userId: req.body.userId
        })
        .then(res.json({mensaje: 'OK'}))
        .catch(res.json({mensaje: 'ERROR'}));
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

        let post = await Post.findByPk(req.params.id);

        if (post) {
            post.destroy().then(() => {
                res.json({ msg: "El post ha sido eliminado " });
            })
        }
   },

}