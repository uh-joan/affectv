'use strict';

describe('Directive: newpixely', function () {

  // load the directive's module
  beforeEach(module('finalApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<newpixely></newpixely>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the newpixely directive');
  }));
});
