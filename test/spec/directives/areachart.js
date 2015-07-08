'use strict';

describe('Directive: areaChart', function () {

  // load the directive's module
  beforeEach(module('finalApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<div area-chart></div>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the areaChart directive');
  }));
});
