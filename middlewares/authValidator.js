function validateFirebaseToken(req, res, next) {
    if(!req.headers["x-forwarded-authorization"])
    {
      res.status(401).json({ error: 'Unauthorized' });
    }
    const idToken = req.headers["x-forwarded-authorization"].split(' ')[1]; // Extract JWT token from Authorization header
  
    FIREBASE_ADMIN.auth().verifyIdToken(idToken, true)
      .then(decodedToken => {
        // console.log(decodedToken);
        req.user = decodedToken;
        next();
      })
      .catch(error => {
        console.error('Error validating Firebase JWT token:', error);
        res.status(401).json({ error: 'Unauthorized' });
      });
  }
  
  module.exports = validateFirebaseToken;
