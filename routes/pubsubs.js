const express = require('express');
const router = express.Router();
const Account = require('../models/accounts');
const firestore = require('../models/firestore');

//message events subscriptions
router.post('/account-new', (req, res) => {
    const dataRaw = req.body;
    const data = JSON.parse(Buffer.from(dataRaw.message.data, 'base64').toString().trim())

    console.log('Received message:', data);

    // mysql insert
    Account.createOrUpdateAccount(data.UID, data.email).then(account => {
        // aggregator insert
        const insertData = account
        firestore.createOrUpdateDocument(insertData, 'accounts', data.UID)
    });
    res.status(200).send('Message received successfully');

});

router.post('/user-role-new', (req, res) => {

    if (!req.body) {
        return;
    }
    const dataRaw = req.body;
    const data = JSON.parse(Buffer.from(dataRaw.message.data, 'base64').toString().trim())

    console.log('Received message:', data);

    firestore.createOrUpdateDocument(data, 'accounts', data.UID)

    res.status(200).send('Message received successfully');

});
//message events subscriptions


module.exports = router;