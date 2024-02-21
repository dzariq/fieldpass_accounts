const express = require('express');
const router = express.Router();
const Account = require('../models/accounts');
const Role = require('../models/roles');
const validateFirebaseToken = require('../middlewares/authValidator')
const publishMessage = require('../pubsub/publish');
const accountValidator = require('../middlewares/accountValidator');
const firestore = require('../models/firestore');

router.get('/', [validateFirebaseToken], async (req, res) => {
    const accountsRef = FIRESTORE.collection('accounts');
    const snapshot = await accountsRef.get();

    const accounts = [];
    snapshot.forEach(doc => {
        accounts.push(doc.data());
    });
    res.status(201).json(accounts);
});

router.get('/:UID', [validateFirebaseToken], async (req, res) => {
    try {
        const accountsCollection = FIRESTORE.collection('accounts');

        const UID = req.params.UID;
        const docSnapshot = await accountsCollection.doc(UID).get();

        if (!docSnapshot.exists) {
            return res.status(404).json({ error: 'Account not found' });
        }

        const accountData = docSnapshot.data();
        return res.status(200).json(accountData);
    } catch (error) {
        console.error('Error retrieving account:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', [validateFirebaseToken, accountValidator], (req, res) => {
   // Account.createOrUpdateAccount(req.user.uid, req.user.email).then(account => {
        publishMessage('account-new', {
            UID: req.user.uid,
            email: req.user.email
        })
        res.status(201).json({ message: 'Account created successfully' });
   // });
});

module.exports = router;
