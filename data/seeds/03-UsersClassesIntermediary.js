exports.seed = function(knex) {
  return knex("UsersClassesIntermediary").insert([
    {User_Id: 1, Class_Id: 1},
    {User_Id: 1, Class_Id: 2},
    {User_Id: 2, Class_Id: 3},
    {User_Id: 2, Class_Id: 2},
  ])
};