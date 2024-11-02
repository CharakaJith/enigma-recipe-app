const express = require('express');
const authController = require('../../controllers/v1/auth.controller');

const authRouter = express.Router();

authRouter.post('/', authController.refreshAccessToken);

module.exports = authRouter;
