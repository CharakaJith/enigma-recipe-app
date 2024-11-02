const userService = require('../../services/v1/user.service');

const userController = {
  userSignup: async (req, res, next) => {
    try {
      const data = ({ firstName, lastName, email, password } = req.body);

      const signupResponse = await userService.userSignup(data);

      const { isSuccess, statusCode, responseMessage } = signupResponse;
      res.status(statusCode).json({
        success: isSuccess,
        data: {
          message: responseMessage,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  userLogin: async (req, res, next) => {
    try {
      const data = ({ email, password } = req.body);

      const loginResponse = await userService.userLogin(data);

      const { isSuccess, statusCode, responseMessage, accessToken, refreshToken } = loginResponse;

      // set access token
      res.set({
        'Access-Token': accessToken,
      });

      // set refresh token in a http-only cookie
      const isSecure = process.env.NODE_ENV === 'development' ? false : true;
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isSecure,
        sameSite: 'Strict',
        path: '/',
      });

      res.status(statusCode).json({
        success: isSuccess,
        data: {
          message: responseMessage,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
