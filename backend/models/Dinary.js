const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DinarySchema = new Schema({
  author: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  timeIn: {
    type: Date,
    required: true,
    default: Date.now()
  },
  timeOut: {
    type : Date,
    required: true,
    default: Date.now()
  }
});

module.exports = Dinary = mongoose.model('dinary', DinarySchema);
