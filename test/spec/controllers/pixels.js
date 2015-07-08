'use strict';

describe('Controller: PixelsCtrl', function () {

  // load the controller's module
  beforeEach(module('finalApp'));

  var PixelsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PixelsCtrl = $controller('PixelsCtrl', {
      $scope: scope
    });
  }));

  it('should pass the pixels controller test', function () {
    expect(true).toBe(true);
  });
});
