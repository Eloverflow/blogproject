var angular = require('angular');
require('angular-mocks');
var FeedItem = require('./FeedItem');

describe('FeedItem component', function () {
  beforeEach(function () {
    angular
      .module('feedItem', ['app/components/FeedItem.html'])
      .component('feedItem', FeedItem);
    angular.mock.module('feedItem');
  });

  it('should render correctly', angular.mock.inject(function ($rootScope, $compile) {
    var $scope = $rootScope.$new();
    var element = $compile('<feed-item></feed-item>')($scope);
    $scope.$digest();
    var li = element.find('li');
    expect(li).not.toBeNull();
  }));

  it('should call set editing to true', angular.mock.inject(function ($componentController) {
    var component = $componentController('feedItem', {}, {});
    spyOn(component, 'handleDoubleClick').and.callThrough();
    component.handleDoubleClick();
    expect(component.handleDoubleClick).toHaveBeenCalled();
    expect(component.editing).toEqual(true);
  }));

  it('should call onSave', angular.mock.inject(function ($componentController) {
    var bindings = {
      feed: {
        text: 'Use ngrx/store',
        completed: false,
        id: 0
      },
      onSave: function () {}
    };
    var component = $componentController('feedItem', {}, bindings);
    spyOn(component, 'onSave').and.callThrough();
    component.handleSave('Hello');
    expect(component.onSave).toHaveBeenCalledWith({
      feed: {text: 'Hello', id: 0}
    });
  }));
});
