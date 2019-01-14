
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cost_details', (table) => {
        table.increments('id');
        table.string('user_id');
        table.string('cost_name');
        table.integer('amount');
        table.bigint('date');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cost_details')
};