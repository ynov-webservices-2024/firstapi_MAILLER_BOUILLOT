import {Sequelize} from 'sequelize';

const sequelize = new Sequelize(
 'warmup',
 'admin-warmup',
 'admin',
  {
    host: 'localhost',
    dialect: 'mariadb'
  }
);

export {sequelize}