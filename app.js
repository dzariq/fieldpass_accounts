const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'Club Management',
      version: '1.0.0',
      description: 'Documentation for Club Management API',
    },
    securityDefinitions: {
      firebaseAuth: {
        type: 'apiKey',
        description: 'JWT authorization of an API',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  apis: ['./routes/clubs.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

//message events subscriptions
app.post('/', (req, res) => {
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
  }

  const pubSubMessage = req.body.message;
  const name = pubSubMessage.data
    ? Buffer.from(pubSubMessage.data, 'base64').toString().trim()
    : 'World';

  console.log(`Hello ${name}!`);
  res.status(204).send();
});
//message events subscriptions

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//api routes define here
const clubsRouter = require('./routes/clubs');
app.use('/clubs',clubsRouter);
//api routes define here

module.exports = app;
