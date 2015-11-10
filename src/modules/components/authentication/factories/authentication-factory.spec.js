'use strict';

describe('as.components.authentication.factories.AuthenticationFactoryTest', function () {

  var username = 'obuckley';
  var password = 'mypassword';
  var $httpBackend;

  beforeEach(module('as.components.authentication'));
  beforeEach(inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));

  it('can get an instance of AuthenticationFactory', inject(function (AuthenticationFactory) {
    expect(AuthenticationFactory).toBeDefined();
    expect(AuthenticationFactory.login).toBeDefined();
    expect(typeof AuthenticationFactory.login).toEqual('function');
  }));


  it('should test that login was called successfully', inject(function (AuthenticationFactory) {
    var response;

    $httpBackend.when('POST', '/api/login').respond(200, {
      status: 'success'
    });

    AuthenticationFactory.login(username, password).then(function(data) {
      response = data;
    });
    $httpBackend.flush();

    expect(response.status).toEqual('success');
  }));

});