const express = require('express');
const routesV1 = express.Router();
const userRoutes = require('./user.routes');
const recipeRoutes = require('./recipe.routes');

routesV1.use('/user', userRoutes);
// routesV1.use('/recipe', recipeRoutes);

module.exports = routesV1;
