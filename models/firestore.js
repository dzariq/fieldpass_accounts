async function addDocument(data,collection,docId) {
    try {
        console.log(docId);
        await FIRESTORE.collection(collection).doc(docId).set(data);

        console.log('Document added successfully');
    } catch (error) {
        console.error('Error adding document:', error);
    }
}

async function updateDocument(data,collection,docId) {
    try {
        const docRef = FIRESTORE.collection(collection).doc(docId);

        // await docRef.update({
        //     field1: 'new_value1',
        //     field2: 'new_value2',
        // });

        console.log('Document updated successfully');
    } catch (error) {
        console.error('Error updating document:', error);
    }
}

module.exports =  {
    addDocument,
    updateDocument
};