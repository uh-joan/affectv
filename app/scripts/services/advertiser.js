(function(){
'use strict';

/**
 * @ngdoc service
 * @name finalApp.Advertiser
 * @description
 * # Advertiser
 * Service in the finalApp.
 */
angular.module('finalApp')
  .constant('API_URI', 'http://localhost:3000/api/v1')

  .service('Advertiser', ['API_URI', '$resource','$q', function (API_URI, $resource, $q) {

    var advertiser = $resource(API_URI + '/advertisers/:id', {id: '@id'}, {
      query: {
        method: 'GET'
      },
      create : {
        url: API_URI + '/advertisers/new',
        method: 'POST'
      },
      update : {
        method: 'PUT'
      },
      remove: {
        method: 'DELETE'
      }
    });

    var getAll = function () {
      var deferred = $q.defer();

      advertiser.query().$promise
        .then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    var create = function (ad) {
      var deferred = $q.defer();

      advertiser.create({'advertiser':{'name':ad.name,'address':ad.address,
        'city':ad.city, 'post_code': ad.post_code, 'tel':ad.tel}}).$promise
        .then(function(response){
          deferred.resolve(response);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    };

    var update = function(newAd){
      var deferred = $q.defer();

      advertiser.update({id:newAd.id}, {'advertiser': {'name':newAd.name,'address':newAd.address,
                        'city':newAd.city, 'post_code': newAd.post_code, 'tel':newAd.tel}}).$promise
        .then(function(response){
          console.log('update success');
          deferred.resolve(response);
        }, function(error){
          deferred.reject(error);
        });

      return deferred.promise;
    };

    var remove = function(ad){
      var deferred = $q.defer();

      advertiser.remove({id: ad.id}).$promise
        .then(function(){
          deferred.resolve()
        }, function(){
          deferred.reject();
        });

      return deferred.promise;
    };

    return {
      getAll: getAll,
      create: create,
      update : update,
      remove: remove
    }

  }]);
})();
