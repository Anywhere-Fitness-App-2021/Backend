exports.seed = function(knex) {
  return knex("UsersClassesIntermediary").insert([
    {User_Id: 1, Class_Id_One: 1 , Class_Id_Two: 2},
    {User_Id: 2, Class_Id_One: 2 , Class_Id_Two: 3},
  ])
};