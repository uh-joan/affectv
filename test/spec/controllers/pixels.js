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

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
