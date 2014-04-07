module.exports = function (app) {

  'use strict';

  var routes = {}

  routes.index = function (req, resp) {
    var suggestions = [
      'JavaScript ES6',
      'JavaScript ES7',
      'NodeJs',
      'OOCSS',
      'CSS3',
      'CSS BEM',
      'Web Components',
      'Shadow DOM',
      'SEO',
      'ElasticSearch',
      'Java 8',
      'ReactJS',
      'CSS Preprocessors',
      'WAI-ARIA'
    ].sort();

    resp.render('index', {
      suggestions: suggestions
    });
  }

  app.get('/', routes.index);

};