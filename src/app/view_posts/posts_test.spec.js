'use strict';

describe('starter.controllers module', function() {

  beforeEach(module('starter.constants'));
  beforeEach(module('starter.services'));
  beforeEach(module('starter.controllers'));

  describe('Posts controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var $scope = {};
      var postsCtrl = $controller('PostsCtrl', { $scope: $scope });
      expect(postsCtrl).toBeDefined();
    }));

  });
});