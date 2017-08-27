
require('dotenv').config();

module.exports = {
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    dialect: 'postgres'
  },
  development: {
    username: 'chuks',
    password: 'fgsltw@postgres',
    database: 'postit-dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  }
};
