const { VALIDATE } = require('../common/messages');

const fieldValidator = {
  checkIfEmptyString: async (field, param) => {
    if (!field || field.trim().length === 0) {
      return {
        fields: param,
        message: VALIDATE.PARAM.EMPTY(param),
      };
    }

    return 1;
  },

  checkIfEmptyNumber: async (field, param) => {
    if (!field) {
      return {
        fields: param,
        message: VALIDATE.PARAM.EMPTY(param),
      };
    }

    return 1;
  },

  checkIfValidEmail: async (email, param) => {
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const isValidEmail = await fieldValidator.checkIfEmptyString(email, param);

    if (isValidEmail != 1 || !String(email).match(emailformat)) {
      return {
        fields: param,
        message: VALIDATE.PARAM.INVALID(param),
      };
    }

    return 1;
  },
};

module.exports = fieldValidator;
