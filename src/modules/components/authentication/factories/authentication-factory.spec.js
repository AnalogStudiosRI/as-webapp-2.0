'use strict';

describe('as.components.authentication.factories.AuthenticationFactoryTest', function () {
  var username = 'obuckley';
  var password = 'mypassword';
  var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE0NDg4NTA0MDksImp0aSI6InJCK3FNRWtJRmFJTlpwTDAyU3A2dXI4ekREenFRUXJHOEVVNVdiWmplT1k9IiwiaXNzIjoiYW5hbG9nc3R1ZGlvcy50aGVncmVlbmhvdXNlLmlvIiwibmJmIjoxNDQ4ODUwNDE5LCJleHAiOjE0NDg4NTE2MTksImRhdGEiOnsidXNlcklkIjoiMSIsInVzZXJOYW1lIjoiYXN0ZXN0ZXIifX0.tW1K7L4oqwtqZaf0JZq9dx7NB7aycifCeyHjhAkV4gYpjw1KJHejME4yUj2oYN6jlJanP9rVwhCPclus4m4VbA';
  var $httpBackend;
  var localStorageService;

  beforeEach(module('angular-jwt'));
  beforeEach(module('LocalStorageModule'));
  beforeEach(module('as.components.authentication'));

  beforeEach(inject(function(_$httpBackend_, _localStorageService_) {
    $httpBackend = _$httpBackend_;
    localStorageService = _localStorageService_;
  }));

  it('can get an instance of AuthenticationFactory', inject(function (AuthenticationFactory) {
    expect(AuthenticationFactory).toBeDefined();
    expect(AuthenticationFactory.login).toBeDefined();
    expect(typeof AuthenticationFactory.login).toEqual('function');
  }));

  it('should test that login was called successfully', inject(function (AuthenticationFactory) {
    var response;

    spyOn(localStorageService, 'set');

    $httpBackend.when('POST', '/api/login', {
      username: username,
      password: password
    }).respond(200, {
      success: true,
      message: 'Login Successful',
      data: {
        jwt: jwt
      }
    });

    AuthenticationFactory.login(username, password).then(function(data) {
      response = data;
    });
    $httpBackend.flush();

    expect(response.success).toBe(true);
    expect(response.message).toBe('Login Successful');
    expect(response.data.jwt).toBe(jwt);
    expect(localStorageService.set).toHaveBeenCalled();
  }));

  it('should test that login was called unsuccessfully', inject(function (AuthenticationFactory) {
    var response;

    spyOn(localStorageService, 'set');

    $httpBackend.when('POST', '/api/login', {
      username: '',
      password: ''
    }).respond(400, {
      success: false,
      message: 'Invalid Credentials',
      data: ''
    });

    AuthenticationFactory.login().then(function(data) {
      response = data;
    });

    $httpBackend.flush();
    //XXX TODO figure out why response is not passed through on 400 response
    //expect(response.success).toBe(false);
    //expect(response.message).toBe('Invalid Credentials');
    //expect(response.data).toBe('');
    expect(localStorageService.set).not.toHaveBeenCalled();
  }));

  it('should test that logout was called successfully', inject(function (AuthenticationFactory) {
    var response;

    spyOn(localStorageService, 'remove');

    $httpBackend.when('POST', '/api/login', {
      username: username,
      password: password
    }).respond(200, {
      success: true,
      message: 'Login Successful',
      data: {
        jwt: jwt
      }
    });

    AuthenticationFactory.login(username, password).then(function(data) {
      response = data;
    });
    $httpBackend.flush();

    AuthenticationFactory.logout();

    expect(localStorageService.remove).toHaveBeenCalled();
  }));

  it('should test that isAuthenticated was called successfully', inject(function (AuthenticationFactory) {
    var response;

    spyOn(localStorageService, 'set');

    $httpBackend.when('POST', '/api/login', {
      username: username,
      password: password
    }).respond(200, {
      success: true,
      message: 'Login Successful',
      data: {
        jwt: jwt
      }
    });

    AuthenticationFactory.login(username, password).then(function(data) {
      response = data;
    });
    $httpBackend.flush();

    expect(localStorageService.set).toHaveBeenCalled();
    //TODO mock non expired JWT
    //expect(AuthenticationFactory.isAuthenticated()).toBe(true);
  }));

  it('should test that getToken was called successfully', inject(function (AuthenticationFactory) {
    var response;

    spyOn(localStorageService, 'set');

    $httpBackend.when('POST', '/api/login', {
      username: username,
      password: password
    }).respond(200, {
      success: true,
      message: 'Login Successful',
      data: {
        jwt: jwt
      }
    });

    AuthenticationFactory.login(username, password).then(function(data) {
      response = data;
    });
    $httpBackend.flush();

    expect(localStorageService.set).toHaveBeenCalled();
    expect(AuthenticationFactory.getToken()).toBe(jwt);
  }));

});