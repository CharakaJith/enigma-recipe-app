const express = require('express');
const recipeController = require('../../controllers/v1/recipe.controller');

const recipeRouter = express.Router();

recipeRouter.post('/', recipeController.getAllRecipe);

module.exports = recipeRouter;
