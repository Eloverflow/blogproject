angular.module('starter.constants', [])

  .constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
  })

  .constant('API_ENDPOINT', {
    url: 'http://' + location.host + '/api'
  })

.constant('DEBUG', {
    isEnabled: !!(location.host == 'localhost' || location.host == "127.0.0.1")
  });
    
