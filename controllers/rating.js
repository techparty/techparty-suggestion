'use strict';

var useful = require('../helper/useful');
var Suggestion = require('../models/suggestion');
var techparty = useful.techparty;
var year = useful.year;

var _getUnique = function (suggestions) {
	var unique = [];
	useful.forEach(suggestions, function (sug) {
	  useful.forEach(sug.suggestion, function (value) {
			if (value) {
			  unique.push(value);
			}
	  });
	});
	return unique;
};

var _getResult = function (unique, suggestions) {
	var result = [];
	useful.forEach(useful.uniqueArray(unique), function (value) {
	  var count = 0;
	  useful.forEach(suggestions, function (sug) {
			useful.forEach(sug.suggestion, function (suggestion) {
			  if (suggestion == value) {
				  count += 1;
			  }
			});
	  });
	  result.push({name: value, value: count});
	});
	return result.sort(useful.compareDesc);
};

var _render = function (res, result) {
	res.render('rating', {
	  suggestions: result,
	  techparty: techparty,
	  year: year
	});
};


module.exports = {

  rating : function (req, res) {
		var suggestions = Suggestion.find(function (err, suggestions) {
		if (err) return console.error(err);
		  var unique = _getUnique(suggestions);
		  var result = _getResult(unique, suggestions);

		  _render(res, result);
		});
  }

};
