var angular = require('angular');
require('angular-mocks');
var MainSection = require('./MainSection');

describe('MainSection component', function () {
  function MockFeedService() {}
  MockFeedService.prototype = {
    addFeed: function () {},
    editFeed: function () {},
    deleteFeed: function () {},
    completeFeed: function () {},
    completeAll: function () {},
    clearCompleted: function () {}
  };

  var component;

  beforeEach(function () {
    angular
      .module('mainSection', ['app/components/MainSection.html'])
      .service('feedService', MockFeedService)
      .component('mainSection', MainSection);
    angular.mock.module('mainSection');
  });

  beforeEach(angular.mock.inject(function ($componentController) {
    component = $componentController('mainSection', {}, {});
  }));

  it('shoud call clearCompleted', function () {
    spyOn(component.feedService, 'clearCompleted').and.callThrough();
    component.handleClearCompleted();
    expect(component.feedService.clearCompleted).toHaveBeenCalled();
  });

  it('shoud call completeAll', function () {
    spyOn(component.feedService, 'completeAll').and.callThrough();
    component.handleCompleteAll();
    expect(component.feedService.completeAll).toHaveBeenCalled();
  });

  it('shoud set selectedFilter', function () {
    component.handleShow('show_completed');
    expect(component.selectedFilter.type).toEqual('show_completed');
    expect(component.selectedFilter.filter({completed: true})).toEqual(true);
  });

  it('shoud call completeFeed', function () {
    spyOn(component.feedService, 'completeFeed').and.callThrough();
    component.handleChange();
    expect(component.feedService.completeFeed).toHaveBeenCalled();
  });

  it('shoud call deleteFeed', function () {
    spyOn(component.feedService, 'deleteFeed').and.callThrough();
    component.handleSave({text: ''});
    expect(component.feedService.deleteFeed).toHaveBeenCalled();
  });

  it('shoud call editFeed', function () {
    spyOn(component.feedService, 'editFeed').and.callThrough();
    component.handleSave({text: 'Hello'});
    expect(component.feedService.editFeed).toHaveBeenCalled();
  });

  it('shoud call deleteFeed', function () {
    spyOn(component.feedService, 'deleteFeed').and.callThrough();
    component.handleDestroy();
    expect(component.feedService.deleteFeed).toHaveBeenCalled();
  });
});
