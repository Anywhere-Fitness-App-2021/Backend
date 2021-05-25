exports.seed = function(knex) {
  return knex("Users").insert([
    {UserId: 1, Username: "instructor", Password: "1234", Role: "instructor"},
    {UserId: 2, Username: "instructor2", Password: "1234", Role: "instructor"},
    {UserId: 3, Username: "client", Password: "1234", Role: "client"}
  ])
};