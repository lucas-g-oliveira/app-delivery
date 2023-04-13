const option2 = {
  host: 'localhost',
  port: '3306',
  database: 'delivery-app-dev',
  username: 'root',
  password: 'password',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  development: {
   ...option2,
  },
  test: {
    ...option2,
  },
  production: {
    ...option2,
  },
};
