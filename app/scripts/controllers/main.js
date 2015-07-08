/**
 * @ngdoc function
 * @name finalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the finalApp
 */

(function(){
'use strict';

angular.module('finalApp')
  .controller('MainCtrl', ['$scope','Advertiser', 'Pixel', 'lodash', '$state',
    function ($scope, Advertiser, Pixel, lodash, $state) {

    var vm = this;

    // // //
    // Advertisers stuff
    // // //

    // get all Advertisers
    Advertiser.getAll().then(function(advertisers){
      vm.advertisers = advertisers.data;
    });

    vm.equals = function(prop, val){
      return function(item){
        return item[prop] === val;
      };
    };

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
        vm.newAdvertiser.city='';vm.newAdvertiser.address='';
        vm.newAdvertiser.post_code='';vm.newAdvertiser.tel='';
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
      console.log('on cancel');
      vm.showAdvertiserInput = false;
      vm.newAdvertiser = null;
    };
    // add new advertiser     };

    vm.addAdvertiser = function(){
      //console.log(JSON.stringify(vm.newAdvertiser));

      if(vm.newAdvertiser){
        var newOne = isInList(vm.advertisers, vm.newAdvertiser);
        //console.log(JSON.stringify(newOne));

        console.log('in add adv');
        // if it does not, create
        if (!newOne.item) {

          if (vm.newAdvertiser.name) {
            console.log('not in adv, new one');
            Advertiser.create(vm.newAdvertiser).then(function(ad){
              vm.advertisers.push(ad);
            });
            vm.newAdvertiser = {};
            // toggle input adv
            vm.showAdvertiserInput = !vm.showAdvertiserInput;
          } else {
            console.log('ignore adv with empty name');
          }
        } else { // if it does, update
          if (!newOne.item.name){ //empty name deletes it
            console.log('deleting...');
            vm.removeAdvertiser(newOne.item);
            vm.newAdvertiser = {};
            // toggle input adv
            vm.showAdvertiserInput = !vm.showAdvertiserInput;
          } else{
            //console.log('already in adv, updating');
            //console.log('updating: ' + JSON.stringify(newOne));
            vm.newAdvertiser.id = newOne.item.id;
            Advertiser.update(vm.newAdvertiser).then(function(ad){
              console.log(JSON.stringify(ad));
              vm.advertisers[newOne.index]=ad;
            });
            vm.newAdvertiser = {};
            // toggle input adv
            vm.showAdvertiserInput = !vm.showAdvertiserInput;
          }
        }

      }

    };

    vm.removeAdvertiser = function(advertiser) {
      var adFound = isInList(vm.advertisers, advertiser);
      if (adFound.item) {
        Advertiser.remove(advertiser).then(function () {
          console.log('remove success');
          vm.advertisers.splice(adFound.index, 1);
        }, function () {
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

      return lodash.countBy(count, function(n) {return n;});
    };

    // // //
    // Pixels stuff
    // // //

    Pixel.getAll().then(function(pixels){
      vm.pixels = pixels.data;
      vm.badges = vm.countBadge(pixels.data);
    });

    vm.editedPixel = null;
    vm.showDeletePixel = false;
    vm.newPixel = {};
    vm.showPixelInput= false;

    vm.createPixel = function(advertiser, name){
      console.log('creating pixel: '+ name + ' for '+advertiser.name);

      Pixel.create({'name':name, 'advertiser_id': advertiser.id}).then(function(pixel){
        // add to pixels list
        vm.pixels.push(pixel);
        vm.badges = vm.countBadge(vm.pixels);
      }, function(error){
        console.log(error);
      });
    };

    vm.doneEditing = function (pixel, name) {
      vm.editedPixel = null;
      pixel.name = name.trim();

      if (!name) {
        vm.deletePixel(pixel);
      } else {
        Pixel.update(pixel).then(function(px){
          vm.pixels[vm.pixels.indexOf(pixel)] = px;
        }, function(error){
          console.log(error);
        });
      }
    };

    vm.revertEditing = function (pixel) {
      vm.pixels[vm.pixels.indexOf(pixel)] = vm.originalPixel;
      //vm.doneEditing(vm.originalPixel, vm.originalPixel.name);
    };

    vm.editPixel = function (pixel) {
      vm.editedPixel = pixel;
      // Clone the original pixel to restore it on demand.
      vm.originalPixel = angular.extend({}, pixel);
    };

    vm.deletePixel = function(pixel){
      var pxFound = isInList(vm.pixels, pixel);
      Pixel.remove(pixel).then(function(){
        console.log('remove px success');
        vm.pixels.splice(pxFound.index, 1);
        vm.badges = vm.countBadge(vm.pixels);
      }, function(){
        console.log('error removing pixel');
      });
    };


    // // //
    // Fires stuff
    // // //
    vm.getFires = function(pixel_id){
      Pixel.getFires(pixel_id).then(function(fires){
        vm.fires = fires;
      }, function(){
        console.log('error getting fires');
      });
    };

    vm.cleanFires = function() {
      vm.fires = null;
    };

    vm.gotoPixels = function(id){
      $state.go('aside.pixels', { id : id });
    }

  }]);

})();
