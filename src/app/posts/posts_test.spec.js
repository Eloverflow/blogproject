'use strict';

describe('starter.controllers module', function() {

  beforeEach(module('starter.controllers'));

  describe('posts controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var viewPostsCtrl = $controller('PostsCtrl');
      expect(viewPostsCtrl).toBeDefined();
    }));

  });
});