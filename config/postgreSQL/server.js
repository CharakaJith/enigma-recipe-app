const Sequelize = require('sequelize');
const logger = require('../../middleware/log/logger');
const { DATABASE } = require('../../common/messages');
const { APP_ENV, STATUS_CODE } = require('../../constants/app.constant');
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: process.env.PG_HOST,
  dialect: config.dialect,
  pool: {
    max: parseInt(process.env.PG_MAXCONN),
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log(DATABASE.CONNECTION.SUCCESS);
  })
  .catch((error) => {
    console.error(DATABASE.CONNECTION.FAILED(error));
    process.exit();
  });

module.exports = sequelize;
