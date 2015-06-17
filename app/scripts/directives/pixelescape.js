'use strict';

/**
 * @ngdoc directive
 * @name finalApp.directive:pixelEscape
 * @description
 * # pixelEscape
 */
angular.module('finalApp')
  .directive('pixelEscape',['$timeout', function ($timeout) {
    'use strict';

    var ESCAPE_KEY = 27;

    return function (scope, elem, attrs) {
      elem.bind('keydown', function (event) {
        if (event.keyCode === ESCAPE_KEY) {
          scope.$apply(attrs.pixelEscape);
        }
      });

      scope.$on('$destroy', function () {
        elem.unbind('keydown');
      });
    };
  }]);
