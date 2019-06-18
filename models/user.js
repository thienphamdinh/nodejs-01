const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  fullName: { type: String, require: true },
  userType: { type: String, require: true },
  phone: { type: String, require: true, unique: true },
  DOB: { type: Date, require: true },
  registerDate: {
    type: Date,
    default: new Date()
  },
  avatar: { type: String },
  numberOfTrips: { type: Number },
  numberOfKms: { type: Number },
  isActive: { type: Boolean, default: true }
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
  UserSchema
};
