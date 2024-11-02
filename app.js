const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const sequelize = require('./config/postgreSQL/server');
const errorHandler = require('./middleware/errorHandler');
const { PAYLOAD } = require('./common/messages');
const { STATUS_CODE } = require('./constants/app.constant');
require('dotenv').config();

const routesV1 = require('./routes/v1/index');
const routesV2 = require('./routes/v2/index');

const app = express();

app.use(cors());
app.use(express.json());

// setup routing paths
app.use('/api/v1', routesV1);
app.use('/api/v2', routesV2);
const CustomError = require('./util/customError');

// route for undefined routes
app.use((req, res) => {
  const { method, originalUrl } = req;

  throw new CustomError(PAYLOAD.INVALID_ENDPOINT(method, originalUrl), STATUS_CODE.BAD_REQUEST);
});

// global custom error handler
app.use(errorHandler);

const env = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    chalk.white.bgGreen.bold(' PORT ') +
      chalk.white.bgBlue.bold(` ${PORT} `) +
      chalk.white.bgGreen.bold(' MODE ') +
      chalk.white.bgRed.bold(` ${env} `)
  );
});
