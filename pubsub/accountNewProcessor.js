const { PubSub } = require('@google-cloud/pubsub');
const firestore = require('../models/firestore');
// Initialize Pub/Sub client
const pubsub = new PubSub();

// Subscription name and callback function
const subscriptionName = 'projects/chatbot-401803/subscriptions/account-new-sub';
const subscription = pubsub.subscription(subscriptionName);

// Handle message callback
subscription.on('message', (message) => {
  // Extract body data
  const data = JSON.parse(message.data)

  console.log('Received message:',data);
  firestore.addDocument(data, 'accounts', data.uid)
  // Acknowledge the message to remove it from the subscription
  message.ack();
});

// Error handling
subscription.on('error', (error) => {
  console.error('Subscription error:', error);
});
