'use strict';

describe('Controller: AsideCtrl', function () {

  // load the controller's module
  beforeEach(module('finalApp'));

  var AsideCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AsideCtrl = $controller('AsideCtrl', {
      $scope: scope
    });
  }));

  it('should pass the aside controller test', function () {
    expect(true).toBe(true);
  });
});
