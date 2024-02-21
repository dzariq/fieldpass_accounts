async function addDocument(data, collection, docId) {
    try {
        console.log(data);
        await FIRESTORE.collection(collection).doc(docId).set(data);

        console.log('Document added successfully');
    } catch (error) {
        console.error('Error adding document:', error);
    }
}

async function updateDocument(newData, collection, docId) {
    try {
        // Specify the document path
        const documentPath = collection+'/'+docId;

        // Retrieve the document from Firestore
        FIRESTORE
            .doc(documentPath)
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    console.log('Document does not exist');
                    return;
                }

                // Get the data of the existing document
                const data = doc.data();

                // Add the new field to the data
                data.newField = newData;

                // Write the updated data back to Firestore
                return FIRESTORE.doc(documentPath).set(data, { merge: true });
            })
            .then(() => {
                console.log('Field added successfully');
            })
            .catch((error) => {
                console.error('Error adding field:', error);
            });
    } catch (error) {
        console.error('Error updating document:', error);
    }
}

// Function to create or update a document
const createOrUpdateDocument = async (data,collectionName, documentId) => {
    try {
        const documentPath = collectionName+'/'+documentId;

      // Use set with merge option to perform an upsert operation
      await FIRESTORE.doc(documentPath).set(data, { merge: true });
      console.log('Document created or updated successfully');
    } catch (error) {
      console.error('Error creating or updating document:', error);
    }
  };

module.exports = {
    addDocument,
    updateDocument,
    createOrUpdateDocument
};