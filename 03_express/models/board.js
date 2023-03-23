const mongoose = require('mongoose');

const { Schema } = mongoose;

const boardSchema = new Shema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'mongoose-board',
    versionKey: false,
  },
);

module.exports = mongoose.model('User', boardSchema);
