
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cost_details').del()
    .then(function () {
      // Inserts seed entries
      return knex('cost_details').insert([
        {id: 1, user_id: 2, cost_name: '2016', amount: 5000, date: 1480572670000},
        {id: 2, user_id: 2, cost_name: '2017', amount: 10000, date: 1512108670000},
        {id: 3, user_id: 2, cost_name: '2018', amount: 15000, date: 1543644670000}
      ]);
    });
};
