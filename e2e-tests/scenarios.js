'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('blogproject', function() {


  it('should automatically redirect to /posts when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/posts");
  });


  describe('contact', function() {

    beforeEach(function() {
      browser.get('index.html/#/contact');
    });


    it('should render contact view when user navigates to /contact', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view contact/);
    });

  });


  describe('posts', function() {

    beforeEach(function() {
      browser.get('index.html/#/posts');
    });


    it('should render posts when user navigates to /posts', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view posts/);
    });

  });
});
