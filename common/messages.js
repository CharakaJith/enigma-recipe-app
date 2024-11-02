module.exports = {
  // database connection and initialization messages
  DATABASE: {
    CONNECTION: {
      SUCCESS: 'Connection has been established successfully!',
      FAILED: (error) => `Unable to connect to the database: ${error}`,
    },
  },
};
