/**
 * @ngdoc function
 * @name finalApp.controller:PixelsCtrl
 * @description
 * # PixelsCtrl
 * Controller of the finalApp
 */

(function() {
  'use strict';

  angular.module('finalApp')
    .controller('PixelsCtrl', ['$state', 'fires', 'pixel', function ($state, fires, pixel) {
      var vm = this;

      vm.fires = fires;

      vm.pixel = pixel;

      vm.goBack = function () {
        $state.go('aside.main');
      }

    }]);
})();
