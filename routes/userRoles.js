const express = require('express');
const router = express.Router();
const Account = require('../models/accounts');
const Role = require('../models/roles');
const validateFirebaseToken = require('../middlewares/authValidator')
const roleValidator = require('../middlewares/roleValidator')
const userRoleValidator = require('../middlewares/userRoleValidator');
const publishMessage = require('../pubsub/publish');

router.get('/', [validateFirebaseToken], (req, res) => {
    Role.Role.findAll().then((roles) => {
        console.log('All roles:', roles);
        res.status(201).json(roles);
    });
});

router.post('/', [roleValidator, validateFirebaseToken], (req, res) => {
    const { UID, roleId } = req.body;
    const dataToPublish = {
        UID : UID,
        roleObject
    }
    publishMessage('user-role-new',dataToPublish)
   
});

module.exports = router;2720

