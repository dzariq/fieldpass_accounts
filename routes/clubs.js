const express = require('express');
const router = express.Router();
const Club = require('../models/clubs');
const Country = require('../models/countries');
const Sport = require('../models/sports');
const validateFirebaseToken = require('../middlewares/authValidator')
const validateCreateClub = require('../middlewares/clubsValidator');
const publishMessage = require('../pubsub/publish');

/**
 * @swagger
 * /clubs:
 *   get:
 *     description: get all clubs
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', [validateFirebaseToken], (req, res) => {
    Club.findAll({ include: Country }).then((clubs) => {
        console.log('All clubs:', clubs);
        res.status(201).json(clubs);
    });
});

/**
 * @swagger
 * /clubs:
 *   post:
 *     security:
 *       - firebaseAuth: []
 *     summary: Create a new club
 *     operationId: createClub
 *     consumes:
 *       - application/json
 *     produces:
 *       - /json
 *     parameters:
 *       - name: clubName
 *         in: body
 *         description: new club name
 *         required: true
 *         schema:
 *           type: string
 *     x-google-backend:
 *       address: https://fieldpass-clubs-muyb2hx66a-as.a.run.app/club
 *     responses:
 *       '201':
 *          description: Club created successfully
 *       '400':
 *          description: Invalid request
*/
router.post('/', [validateCreateClub, validateFirebaseToken], (req, res) => {
    const { clubName } = req.body;
    publishMessage();
    res.status(201).json({ message: 'Club created successfully' });
});

module.exports = router;
