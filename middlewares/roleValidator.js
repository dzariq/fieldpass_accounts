const { Account } = require("../models/accounts");
const { Role } = require("../models/roles");

async function roleValidator(req, res, next) {
  try {
    const requiredParameter1 = 'UID'; // Replace 'param' with the name of the required parameter
    if (!req.body[requiredParameter1]) {
      const error = new Error(`Missing required parameter: ${requiredParameter1}`);
      error.status = 400; // Set the HTTP status code for the error (400 for Bad Request)
      return next(error); // Pass the error to the error-handling middleware
    }

    const requiredParameter2 = 'roleId'; // Replace 'param' with the name of the required parameter
    if (!req.body[requiredParameter2]) {
      const error = new Error(`Missing required parameter: ${requiredParameter2}`);
      error.status = 400; // Set the HTTP status code for the error (400 for Bad Request)
      return next(error); // Pass the error to the error-handling middleware
    }

    // Find the row by ID
    req.body.roleObject = await Role.findOne({ where: { id: req.body.roleId } });
    req.body.accountObject = await Account.findOne({ where: { UID: req.body.UID } });

    // If row is not found, throw an error
    if (!req.body.RoleObj) {
      const error = new Error(`Invalid Role`);
      error.status = 400; // Set the HTTP status code for the error (400 for Bad Request)
      return next(error); // Pass the error to the error-handling middleware
    }

    // If row is not found, throw an error
    if (!req.body.AccountObj) {
      const error = new Error(`Invalid Account`);
      error.status = 400; // Set the HTTP status code for the error (400 for Bad Request)
      return next(error); // Pass the error to the error-handling middleware
    }

    next();
  } catch (error) {
    // Handle errors (e.g., database errors)
    console.error('Error:', error.message);
    throw error; // Rethrow the error to be handled by the caller
  }
}

module.exports = roleValidator;
