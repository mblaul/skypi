const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  macaddress: {
    type: String,
    required: true
  },
  ipaddress: {
    type: String
  },
  model: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  authorizedUsers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      relation: {
        type: String,
        default: 'Creator'
      }
    }
  ],
  status: {
    type: String,
    default: 'Created'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Device = mongoose.model('devices', DeviceSchema);
