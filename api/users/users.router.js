const express = require("express");
const Users = require("./users-model");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const { jwtSecret } = 

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

//[GET] User by ID

router.get("/:UserId", (req, res, next) => {
    const {UserId} = req.params; 

    if(UserId){
        Users.getUserById(req.params.UserId)
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

//[POST] Create User
//Needs Auth Code if Instructor - Not yet added
//Most likely needs another Post method to create a password

router.post("/", (req, res, next)=>{

    const newUser = req.body;

    if(newUser.UserId && newUser.Name){
        if (typeof newUser.UserId === "number"){
            Users.addUser(newUser)
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

//[PUT] Update User By UserId

router.put("/:UserId", (req, res, next)=>{

    const updatedUser = req.body;

    if(updatedUser.UserId && updatedUser.Name){
        if (typeof updatedUser.UserId === "number"){
            Users.updateUser(updatedUser)
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

//[DELETE] User By UserId

router.delete("/:UserId", (req, res, next)=>{
    
    const { UserId } = req.params;

    Users.deleteuser(UserId)
    .then((resolution)=>{
        res.status(200).json(resolution);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
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



module.exports = router;