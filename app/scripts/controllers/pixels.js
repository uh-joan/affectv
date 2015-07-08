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
    .controller('PixelsCtrl', ['$state', 'fires', 'pixel', '$http', 'lodash',
      function ($state, fires, pixel, $http, lodash) {
      var vm = this;

      vm.fires = fires;

      vm.pixel = pixel;

      vm.goBack = function () {
        $state.go('aside.main');
      };

      vm.getData = function(){
        var fires=[];
        angular.forEach(vm.fires, function(fire){
          fires.push({'fires': fire.fires, 'date': fire.date});
        }, fires);
        console.log(JSON.stringify(fires));
        return fires;
      };

      vm.firesToPlot = vm.getData();

    }]);
})();
