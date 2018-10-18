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
  favoriteDevice: {
    type: Schema.Types.ObjectId,
    ref: 'devices'
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
      key: {
        type: String
      },
      created: {
        type: Date
      },
      expireTime: {
        type: Date
      }
    },
    passworResetToken: {
      key: {
        type: Number
      },
      created: {
        type: Date
      },
      expireTime: {
        type: Date
      }
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);
