const express = require('express');
const router = express.Router();
const Role = require('../models/roles');
const validateFirebaseToken = require('../middlewares/authValidator')
const publishMessage = require('../pubsub/publish');
const roleValidator = require('../middlewares/roleValidator')

router.get('/', [validateFirebaseToken], (req, res) => {
    Role.Role.findAll().then((roles) => {
        console.log('All roles:', roles);
        res.status(201).json(roles);
    });
});

router.post('/', [roleValidator, validateFirebaseToken], (req, res) => {
    const { name, operation, model } = req.body;

    Role.createOrUpdateAccount(name, model, operation).then(role => {
        res.status(201).json({ message: 'Role created successfully' });
    });
});

module.exports = router;
