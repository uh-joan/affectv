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

    Pixel.getAll().then(function(pixels){
      vm.pixels = pixels.data;
    });

    // helper function to get an item in list from the item.name
    var isInList = function(list, item){
      var keepGoing = true;
      var itemFound = {'item':null, 'index':null};
      angular.forEach (list, function(element){
        if (keepGoing) {
          if (angular.equals(item.name, element.name)){
            keepGoing = false;

            itemFound.item = element;
            itemFound.index = list.indexOf(element);
          }
        }
      });
      return itemFound;
    };

    // get the Advertiser in list (local)
    vm.getAdvertiser= function(){
      var advertiser = isInList(vm.advertisers, vm.newAdvertiser);

      if (!advertiser.item) {
        vm.newAdvertiser.city="";vm.newAdvertiser.address="";
        vm.newAdvertiser.post_code="";vm.newAdvertiser.tel="";
      } else {
        vm.newAdvertiser.city=vm.advertisers[advertiser.index].city;vm.newAdvertiser.address=vm.advertisers[advertiser.index].address;
        vm.newAdvertiser.post_code=vm.advertisers[advertiser.index].post_code;vm.newAdvertiser.tel=vm.advertisers[advertiser.index].tel;
      }
    };

    // edit advertiser
    vm.editAdvertiser = function(advertiser) {
      var toEdit = isInList(vm.advertisers, advertiser);

      if (toEdit.item) {
        vm.newAdvertiser = toEdit.item;
        vm.showAdvertiserInput = true;
      }
    };


    vm.cancelEdit = function (){
      vm.showAdvertiserInput = false;
      vm.newAdvertiser = null;
    };
    // add new advertiser     };

    vm.addAdvertiser = function(){
      var newOne = isInList(vm.advertisers, vm.newAdvertiser);

      // if it does not, create
      if (!newOne.item) {
        console.log('not in adv, new one');
        Advertiser.create(vm.newAdvertiser).then(function(ad){
          vm.advertisers.push(ad);
        });
      } else { // if it does, update
        if (!newOne.item.name){ //empty name deletes it
          console.log('deleting...');
          vm.removeAdvertiser(newOne.item);
        } else{
          console.log('already in adv, updating');
          console.log('updating: ' + JSON.stringify(newOne));
          Advertiser.update(newOne.item).then(function(ad){
            console.log(JSON.stringify(ad));
            vm.advertisers[newOne.index]=ad;
          });
        }
      }
      vm.newAdvertiser = {};
      // toggle input adv
      vm.showAdvertiserInput = !vm.showAdvertiserInput;
    };

    vm.removeAdvertiser = function(advertiser) {
      var adFound = isInList(vm.advertisers, advertiser);
      if (adFound.item) {
        Advertiser.remove(advertiser).then(function () {
          console.log('remove success');
          vm.advertisers.splice(adFound.index, 1);
        }, function (error) {
          console.log('error deleting adv');
        });

        // show advertiser form   }
      }
    };

    vm.toggleAdvertiserInput = function(){
      if (!vm.showAdvertiserInput) {
        vm.showAdvertiserInput = true;
      }
    };

    // function to count the pixels of each advertiser, to show on Badge
    vm.countBadge = function (pixels){
      var counts = lodash.reduce(pixels, function(result, value, key) {
        result[key] = value.advertiser_id;
        return result;}, {});

      var count = [];
      lodash.forEach ( counts, function (value, key){
        this[key]=value;
      }, count);

      return lodash.countBy(count, function(n) {return n});
    };

  }]);

})();
