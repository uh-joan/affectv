(function(){
'use strict';

/**
 * @ngdoc overview
 * @name finalApp
 * @description
 * # finalApp
 *
 * Main module of the application.
 */
angular
  .module('finalApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngLodash',
    'mm.foundation',
    'ngMaterial',
    'ui.router'
  ])

  //.constant('API_URI', 'http://localhost:3000/api/v1')
  .constant('API_URI', 'https://aqueous-island-8665.herokuapp.com/api/v1')

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('aside',{
        url: '/aside',
        controller: 'AsideCtrl as vm',
        templateUrl: 'views/aside.html'
        //,
        //abstract: true
      })
      .state('aside.main', {
        url: '/main',
        controller: 'MainCtrl as vm',
        templateUrl: 'views/main.html'
      })
      .state('aside.pixels', {
        url: '/pixels/:id',
            templateUrl: 'views/pixels.html',
            controller: 'PixelsCtrl as vm',
            resolve :{
              fires: ['Pixel', '$stateParams', '$q', function(Pixel, $stateParams, $q) {
                var deferred = $q.defer();
                Pixel.getFires($stateParams.id).then(function(fires){
                  deferred.resolve(fires);
                }, function(error){
                  deferred.reject(error);
                });
                return deferred.promise;
              }],
              pixel: ['Pixel', '$stateParams', '$q', function(Pixel, $stateParams, $q){
                var deferred = $q.defer();
                Pixel.get($stateParams.id).then(function(pixel){
                  deferred.resolve(pixel);
                }, function(error){
                  deferred.reject(error);
                });
                return deferred.promise;
              }]
            }

    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/aside/main');
  });

  //.config(function ($routeProvider) {
  //  $routeProvider
  //    .when('/', {
  //      templateUrl: 'views/main.html',
  //      controller: 'MainCtrl as vm'
  //    })
  //    .otherwise({
  //      redirectTo: '/'
  //    });
  //});
})();
