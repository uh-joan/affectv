'use strict';

/**
 * @ngdoc function
 * @name finalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the finalApp
 */
angular.module('finalApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
