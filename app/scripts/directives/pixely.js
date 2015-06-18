'use strict';

/**
 * @ngdoc directive
 * @name finalApp.directive:pixely
 * @description
 * # pixely
 */
angular.module('finalApp')
  .directive('pixely', [ '$timeout', function ($timeout) {
    return {
      template: '<div class="pixel-box" ng-dblclick="edit();editingOn();" ng-mouseover="hoverIn()" ng-mouseleave="hoverOut()">' +
      '<label class="view title">{{title}}' +
      '<span ng-if="showHover" ng-click="delete()" class="right delete"> x </span><span ng-if="!showHover" class="right clear-delete"> x </span></label>' +
      '<form ng-submit="submit({name:title});editingOff();">' +
      '<input class="edit" ng-model="title" pixel-escape="escape();editingOff();" pixel-focus="focus()" >' +
      '</form>' +
      '<div ng-if="showHover" ng-transclude></div>' +
      '</div>',
      restrict: 'A',
      transclude: true,
      scope: {
        title: '@',
        edit: '&',
        delete: '&',
        submit: '&',
        escape: '&',
        focus: '&'
      },
      link: function postLink(scope, element, attrs) {
        scope.hoverIn = function(){
          scope.showHover = true;
        };

        scope.hoverOut = function(){
          scope.showHover = false;
        };
      }
    };
  }]);
