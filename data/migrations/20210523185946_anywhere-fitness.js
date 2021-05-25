exports.up = function(knex){
    return knex.schema
    .createTable("Users", (tbl)=>{
        tbl.increments("Id")
        tbl.integer("UserId").unique().notNullable().unsigned()
        tbl.string("Username").notNullable().unique()
        tbl.string("Password").notNullable()
        tbl.string("Role").notNullable()

    })
    .createTable("Classes", (tbl)=>{
        tbl.increments("Id")
        tbl.integer("ClassId").unique().notNullable().unsigned()
        tbl.string("Name").notNullable()
        tbl.string("Type")
        tbl.string("StartTime")
        tbl.string("Duration")
        tbl.string("IntensityLevel")
        tbl.string("Location")
        tbl.integer("Attendees").unsigned()
        tbl.integer("MaxClassSize").unsigned()
    })
    .createTable("UsersClassesIntermediary", (tbl)=>{
        tbl.increments("UC_ID")
        tbl.integer("User_Id")
            .notNullable()
            .references("Id")
            .inTable("Users")
            .onDelete("CASCADE")
        tbl.integer("Class_Id")
            .notNullable()
            .references("Id")
            .inTable("Classes")
            .onDelete("CASCADE")
    })
    
}

exports.down = function(knex){
    return knex.schema
    .dropTableIfExists("UsersClassesIntermediary")
    .dropTableIfExists("Classes")
    .dropTableIfExists("Users")
    
}