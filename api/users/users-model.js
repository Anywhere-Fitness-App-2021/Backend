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

function getUserById(UserId){
    return db("Users").where('UserId', UserId);
}

async function createUser(UserIdToAdd){
    await db("Users").insert(UserIdToAdd)

    return getUserById(UserIdToAdd, UserId)
}

async function updateUser(UpdatedUser){
    await db("Users")
        .where("UserId", UpdatedUser.UserId)
        .update(UpdatedUser)

    return getUserById(UpdatedUser.UserId);
}

async function deleteUser(UserIdToRemove){
    await db("Users")
        .where("UserId", UserIdToRemove)
        .del()

    return getAllUsers();
}

function getUsersClasses(UserId){

    return db("UsersClassesIntermediary As UC")
    .join("Users As U", "UC.User_Id", "U.Id")
    .join("Classes As C", "UC.Class_Id_One", "C.Id")
    .select("U.Id", "U.Username", "UC.Class_Id_One", "UC.Class_Id_Two", "C.Name")
    .where("U.Id", UserId)
}

module.exports = {
    getUsersClasses, getAllUsers, getUserById, createUser, updateUser, deleteUser
}