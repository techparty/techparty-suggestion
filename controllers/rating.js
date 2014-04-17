'use strict';

var rating = (function () {

  var useful = require('../helper/useful'),
      Suggestion = require('../models/suggestion'),
      techparty = useful.techparty,
      year = useful.year,
      exports = {};

  exports.rating = function (req, res) {
    var suggestions = Suggestion.find(function (err, suggestions) {
      if (err) return console.error(err);

      var unique = [];
      useful.forEach(suggestions, function (el) {
        useful.forEach(el.suggestion, function (value) {
          if (value) {
            unique.push(value);
          }
        });
      });

      var result = [];
      useful.forEach(useful.uniqueArray(unique), function (value) {
        var count = 0;
        useful.forEach(suggestions, function (el) {
          useful.forEach(el.suggestion, function (suggestion) {
            if (suggestion == value) {
              count += 1;
            }
          });
        });
        result.push({name: value, value: count});
      });

      res.render('rating', {
        suggestions: result.sort(useful.compareDesc),
        techparty: techparty,
        year: year
      });
    });
  };

  return exports;

})();

module.exports = rating;