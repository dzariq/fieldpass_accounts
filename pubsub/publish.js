const fs = require('fs');
require('dotenv').config();
const keyFilePath = JSON.parse(process.env.GOOGLE_PUBSUB_KEY);

const { PubSub } = require('@google-cloud/pubsub');

async function publishMessage(topicName, data) {
  try {
    const pubsub = new PubSub({
      projectId: 'chatbot-401803',
      credentials: {
        client_email: keyFilePath.client_email,
        private_key: keyFilePath.private_key,
      },
    });
    const topicNameFullString = 'projects/chatbot-401803/topics/'+topicName;
    const topic = pubsub.topic(topicNameFullString);
    const messageId = await topic.publish(Buffer.from(JSON.stringify(data)));

    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error('Error publishing message:', error);
  }
}

module.exports = publishMessage;