'use strict';

describe('Service: Pixel', function () {

  // load the service's module
  beforeEach(module('finalApp'));

  // instantiate service
  var Pixel;
  beforeEach(inject(function (_Pixel_) {
    Pixel = _Pixel_;
  }));

  it('should do something', function () {
    expect(!!Pixel).toBe(true);
  });

});
