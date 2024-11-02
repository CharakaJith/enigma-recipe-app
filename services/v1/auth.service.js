const { JWT } = require('../../common/messages');
const { STATUS_CODE } = require('../../constants/app.constant');
const fieldValidator = require('../../validator/fieldValidator');
const jwtService = require('../jwt.service');

const authService = {
  refreshAccessToken: async (cookie) => {
    // get token
    const token = cookie.split('=')[1];

    // validate user inputs
    const errorArray = [];
    errorArray.push(await fieldValidator.checkIfEmptyString(token, 'token'));

    // check request data
    const filteredErrors = errorArray.filter((obj) => obj !== 1);
    if (filteredErrors.length !== 0) {
      logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, filteredErrors);

      return {
        isSuccess: false,
        statusCode: STATUS_CODE.BAD_REQUEST,
        responseMessage: filteredErrors,
      };
    }

    // refresh access token
    const accessToken = await jwtService.refreshTokwn(token);

    return {
      statusCode: STATUS_CODE.OK,
      responseMessage: JWT.REFRESH.SUCCESS,
      accessToken: accessToken,
    };
  },
};

module.exports = authService;
