const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Invalid email"],
  },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  availableBalance: { type: Number, default: 0.0 },
  pendingBalance: { type: Number, default: 0.0 },
  dateOfBirth: { type: String },
  accountNumber: {
    type: String,
    default: () =>
      Math.floor(1000000000 + Math.random() * 9000000000).toString(),
  },
  accountType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
