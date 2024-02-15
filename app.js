const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const bodyParser = require('body-parser');
const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

//init service account google
FIREBASE_ADMIN = require('firebase-admin');
require('dotenv').config();
const serviceAccountGcm = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

FIREBASE_ADMIN.initializeApp({
  credential: FIREBASE_ADMIN.credential.cert(serviceAccountGcm)
});
//init service account google
FIRESTORE = FIREBASE_ADMIN.firestore();
app.use(bodyParser.json());

//message events subscriptions
app.post('/', (req, res) => {
  if (!req.body) {
    res.status(400).send('Bad Request: data is required');
    return;
  }

  const pubsubMessage = req.body;
  console.log('Received message:', pubsubMessage);
  accountNewProcessor(req.body)
});
//message events subscriptions

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//api routes define here
const clubsRouter = require('./routes/accounts');
const rolesRouter = require('./routes/roles');
const accountNewProcessor = require('./pubsub/accountNewProcessor');

app.use('/accounts', clubsRouter);
app.use('/roles', rolesRouter);
//api routes define here

module.exports = app;
