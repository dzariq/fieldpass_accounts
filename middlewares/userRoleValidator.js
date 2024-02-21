const { Account } = require("../models/accounts");
const { Role } = require("../models/roles");

async function userRoleValidator(req, res, next) {
  try {
    // Find the row by ID
    req.body.roleObject = await Role.findOne({ where: { id: req.body.roleId } });
    req.body.accountObject = await Account.findOne({ where: { UID: req.user.uid } });

    // If row is not found, throw an error
    if (!req.body.roleObject) {
      return res.status(400).json({ error: `Invalid Role` });
    }

    // If row is not found, throw an error
    if (!req.body.accountObject) {
      return res.status(400).json({ error: `Invalid account` });
    }

    next();
  } catch (error) {
    // Handle errors (e.g., database errors)
    console.error('Error:', error.message);
    throw error; // Rethrow the error to be handled by the caller
  }
}

module.exports = userRoleValidator;
