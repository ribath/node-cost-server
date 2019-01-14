
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: '01711152103', password: '123456', age: 50},
        {id: 2, username: '01819641497', password: '123456', age: 40},
        {id: 3, username: '01675656770', password: '123456', age: 30}
      ]);
    });
};
