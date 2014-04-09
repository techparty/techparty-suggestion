'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var suggestionSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, index: true, required: true },
  suggestion: { type: [], index: true, required: true },
  created: { type: Date , default: Date.now } 
});

module.exports = mongoose.model('Suggestion', suggestionSchema);