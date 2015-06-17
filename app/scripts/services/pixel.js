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

      return {
        getAll: getAll
      }
    }]);
})();
