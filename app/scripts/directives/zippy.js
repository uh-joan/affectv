'use strict';

/**
 * @ngdoc directive
 * @name finalApp.directive:zippy
 * @description
 * # zippy
 */
angular.module('finalApp')
  .directive('zippy', function ($timeout) {
    return {
      template: '<dt ng-mouseover="hoverIn()" ng-mouseleave="hoverOut()" ng-click="toggleContent()">' +
      '<div style="display: inline;"> ' +
      '<div style="display:inline;">{{title}}' +
      '<span class="right">{{badge}}</span>' +
      '</div> ' +
      '<div style="display: inline;" ng-if="showHover" class="right" ng-click="delete();noToggle();"> delete </div>' +
      '<div style="display: inline;" ng-if="showHover" class="right" ng-click="edit();noToggle();"> edit </div>' +
      '</div>' +
      '<dd ng-if="isContentVisible" ng-transclude></dd>' +
      '</dt>',
      restrict: 'A',
      transclude: true,
      scope: {
        title:'@',
        badge: '@',
        delete: '&',
        edit: '&'
      },
      link: function(scope, element, attrs) {
        scope.isContentVisible = false;
        scope.noContent = false;

        scope.toggleContent = function (){
          $timeout(function(){
            if (!scope.noContent){
              scope.isContentVisible = !scope.isContentVisible;
            }
            scope.noContent = false;
          }, 100);

        };

        scope.hoverIn = function(){
          scope.showHover = true;
        };

        scope.hoverOut = function(){
          scope.showHover = false;
        };

        scope.noToggle = function (){
          scope.noContent = true;
        }
      }
    };
  });
