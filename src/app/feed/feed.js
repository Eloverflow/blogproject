require('es6-shim');

var initialFeed = {
  text: 'Use AngularJS',
  completed: false,
  id: 0
};

function FeedService() {
}

FeedService.prototype = {
  addFeed: function (text, feeds) {
    return [
      {
        id: (feeds.length === 0) ? 0 : feeds[0].id + 1,
        completed: false,
        text: text
      }
    ].concat(feeds);
  },

  completeFeed: function (id, feeds) {
    return feeds.map(function (feed) {
      return feed.id === id ?
        Object.assign({}, feed, {completed: !feed.completed}) :
        feed;
    });
  },

  deleteFeed: function (id, feeds) {
    return feeds.filter(function (feed) {
      return feed.id !== id;
    });
  },

  editFeed: function (id, text, feeds) {
    return feeds.map(function (feed) {
      return feed.id === id ?
        Object.assign({}, feed, {text: text}) :
        feed;
    });
  },

  completeAll: function (feeds) {
    var areAllMarked = feeds.every(function (feed) {
      return feed.completed;
    });
    return feeds.map(function (feed) {
      return Object.assign({}, feed, {completed: !areAllMarked});
    });
  },

  clearCompleted: function (feeds) {
    return feeds.filter(function (feed) {
      return feed.completed === false;
    });
  }
};

module.exports = {
  FeedService: FeedService,
  initialFeed: initialFeed
};

