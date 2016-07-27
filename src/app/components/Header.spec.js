var angular = require('angular');
require('angular-mocks');
var Header = require('./Header');

describe('Header component', function () {
  var feed = [
    {
      text: 'Use ngrx/store',
      completed: false,
      id: 0
    }
  ];

  function MockFeedService() {
  }

  MockFeedService.prototype.addFeed = function (text, feed) {
    return [
      {
        id: (feed.length === 0) ? 0 : feed[0].id + 1,
        completed: false,
        text: text
      }
    ].concat(feed);
  };

  beforeEach(function () {
    angular
      .module('headerComponent', ['app/components/Header.html'])
      .service('feedService', MockFeedService)
      .component('headerComponent', Header);
    angular.mock.module('headerComponent');
  });

  it('should render correctly', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<header-component></header-component>')($rootScope);
    $rootScope.$digest();
    var header = element.find('h1');
    expect(header.html().trim()).toEqual('feed');
  }));

  it('should get the feed binded to the component', angular.mock.inject(function ($rootScope, $compile, $componentController) {
    var component = $componentController('headerComponent', {}, {feed: feed});
    spyOn(component, 'handleSave').and.callThrough();
    expect(component.feed.length).toEqual(1);
    component.handleSave('New Task');
    expect(component.handleSave).toHaveBeenCalledWith('New Task');
    expect(component.feed.length).toEqual(2);
  }));
});
