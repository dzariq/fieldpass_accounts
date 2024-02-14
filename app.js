const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

//init service account google
FIREBASE_ADMIN = require('firebase-admin');
require('dotenv').config();
const serviceAccountGcm = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

FIREBASE_ADMIN.initializeApp({
  credential: FIREBASE_ADMIN.credential.cert(serviceAccountGcm)
});
//init service account google
FIRESTORE = FIREBASE_ADMIN.firestore();

//message events subscriptions
app.post('/', (req, res) => {
  console.log(req)
  if (!req.body) {
    const msg = 'no Pub/Sub message received';
    console.error(`error: ${msg}`);
    res.status(400).send(`Bad Request: ${msg}`);
    return;
  }

  if (!req.body.message) {
    const msg = 'invalid Pub/Sub message format';
    console.error(`error: ${msg}`);
    res.status(400).send(`Bad Request: ${msg}`);
    return;
  }else{
    accountNewProcessor(req)
  }
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
