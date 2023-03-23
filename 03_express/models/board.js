const mongoose = require('mongoose');

const { Schema } = mongoose;

const boardSchema = new Schema(
  {
    USERID: {
      type: String,
      required: true,
    },
    TITLE: {
      type: String,
      required: true,
    },
    CONTENT: {
      type: String,
      default: Date.now,
    },
    IMAGE: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'mongoose-board',
    versionKey: false,
  },
);

module.exports = mongoose.model('Board', boardSchema);
