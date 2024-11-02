const bcrypt = require('bcrypt');
const logger = require('../../middleware/log/logger');
const CustomError = require('../../util/customError');
const jwtService = require('../jwt.service');
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

  userLogin: async (data) => {
    const { email, password } = data;

    // validate request data
    const errorArray = [];
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

    // get user
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new CustomError(PAYLOAD.USER.INVALID_CRED, STATUS_CODE.UNAUTHORIZED);
    }

    // validate password and remove it
    const isValidPassword = await bcrypt.compare(password, user.userPassword);
    if (!isValidPassword) {
      throw new CustomError(PAYLOAD.USER.INVALID_CRED, STATUS_CODE.UNAUTHORIZED);
    }
    delete user.dataValues.userPassword;

    // check if user is active
    if (!user.isActive) {
      throw new CustomError(PAYLOAD.USER.INACTIVE, STATUS_CODE.FORBIDDON);
    }

    // generate access token and refresh token
    const tokenUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.userEmail,
      password: user.userPassword,
      isActive: user.isActive,
    };
    const accessToken = await jwtService.generateAccessToken(tokenUser);
    const refreshToken = await jwtService.generateRefreshToken(tokenUser);

    return {
      isSuccess: true,
      statusCode: STATUS_CODE.OK,
      responseMessage: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  },
};

module.exports = userService;
