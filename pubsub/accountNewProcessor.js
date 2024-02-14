function accountNewProcessor(data) {
    console.log(data)
    if (data) {
        FIRESTORE.addDocument(data, 'accounts', data.uid)
    }
}

module.exports = accountNewProcessor()