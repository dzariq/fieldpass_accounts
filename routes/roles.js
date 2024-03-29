const express = require('express');
const router = express.Router();
const Role = require('../models/roles');
const validateFirebaseToken = require('../middlewares/authValidator')
const publishMessage = require('../pubsub/publish');
const roleValidator = require('../middlewares/roleValidator')
const paramValidator = require('../middlewares/paramValidator')

router.get('/', [validateFirebaseToken], (req, res) => {
    Role.Role.findAll().then((roles) => {
        console.log('All roles:', roles);
        res.status(201).json(roles);
    });
});

router.post('/', [validateFirebaseToken,paramValidator(['name','model','operation']),roleValidator], (req, res) => {
    const { name, operation, model } = req.body;
    publishMessage('role-new', {
        UID: req.user.uid,
        name: name,
        model: model,
        operation: operation
    })

    // Role.createOrUpdateAccount(name, model, operation).then(role => {
        res.status(201).json({ message: 'Role created successfully' });
    // });
});


router.put('/', [validateFirebaseToken,paramValidator(['roleId','name','model','operation']),roleValidator], (req, res) => {
    const { name, operation, model,roleId } = req.body;
    publishMessage('role-update', {
        UID: req.user.uid,
        roleId: roleId,
        name: name,
        model: model,
        operation: operation
    })

    // Role.createOrUpdateAccount(name, model, operation).then(role => {
        res.status(201).json({ message: 'Role created successfully' });
    // });
});

router.delete('/', [validateFirebaseToken,paramValidator(['roleId'],roleValidator)], (req, res) => {
    const { roleId } = req.body;
    publishMessage('role-delete', {
        UID: req.user.uid,
        roleId: roleId,
    })

    // Role.createOrUpdateAccount(name, model, operation).then(role => {
        res.status(201).json({ message: 'Role created successfully' });
    // });
});

module.exports = router;
