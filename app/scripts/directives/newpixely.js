/**
 * @ngdoc directive
 * @name finalApp.directive:newpixely
 * @description
 * # newpixely
 */
angular.module('finalApp')
  .directive('newpixely',['$timeout', function ($timeout) {
    'use strict';
    return {
      template: '<form ng-submit="submit({name:name});clearInput();">' +
      '<input ng-cloak ng-show="showInput" ng-blur="hideInput()" pixel-focus="showInput" placeholder="pixel name" ng-model="name" pixel-escape="clearInput()">' +
      '<p style="font-size: small;" ng-cloak ng-show="!showInput" ng-click="toggleInput()">add new pixel + </p>' +
      '</form>',
      restrict: 'A',
      scope: {
        submit: '&'
      },
      link: function postLink(scope, element, attrs) {
        scope.showInput = false;
        scope.toggleInput = function(){
          scope.showInput = !scope.showInput;
        };
        scope.clearInput = function(){
          scope.name = '';
          scope.toggleInput();
        };
        scope.hideInput = function(){
          scope.name='';
          scope.showInput=false;
        };
      }
    };
  }]);
