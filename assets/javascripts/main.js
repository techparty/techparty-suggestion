;(function (window, document, undefined) {

  'use strict';

  var main = (function () {

    var exports = {};

    var _disabledMessage = function () {
      var message = document.querySelector('.message');
      if (message) {
        var remove = window.setInterval(function () {
          message.style.display = 'none';
          clearInterval(remove);
        }, 3000);
      }
    };

    exports.init = function () {
      _disabledMessage();
    };

    return exports;

  })();

  window.main = main;

})(window, document);

(function () {
  main.init();
})();