const express = require('express');
const router = express.Router();

//message events subscriptions
router.post('/account-new', (req, res) => {
    const firestore = require('./models/firestore');
    const dataRaw = req.body;
    const data = JSON.parse(Buffer.from(dataRaw.message.data, 'base64').toString().trim())

    console.log('Received message:', data);

    // mysql insert
    Account.createOrUpdateAccount(data.UID, data.email).then(account => {
        // aggregator insert
        firestore.addDocument(account, 'accounts', data.UID)
    });
    res.status(200).send('Message received successfully');

});

router.post('/user-role-new', (req, res) => {

    if (!req.body) {
        return;
    }
    const firestore = require('./models/firestore');
    const dataRaw = req.body;
    const data = JSON.parse(Buffer.from(dataRaw.message.data, 'base64').toString().trim())

    console.log('Received message:', data);

    firestore.addDocument(data, 'accounts', data.UID)

    res.status(200).send('Message received successfully');

});
//message events subscriptions


module.exports = router;