const { Account } = require("../models/accounts");
const { Role } = require("../models/roles");

async function roleValidator(req, res, next) {
  try {
    if (!req.body.roleId) {
      req.body.roleObject = await Role.findOne({ where: { name: req.body.name } });

      if (req.body.roleObject) {
        return res.status(400).json({ error: `Role already exists` });
      }
    }
    else {
      req.body.roleObject = await Role.findOne({ where: { id: req.body.roleId } });
      if (!req.body.roleObject) {
        return res.status(400).json({ error: `Invalid Role` });
      }
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = roleValidator;
