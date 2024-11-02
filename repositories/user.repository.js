const models = require('../models');
const CustomError = require('../util/customError');
const { REPO } = require('../common/messages');
const { STATUS_CODE } = require('../constants/app.constant');

const table = 'user';

const userRepository = {
  /**
   * Function to create a new record in table "user"
   *
   * @param {Object} userDetails: user details object
   * @returns a newly created user object
   */
  createNewUser: async (userDetails) => {
    try {
      return await models.User.create(userDetails);
    } catch (error) {
      throw new CustomError(REPO.FAILED.CREATE(table, error), STATUS_CODE.UNPORCESSABLE);
    }
  },

  /**
   * Function to fetch a record from table "user" by column 'userEmail'
   *
   * @param {String} email: user email
   * @returns user details object is exists, else null
   */
  getUserByEmail: async (email) => {
    try {
      return await models.User.findOne({
        where: {
          userEmail: email,
        },
      });
    } catch (error) {
      throw new CustomError(REPO.FAILED.GET.BY_EMAIL(table, error), STATUS_CODE.NOT_FOUND);
    }
  },
};

module.exports = userRepository;
