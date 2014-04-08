module.exports = function (app) {

  'use strict';

  var Suggestion = require('../models/suggestion'),
      routes = {},
      year = 2015,
      techparty = 'TechParty',
      suggestionsDefault = [
        { name: 'es6', value: 'JavaScript ES6' },
        { name: 'es7', value: 'JavaScript ES7' },
        { name: 'nodejs', value: 'NodeJs' },
        { name: 'oocss', value: 'OOCSS' },
        { name: 'css3', value: 'CSS 3' },
        { name: 'css_bem', value: 'CSS BEM' },
        { name: 'web_components', value: 'Web Components' },
        { name: 'shadow_dom', value: 'Shadow DOM' },
        { name: 'seo', value: 'SEO' },
        { name: 'elastic_search', value: 'ElasticSearch' },
        { name: 'java_8', value: 'Java 8' },
        { name: 'reactjs', value: 'ReactJS' },
        { name: 'css_preprocessors', value: 'CSS Preprocessors' },
        { name: 'wai_aria', value: 'WAI-ARIA' },
        { name: 'rwr', value: 'Responsive Web Design' },
        { name: 'html5', value: 'HTML 5' },
        { name: 'ios', value: 'Desenvolvimento para iOS' },
        { name: 'andoid', value: 'Desenvolvimento para Android' },
        { name: 'performance', value: 'Performance' },
        { name: 'startup', value: 'Startups' },
        { name: 'github', value: 'GitHub' },
        { name: 'webgl', value: 'WebGL' },
        { name: 'midias', value: 'Mídias Sociais' },
        { name: 'jquery', value: 'jQuery' },
        { name: 'api_html5', value: 'APIs de HTML5' },
        { name: 'acessibilidade', value: 'Acessibilidade' },
        { name: 'yeoman', value: 'Yeoman' },
        { name: 'firefox', value: 'Firefox OS' },
        { name: 'heroku', value: 'Heroku Cloud Computing' },
        { name: 'meteor', value: 'Meteor' },
        { name: 'javascript_template', value: 'JavaScript Templates' },
        { name: 'ruby', value: 'Ruby' },
        { name: 'xmlhttprequest', value: 'XMLHttpRequest Level 2'}
      ].sort(compare);

  routes.index = function (req, res) {
    res.render('index', {
      suggestions: suggestionsDefault,
      techparty: techparty,
      year: year
    });
  };

  routes.submit = function (req, res) {
    var userEmail = req.body.opt.useremail;

    Suggestion.find({ email: userEmail }, function (err, suggestion) {

      if (suggestion.length > 0) {
        var message = 'Hey ' + userEmail + ', você já enviou sua sugestão :)';
        req.flash('error', message);
      } else {
        var userName = req.body.opt.username,
            suggestions = getSuggestions(req.body.opt);

        suggestion = new Suggestion({
          name: userName,
          email: userEmail,
          suggestion: suggestions
        });

        suggestion.save(function (err, suggestion) {
          if (err) return console.error(err);
          var message = 'Obrigado por ajudar a ' + techparty + ' ' + year  + ' ser o melhor evento de todos os tempos';
          req.flash('info', message);
        });
      }

      return res.redirect('/');
    });
  };

  function getSuggestions (opt) {
    var values = [];
    Object.keys(opt).forEach(function (element) {
      if (element !== 'username' && element !== 'useremail') {
        if (element === 'suggestion') {
          values.push(opt[element]);
        } else {
          values.push(element);
        }
      }
    });
    return values;
  };

  function compare (a, b) {
    if (a.name > b.name)
      return 1;
    if (a.name < b.name)
      return -1;
    return 0;
  };

  app.get('/', routes.index);
  app.post('/submit', routes.submit);

};