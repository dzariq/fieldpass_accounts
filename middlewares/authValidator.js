const admin = require('firebase-admin');
require('dotenv').config();
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

function validateFirebaseToken(req, res, next) {
    console.log(req.headers["x-forwarded-authorization"])
  
    const idToken = req.headers["x-forwarded-authorization"].split(' ')[1]; // Extract JWT token from Authorization header
  
    admin.auth().verifyIdToken(idToken, true)
      .then(decodedToken => {
        // Token is valid, store user information in request object for further processing
        req.user = decodedToken;
        next();
      })
      .catch(error => {
        console.error('Error validating Firebase JWT token:', error);
        res.status(401).json({ error: 'Unauthorized' });
      });
  }
  
  module.exports = validateFirebaseToken;
