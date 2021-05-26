
const Users = require('./users-model');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./../../config/secret');

const checkRegisterPayload = (req, res, next) => {
    if(!req.body.Username || !req.body.Password || !req.body.Role) {
        res.status(400).json({ message: 'Username, Password, and Role are required' })
    } else {
        next();
    }
}

const checkLoginPayload = (req, res, next) => {
    if(!req.body.Username || !req.body.Password) {
        res.status(400).json({ message: 'Username and Password required' })
    } else {
        next();
    }
}

const usernameUnique = async (req, res, next) => {
    try {
        const rows = await Users.getByUserId({ Username: req.body.Username })
        if(!rows.length) {
            next()
        } else {
            res.status(401).json({ message: 'Username already taken' })
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

const usernameExists = async (req, res, next) => {
    try {
        const rows = await Users.getByUserId({ UserName: req.body.userName })
        if(rows.length) {
            next()
        } else {
            res.status(400).json({ message: 'Username does not exist' })
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

const restricted = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        res.status(401).json({ message: 'token required' })
    } else {
        jwt.verify(token, jwtSecret, (error, decoded) => {
            if(error) {
                res.status(401).json({ message: 'token invalid' })
            } else {
                req.decodedToken = decoded;
                next();
            }
        })
    }
}

module.exports = {
    checkRegisterPayload,
    checkLoginPayload,
    usernameUnique,
    usernameExists,
    restricted
}