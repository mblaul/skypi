const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  },
  roles: {
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  tempObjects: {
    verifyUserToken: {
      type: Object
    },
    passworResetToken: {
      type: Object
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);
