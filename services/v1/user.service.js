const bcrypt = require('bcrypt');
const logger = require('../../middleware/log/logger');
const CustomError = require('../../util/customError');
const userRepository = require('../../repositories/user.repository');
const fieldValidator = require('../../validator/fieldValidator');
const { LOG_TYPE } = require('../../constants/log.constant');
const { STATUS_CODE } = require('../../constants/app.constant');
const { PAYLOAD } = require('../../common/messages');

const userService = {
  userSignup: async (data) => {
    const { firstName, lastName, email, password } = data;

    // validate request data
    const errorArray = [];
    errorArray.push(await fieldValidator.checkIfEmptyString(firstName, 'firstName'));
    errorArray.push(await fieldValidator.checkIfEmptyString(lastName, 'lastName'));
    errorArray.push(await fieldValidator.checkIfValidEmail(email, 'email'));
    errorArray.push(await fieldValidator.checkIfEmptyString(password, 'password'));

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

    // check if user already registered
    const user = await userRepository.getUserByEmail(email);
    if (user) {
      throw new CustomError(PAYLOAD.USER.EXISTS, STATUS_CODE.CONFLICT);
    }

    // hash password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create new user
    const userDetails = {
      firstName: firstName,
      lastName: lastName,
      userEmail: email,
      userPassword: encryptedPassword,
      isActive: true,
    };
    const newUser = await userRepository.createNewUser(userDetails);

    // remove password hash
    delete newUser.dataValues.userPassword;

    return {
      isSuccess: true,
      statusCode: STATUS_CODE.OK,
      responseMessage: newUser,
    };
  },
};

module.exports = userService;
