'use strict';

describe('starter.controllers module', function() {

  beforeEach(module('starter.constants'));
  beforeEach(module('starter.services'));
  beforeEach(module('starter.controllers'));

  describe('Post controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var $scope = {};
      var postCtrl = $controller('PostCtrl', {
        $scope: $scope,
        $routeParams: {id: '57e000b57772500ae3a0df6e'}
      });
      expect(postCtrl).toBeDefined();
    }));

  });
});