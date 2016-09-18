'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /view_feed when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/view_feed");
  });


  describe('post', function() {

    beforeEach(function() {
      browser.get('index.html#/post-post');
    });


    it('should render view_feed when user navigates to /view_feed', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('posts', function() {

    beforeEach(function() {
      browser.get('index.html#/view_article');
    });


    it('should render view_article when user navigates to /view_article', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
