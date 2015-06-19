/**
 * @ngdoc directive
 * @name finalApp.directive:pixelFocus
 * @description
 * # pixelFocus
 */
angular.module('finalApp')
  .directive('pixelFocus',['$timeout', function ($timeout) {
    'use strict';

    return function (scope, elem, attrs) {
      scope.$watch(attrs.pixelFocus, function (newVal) {
        if (newVal) {
          $timeout(function () {
            //elem[0].focus();
            console.log('focusing...');
            elem[0].focus();
          }, 0, false);
        }
        elem.bind('focus', function() {
          console.log('focus on');
        });
      });
    };
  }]);
