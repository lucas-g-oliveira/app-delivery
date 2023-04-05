require('dotenv').config();

// const environment = process.env.NODE_ENV || 'test';

/* const suffix = {
  prod: '',
  production: '',
  dev: '-dev',
  development: '-dev',
  test: '-test',
}; */

/* const options = {
  host: process.env.HOSTNAME || process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || '3306',
  database: 
    `${process.env.MYSQL_DB_NAME || 'delivery-app'}${suffix[environment] || suffix.test || ''}`,
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}; */

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
   /*  ...options, */
   ...option2,
  },
  test: {
    /* ...options, */
    ...option2,
  },
  production: {
    /* ...options, */
    ...option2,
  },
};
