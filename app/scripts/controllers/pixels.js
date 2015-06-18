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

      //  vm.setSubject = function(subject){
      //    vm.chartData = vm.subjects[subject];
      //    console.log('chartData: '+ vm.chartData);
      //  };
      //
      //$http.get('http://jsbin.com/vegaqi/1.js')
      //  .then(function (result) {
      //    //console.log(JSON.stringify(result.data));
      //    vm.subjects = result.data;
      //
      //    lodash.keys(vm.subjects).forEach(function (subject) {
      //      console.log('subject: '+ subject);
      //      vm.subjects[subject].forEach(function (d) {
      //        d.date = d3.time.format("%Y%m%d").parse(d.date);
      //      });
      //    });
      //  })
      //  .then(function () {
      //    vm.setSubject('math');
      //  });



    }]);
})();
