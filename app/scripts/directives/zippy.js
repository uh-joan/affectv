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
      '<div class="row"> ' +
      '<div class="small-3 medium-4 columns left title">{{title}}</div>' +
      '<div class="small-3 medium-4 columns left badge"><span class="number" ng-show="badge">&nbsp{{badge}}</span></div>' +
      '<div class="small-3 medium-2 columns"></div>' +
      '<div class="small-3 medium-2 columns" ng-show="!showHover"></div>' +
      '<div class="small-3 medium-2 columns commands" ng-show="showHover"> ' +
      '<span ng-click="edit();noToggle();"> edit |</span>' +
      '<span ng-click="delete();noToggle();">| delete</span>  ' +
      '</div>' +
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
