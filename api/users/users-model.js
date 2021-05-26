const db = require("../../db-config");

/* GETTING A SPECIFIC USERS CLASSES 
SELECT U.Id, U.Username, UC.Class_Id_One,UC.Class_Id_Two, C.Name FROM [UsersClassesIntermediary] AS UC
JOIN [USERS] AS U
ON UC.User_id = U.Id
JOIN [CLASSES] AS C
ON UC.Class_Id_One = C.Id
*/

function getAllUsers(){
    return db("Users");
}

function getUserByUserId(UserId){
    return db("Users").where("UserId", UserId)
}

function getUserbyId(Id){
    return db("Users").where("Id", Id)
}

function getByUser(user) {
    return db("Users").where(user).orderby("Id");
}

async function createUser(UserIdToAdd){
    await db("Users").insert(UserIdToAdd)

    return getUserById(UserIdToAdd, UserId)
}

async function updateUserbyUserId(UpdatedUser){
    await db("Users")
        .where("UserId", UpdatedUser.UserId)
        .update(UpdatedUser)

    return getUserByUserId(UpdatedUser.UserId);
}

async function updateUserbyId(UpdatedUser, Id){
    await db("Users")
        .where("Id", Id)
        .update(UpdatedUser)

    return getUserbyId(Id);
}

async function deleteUserbyUserId(UserIdToRemove){
    await db("Users")
        .where("UserId", UserIdToRemove)
        .del()

    return getAllUsers();
}

async function deleteUserbyId(IdToRemove){
    await db("Users")
        .where("Id", IdToRemove)
        .del()
}

function getUsersClasses(UserId){

    return db("UsersClassesIntermediary As UC")
    .join("Users As U", "UC.User_Id", "U.Id")
    .join("Classes As C", "UC.Class_Id_One", "C.Id")
    .select("U.Id", "U.Username", "UC.Class_Id_One", "UC.Class_Id_Two", "C.Name")
    .where("U.Id", UserId)
}

module.exports = {
    getUsersClasses, getAllUsers, getUserByUserId, getUserByUserId, getUserbyId, createUser, updateUserbyUserId, updateUserbyId, deleteUserbyUserId, deleteUserbyId
}