var td = require('./feed');

describe('FeedService', function () {
  var feed;
  var feedService;

  beforeEach(function () {
    feed = [td.initialFeed];
    feedService = new td.FeedService();
  });

  it('should add a feed to the list', function () {
    var res = feedService.addFeed('Hello', feed);
    expect(res.length).toEqual(2);
    expect(res[0].id).toEqual(1);
  });

  it('should complete a feed', function () {
    var res = feedService.completeFeed(0, feed);
    expect(res.length).toEqual(1);
    expect(res[0].completed).toEqual(true);
  });

  it('should delete a feed', function () {
    var res = feedService.deleteFeed(0, feed);
    expect(res.length).toEqual(0);
  });

  it('should edit a feed', function () {
    var res = feedService.editFeed(0, 'Changed it', feed);
    expect(res.length).toEqual(1);
    expect(res[0].text).toEqual('Changed it');
  });

  it('should complete all feed', function () {
    var res = feedService.addFeed('Hello', feed);
    res = feedService.completeAll(res);
    res.forEach(function (feed) {
      expect(feed.completed).toEqual(true);
    });
  });

  it('should clear all completed feed', function () {
    var res = feedService.addFeed('Hello', feed);
    res = feedService.completeFeed(0, res);
    res = feedService.clearCompleted(res);
    expect(res.length).toEqual(1);
    expect(res[0].completed).toEqual(false);
  });
});
