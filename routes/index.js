module.exports = function (app) {

  'use strict';

  var routes = {},
      year = 2015,
      techparty = 'TechParty',
      suggestions = [
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

  function compare (a, b) {
    if (a.name > b.name)
      return 1;
    if (a.name < b.name)
      return -1;
    return 0;
  };

  routes.index = function (req, resp) {
    resp.render('index', {
      suggestions: suggestions,
      techparty: techparty,
      year: year
    });
  };

  routes.submit = function (req, resp) {
  	var userName = req.body.opt.username,
        userEmail = req.body.opt.useremail;


    resp.send(userName + ', ' + userEmail);

    //resp.location('/');
    //resp.redirect('/');
  };

  app.get('/', routes.index);
  app.post('/submit', routes.submit);

};