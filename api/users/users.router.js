const express = require("express");
const Users = require("./users-model");
const Middleware = require("./users-middleware");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./../../config/secret");
const dbConfig = require("../../db-config");

//ENDPOINTS

//[GET] All Users

router.get("/", (req, res, next) => {
    Users.getAllUsers()
    .then((allUsers) => {
        res.status(200).json(allUsers);
    })
    .catch((err) => {
        res.status(500).json({message: err.message});
    })
})

//[GET] User by UserId

router.get("/:UserId", (req, res, next) => {
    const {UserId} = req.params; 

    if(UserId){
        Users.getUserByUserId(req.params.UserId)
            .then(specificUser => {
                res.status(200).json(specificUser)
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    } else {
        res.status(406).json({message: "User Id Required"})
    }
})

//[GET] User by ID

router.get(":/id", (req, res, next) => {
    const { id } = req.params;

    if(id){
        Users.getUserbyId(id)
            .then((user) => {
                res.status(200).json(user[0]);
            })
            .catch((error) => {
                res.status(500).json({message: error.message})
            })
    } else {
        res.status(406).json({messages: "Id requried"})
    }
})

//[POST] Create User
//This shouldn't be used, use Register instead to create a user

router.post("/", (req, res, next)=>{

    const newUser = req.body;

    if(newUser.UserId && newUser.Username){
        if (typeof newUser.UserId === "number"){
            Users.createUser(newUser)
            .then((newestUser)=>{
                res.status(200).json(newestUser);
            })
            .catch((err)=>{
                res.status(500).json({message: err.message});
            })
        } else {
            res.status(406).json({message: "UserId must be a number"});
        }
    } else {
        res.status(406).json({message: "UserId and Name are required"});
    }


    
})

//[POST] Register as a User
router.post('/register', Middleware.checkRegisterPayload, Middleware.usernameUnique, async (req, res, next) => {
    const credentials = req.body;

    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(credentials.Password, rounds);
    credentials.Password = hash;
    
    try {
        await db("Users").insert(credentials)
        const user = await db("Users").where("Username", credentials.Username).first()
        const newUser = {id: user.Id, username: user.Username, password: user.Password}
        res.status(201).json(newUser)
    } catch(error) {
        next(error)
    }
})

//[POST] Login as a User
router.post('/login', Middleware.checkLoginPayload, Middleware.usernameExists,  async (req,res, next) => {
    const { username, password} = req.body;

    try {
        const user = await db("Users").where('Username', username).first()
        if(user && bcrypt.compareSync(password, user.Password)){
            const token = makeToken(user)
            res.status(200).json({message: `Welcome ${username}`, token})
        } else {
            res.status(401).json({message: 'Invalid credentials'})
        }
    } catch (error) {
        next(error)
    }
})

//[PUT] Update User By UserId

router.put("/:UserId", (req, res, next)=>{

    const updatedUser = req.body;

    if(updatedUser.UserId && updatedUser.Username){
        if (typeof updatedUser.UserId === "number"){
            Users.updateUserbyUserId(updatedUser)
            .then((update)=>{
                res.status(200).json(update);
            })
            .catch((err)=>{
                res.status(500).json({message: err.message});
            })
        } else {
            res.status(406).json({message: "UserId must be a number"});
        }
    } else {
        res.status(406).json({message: "UserId and Name are required"});
    }
    
})

//[PUT] Update User by Id

router.put("/:id", (req, res, next) => {
    const updatedUser = req.body;

    const { id } = req.params;

    if(updatedUser.Username){
        Users.updateUserbyId(updatedUser, id)
            .then((update) => {
                res.status(200).json(update[0]);
            })
            .catch((error) => {
                res.status(500).json({messages: error.message});
            })
    } else {
        res.status(406).json({message: "Id and Username are required"});
    }
})

//[DELETE] Delete User By UserId

router.delete("/:UserId", (req, res, next)=>{
    
    const { UserId } = req.params;

    Users.deleteUserbyUserId(UserId)
    .then((resolution)=>{
        res.status(200).json(resolution);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })

})

//[DELETE] Delete User by Id

router.delete(":/id", (req, res, next) => {
    const { id } = req.params;

    Users.deleteUserbyId(id)
    .then((resolution) => {
        res.status(200).json(resolution);
    })
    .catch((error) => {
        res.status(500).json({message: error.message});
    })
})

//[GET] Users Classes

router.get("/:id/classes", (req, res, next)=>{

    const { id } = req.params;

    Users.getUsersClasses(id)
    .then((allClasses)=>{
        res.status(200).json(allClasses);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
})

const makeToken = user => {
    const payload = {
        subject: user.UserId,
        username: user.Username
    };
    const options = {
        expiresIn: "1h"
    }

    return jwt.sign(payload, jwtSecret, options);
}


module.exports = router;