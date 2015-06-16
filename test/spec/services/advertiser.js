'use strict';

describe('Service: Advertiser', function () {

  // load the service's module
  beforeEach(module('finalApp'));

  // instantiate service
  var Advertiser;
  beforeEach(inject(function (_Advertiser_) {
    Advertiser = _Advertiser_;
  }));

  it('should do something', function () {
    expect(!!Advertiser).toBe(true);
  });

});
