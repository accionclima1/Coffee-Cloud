var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  timestamps: { },
  timestamp: String,
  sender: String,
  reciber: String,
  bodyMsg: String,
  read: false,
  chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }
});

mongoose.model('Message', MessageSchema);