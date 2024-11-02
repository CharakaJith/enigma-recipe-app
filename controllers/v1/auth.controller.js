const authService = require('../../services/v1/auth.service');

const authController = {
  refreshAccessToken: async (req, res, next) => {
    try {
      const { cookie } = req.headers;

      const refreshResponse = await authService.refreshAccessToken(cookie);

      const { statusCode, responseMessage, accessToken } = refreshResponse;

      // set access token
      res.set({
        'Access-Token': accessToken,
      });

      res.status(statusCode).json({
        success: true,
        data: {
          message: responseMessage,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
