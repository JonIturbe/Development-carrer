const express = require("express");
const bcrypt = require("bcrypt");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const User = require("./user.model");

const secret = "mi-string-secreto";

const validateJwt = expressJwt({ secret: secret, algorithms: ["HS256"] });
const signToken = _id => jwt.sign({ _id }, secret);

findAndAssingUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(401).end();
        }
    req.user = user;
    next();
    } catch (e) {
        next(e);
    }
}

const isAuthenticated = express.Router().use(validateJwt, findAndAssingUser);
const Auth = {
    login: async (req, res) => {
        const { body } = req;
        try {
            const user = await User.findOne({ email: body.email });
            if (!user) {
                res.status(401).send("Usuario y/o contraseña invalidos");
            } else {
                const isMatch = await bcrypt.compare(body.password, user.password);
                if (isMatch) {
                    const signed = signedToken(user._id);
                    res.status(200).send(signed);
            } else {
                res.status(401).send("Usuario y/o contraseña invalidos");
            }
        }
        } catch (e) {
            res.send(e.message);
        }
    },

    //Tanto register como login son handlers, porque son funciones que le vamos a pasar a express
    //app.get, post... siempre que se los pasemos a esos metodos, se les pueden llamar handlers. 
    register: async (req, res) => {
        const { body } = req;
        try {
            const isUser = await User.findOne({ enmail: body.email });
            if (isUser){
                res.send("Usuario ya existe");
            } else {
                const salt = await bcrypt.genSalt();
                const hashed = await bcrypt.hash(body.password, salt);
                const user = await User.create({ email: body.email, password: hashed, salt });

                const signed = signToken(user._id);
                res.send(signed);
            }
        } catch (e){
            res.status(500).send(e.message);
        }
    },
}

module.exports = { Auth, isAuthenticated }