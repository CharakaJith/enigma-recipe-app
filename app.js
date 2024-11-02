const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const sequelize = require('./config/postgreSQL/server');
const errorHandler = require('./middleware/errorHandler');

const routesV1 = require('./routes/v1/index');
const routesV2 = require('./routes/v2/index');

const app = express();

app.use(cors());
app.use(express.json());

// setup routing paths
app.use('/api/v1', routesV1);
app.use('/api/v2', routesV2);

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
