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
// require('./pubsub/accountNewProcessor');

//message events subscriptions
app.post('/', (req, res) => {
  if (!req.body) {
    return;
  }
  const firestore = require('./models/firestore');
  const data = req.body;
  data = Buffer.from(data, 'base64').toString().trim()

  console.log('Received message:', data);
  firestore.addDocument(data, 'accounts', data.UID)

  // if (!req.body.message) {
  //   const msg = 'invalid Pub/Sub message format';
  //   console.error(`error: ${msg}`);
  //   res.status(400).send(`Bad Request: ${msg}`);
  //   return;
  // }else{
  //   accountNewProcessor(req.body.message)
  //   res.status(200).send(`Success PubSub Received`);
  // }
});
//message events subscriptions

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//api routes define here
const clubsRouter = require('./routes/accounts');
const rolesRouter = require('./routes/roles');

app.use('/accounts', clubsRouter);
app.use('/roles', rolesRouter);
//api routes define here

module.exports = app;
