(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name finalApp.Pixel
   * @description
   * # Pixel
   * Service in the finalApp.
   */
  angular.module('finalApp')
    .service('Pixel', ['API_URI', '$resource', '$q', function (API_URI, $resource, $q) {
      var pixel = $resource(API_URI + '/pixels/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        },
        query: {
          method: 'GET'
        },
        create: {
          url: API_URI + '/pixels/new',
          method: 'POST'
        },
        remove: {
          method: 'DELETE'
        }
      });

      var getAll = function () {
        var deferred = $q.defer();

        pixel.query().$promise
          .then(function (response) {
            deferred.resolve(response);
          }, function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      };

      var create = function (newPixel) {
        var deferred = $q.defer();

        pixel.create({'pixel':{'name':newPixel.name,'advertiser_id':newPixel.advertiser_id}}).$promise
          .then(function(response){
            deferred.resolve(response);
          }, function (error) {
            deferred.reject(error);
          });
        return deferred.promise;
      };

      var update = function(px){
        var deferred = $q.defer();

        pixel.update({'id':px.id}, {'pixel': px}).$promise
          .then(function(response){
            console.log('update px success');
            deferred.resolve(response);
          }, function(error){
            deferred.reject(error);
            console.log('error updating px: '+error);
          });


        return deferred.promise;
      };

      var remove = function(px){
        var deferred = $q.defer();

        pixel.remove({id: px.id}).$promise
          .then(function(response){
            deferred.resolve()
          }, function(error){
            deferred.reject();
          });

        return deferred.promise;
      };

      var getFires = function(pixel_id){
        var deferred = $q.defer();

        pixel.get({'id': pixel_id}).$promise
          .then(function(response){
            deferred.resolve(response.fires);
          }, function(error){
            deferred.reject(error);
          });
        return deferred.promise;
      };

      return {
        getAll: getAll,
        create: create,
        update: update,
        remove: remove,
        getFires: getFires
      };
    }]);
})();
