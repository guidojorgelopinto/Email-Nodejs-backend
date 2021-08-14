const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {

    // Login
    signIn(req, res) {

        let { email, password } = req.body;

        // Buscar usuario
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {

            if (!user) {
                res.status(404).json({ msg: "Usuario con este correo no encontrado" });
            } else {

                if (bcrypt.compareSync(password, user.password)) {

                    // Creamos el token
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });

                    res.json({
                        user: user,
                        token: token
                    })

                } else {

                    // Unauthorized Access
                    res.status(401).json({ msg: "Contraseña incorrecta" })
                }
            }

        }).catch(err => {
            res.status(500).json(err);
        })
    },

    // Registro
    signUp(req, res) {

        // Encriptamos la contraseña
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        // Crear un usuario
        User.create({
            lastName: req.body.lastName,
            name: req.body.name,
            userName: req.body.userName,
            email: req.body.email,
            password: password,
            password2: req.body.password2,
            city: req.body.city,
            country: req.body.country,

        }).then(user => {

            // Creamos el token
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.json({
                user: user,
                token: token
            });

        }).catch(err => {
            res.status(500).json(err);
        });

    },

    async findMail(req, res, next) {

        let { to } = req.body;

        // Buscar usuario
        let usuario = await User.findOne({
            where: {
                email: to
            }
        });

        if (!usuario || usuario.length === 0) { 
            // res.status(404).json({ msg: "Usuario no encontrado" });
            res.json({mensaje: 'ERROR'});
        } else {
            req.body.to = usuario.id;
            req.body.userId = req.user.id;
            next();
        }
    },
}