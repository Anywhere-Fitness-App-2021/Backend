const express = require("express");
const usersRouter = require("./users/users.router");
const classesRouter = require("./classes/classes-router");
const restrict = require("./middleware/restricted");
const cors = require("cors");
const helmet = require("helmet");


const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/api/users", restrict, usersRouter);
server.use("/api/classes", classesRouter);


//SANITY CHECK ENDPOINT
server.get("/", (req, res, next)=>{
    res.json({
        message: "API Up"
    })
})


//Global Error Handling 
server.use((err, req, res, next)=>{
    res.json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = server;