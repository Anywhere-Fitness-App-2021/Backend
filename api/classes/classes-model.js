const db = require("../../db-config");


function getAllClasses(){
    return db("Classes")
}

function getById(Id){
    return db("Classes")
            .where("Id", Id)
}

async function updateClass(UpdatedClass, Id){

    await db("Classes")
            .where("Id", Id)
            .update(UpdatedClass)

    return getById(Id);

}

 async function addClass(classToAdd){

        const classToAddId = await db("Classes")
                            .insert(classToAdd)

            return getById(classToAddId);
    
    
}

async function deleteClass(idToDelete){
    
    await db("Classes")
        .where("id", idToDelete)
        .del()

    return getAllClasses();
}

module.exports = {
    getAllClasses, getById, updateClass, addClass, deleteClass
}