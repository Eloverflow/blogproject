'use strict';

describe('myApp.view_article module', function() {

  beforeEach(module('myApp.view2'));

  describe('view_article controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view2Ctrl = $controller('View2Ctrl');
      expect(view2Ctrl).toBeDefined();
    }));

  });
});