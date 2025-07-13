const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: {type: String},
  email: { type: String, unique: true },
  phone: {type: String},
  password: { type: String },
  availableBalance: { type: String },
  pendingBalance: { type: String },
  dateOfBirth: { type: String },
  accountNumber: {
  type: String,
  default: () => Math.floor(1000000000 + Math.random() * 9000000000).toString()
  },
  accountType: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
