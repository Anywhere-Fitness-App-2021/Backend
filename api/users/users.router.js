const express = require("express");
const Users = require("./users-model");
const router = express.Router();

//ENDPOINTS

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