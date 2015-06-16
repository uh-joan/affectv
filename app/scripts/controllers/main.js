(function(){
'use strict';

/**
 * @ngdoc function
 * @name finalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the finalApp
 */
angular.module('finalApp')
  .controller('MainCtrl', ['$scope','Advertiser', 'Pixel', 'lodash', function ($scope, Advertiser, Pixel, lodash) {

    var vm = this;

    // get all Advertisers
    Advertiser.getAll().then(function(advertisers){
      vm.advertisers = advertisers.data;
    });

  }]);

})();
