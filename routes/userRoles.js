const express = require('express');
const router = express.Router();
const Account = require('../models/accounts');
const Role = require('../models/roles');
const validateFirebaseToken = require('../middlewares/authValidator')
const userRoleValidator = require('../middlewares/userRoleValidator');
const publishMessage = require('../pubsub/publish');
const validateParams = require('../middlewares/paramValidator');

router.get('/', [validateFirebaseToken], (req, res) => {
    Role.Role.findAll().then((roles) => {
        console.log('All roles:', roles);
        res.status(201).json(roles);
    });
});

router.post('/', [validateFirebaseToken,validateParams(['roleId']),userRoleValidator], (req, res) => {
    const {roleObject} = req.body;
    const dataToPublish = {
        UID : req.user.uid,
        user_roles : [ roleObject ]
    }
    publishMessage('user-role-new',dataToPublish)
    res.status(201).json({ message: 'User Role created successfully' });

});

router.delete('/', [validateFirebaseToken,validateParams(['roleId']),userRoleValidator], (req, res) => {
    const {roleId} = req.body;
    const dataToPublish = {
        UID : req.user.uid,
        roleId : roleId
    }
    publishMessage('user-role-delete',dataToPublish)
    res.status(201).json({ message: 'User Role deleted successfully' });

});

module.exports = router;

