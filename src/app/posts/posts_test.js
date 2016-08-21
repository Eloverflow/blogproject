'use strict';

describe('myApp.posts module', function() {

  beforeEach(module('myApp.posts'));

  describe('posts controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view2Ctrl = $controller('PostsCtrl');
      expect(view2Ctrl).toBeDefined();
    }));

  });
});