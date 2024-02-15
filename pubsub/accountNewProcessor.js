const { PubSub } = require('@google-cloud/pubsub');

// Initialize Pub/Sub client
const pubsub = new PubSub();

// Subscription name and callback function
const subscriptionName = 'projects/chatbot-401803/subscriptions/account-new-sub';
const subscription = pubsub.subscription(subscriptionName);

// Handle message callback
subscription.on('message', (message) => {
  // Extract body data
  const bodyData = message.data.toString('utf8');

  // Process the body data as needed
  console.log('Received message:', bodyData);

  // Acknowledge the message to remove it from the subscription
  message.ack();
});

// Error handling
subscription.on('error', (error) => {
  console.error('Subscription error:', error);
});


function accountNewProcessor(data) {
    console.log(data)
    if (data) {
        FIRESTORE.addDocument(data, 'accounts', data.uid)
    }
}

module.exports = accountNewProcessor()