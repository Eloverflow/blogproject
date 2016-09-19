'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('blogproject', function() {


  it('should automatically redirect to /posts when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/posts");
  });


  describe('post', function() {

    beforeEach(function() {
      browser.get('index.html/#/post');
    });


    it('should render post view when user navigates to /view_feed', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('posts', function() {

    beforeEach(function() {
      browser.get('index.html/#/posts');
    });


    it('should render posts when user navigates to /posts', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
