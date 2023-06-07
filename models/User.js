const mongoose = require('mongoose');

// Define the schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
});

// Create a model based on the schema
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;