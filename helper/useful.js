'use strict';

var useful = (function () {

  var exports = {},
      _suggestionsDefault = [
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
        { name: 'xmlhttprequest', value: 'XMLHttpRequest Level 2' },
        { name: 'internet', value: 'Internet das Coisas' },
        { name: 'polymer', value: 'Polymer' },
        { name: 'design', value: 'Design' },
        { name: 'web_app', value: 'Web Apps' },
        { name: 'grunt', value: 'GruntJS' },
        { name: 'bower', value: 'Bower' },
        { name: 'express', value: 'Express' },
        { name: 'nosql', value: 'NoSQL' },
        { name: 'http', value: 'HTTP 2.0' },
        { name: 'tdd', value: 'TDD' }
      ].sort(_compareAsc);

  function _compareAsc (a, b) {
    if (a.value > b.value)
      return 1;
    if (a.value < b.value)
      return -1;
    return 0;
  };

  function _compareDesc (a, b) {
    if (a.value < b.value)
      return 1;
    if (a.value > b.value)
      return -1;
    return 0;
  };

  var _getSuggestions = function (opt) {
    var values = [];
    Object.keys(opt).forEach(function (element) {
      if (element !== 'username' && element !== 'useremail') {
        _suggestionsDefault.map(function (el) {
          if (el.name === element) {
            values.push(el.value)
          }
        });
      }
    });
    return values;
  };

  var _forEach = function (array, callback) {
    for (var i = 0; i < array.length; i++) {
      callback(array[i]);
    }
  };

  var _uniqueArray = function (array) {
    return array.filter(function(elem, pos) {
      return array.indexOf(elem) == pos;
    }); 
  }

  exports.compareAsc = function (a, b) {
    return _compareAsc(a, b);
  };

  exports.compareDesc = function (a, b) {
    return _compareDesc(a, b);
  };  

  exports.getSuggestions = function (opt) {
    return _getSuggestions(opt);
  };

  exports.suggestionsDefault = _suggestionsDefault;

  exports.techparty = 'TechParty';

  exports.year = 2015;

  exports.forEach = function (array, callback) {
    _forEach(array, callback);
  }

  exports.uniqueArray = function (array) {
    return _uniqueArray(array);
  }

  return exports;

})();

module.exports = useful; 