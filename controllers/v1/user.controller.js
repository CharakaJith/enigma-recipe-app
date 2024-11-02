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

      const { isSuccess, statusCode, responseMessage } = loginResponse;
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
