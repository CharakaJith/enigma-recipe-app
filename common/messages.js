module.exports = {
  // database connection and initialization messages
  DATABASE: {
    CONNECTION: {
      SUCCESS: 'Connection has been established successfully!',
      FAILED: (error) => `Failed to connect to the database: ${error}`,
    },
  },

  // response payload messages
  PAYLOAD: {
    USER: {
      EXISTS: `User already registered!`,
      INACTIVE: 'User is not active!',
      INVALID_CRED: 'Invalid user credentials!',
    },

    INVALID_ENDPOINT: (method, url) => `Cannot ${method}: ${url}`,
  },

  // validation error messages
  VALIDATE: {
    PARAM: {
      EMPTY: (field) => `Field ${field} is empty!`,
      INVALID: (field) => `Invalid ${field} format!`,
    },
  },

  // data access layer error messages
  REPO: {
    FAILED: {
      CREATE: (table, error) => `Failed to create new ${table}: ${error.message}`,
      GET: {
        BY_EMAIL: (table, error) => `Failed to get ${table} by email: ${error.message}`,
      },
    },
  },
};
