const db = require("../../db-config");

/* GETTING A SPECIFIC USERS CLASSES 
SELECT U.Id, U.Username, UC.Class_Id_One,UC.Class_Id_Two, C.Name FROM [UsersClassesIntermediary] AS UC
JOIN [USERS] AS U
ON UC.User_id = U.Id
JOIN [CLASSES] AS C
ON UC.Class_Id_One = C.Id
*/

function getUsersClasses(UserId){

    return db("UsersClassesIntermediary As UC")
    .join("Users As U", "UC.User_Id", "U.Id")
    .join("Classes As C", "UC.Class_Id_One", "C.Id")
    .select("U.Id", "U.Username", "UC.Class_Id_One", "UC.Class_Id_Two", "C.Name")
    .where("U.Id", UserId)
}

module.exports = {
    getUsersClasses
}