'use strict';

describe('starter.controllers module', function() {

  beforeEach(module('starter.constants'));
  beforeEach(module('starter.services'));
  beforeEach(module('starter.controllers'));

  describe('Profile controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var $scope = {};
      var profileCtrl = $controller('ProfileCtrl', {
        $scope: $scope,
        $routeParams: {id: '57e000b57772500ae3a0df6e'}
      });
      expect(profileCtrl).toBeDefined();
    }));

  });
});