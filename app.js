const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const sequelize = require('./config/postgreSQL/server');

const app = express();

app.use(cors());
app.use(express.json());

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
