console.log(req.body)
firestore.addDocument(req.body,'accounts', req.body.UID)