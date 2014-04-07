'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var suggestionSchema = new Schema({
  name: String,
  email: String,
  suggestion: [],
  created: { type: Date , default: Date.now } 
});

module.exports = mongoose.model('Suggestion', suggestionSchema);