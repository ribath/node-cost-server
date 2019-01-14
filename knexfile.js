// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '123456',
      database : 'ribath_cost'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'Ribath',
      password : 'password12345',
      database : 'myapp_test'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'Ribath',
      password : 'password12345',
      database : 'myapp_test'
    }
  }

};
