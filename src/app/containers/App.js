var feedFilters = require('../constants/FeedFilters');
var feed = require('../feed/feed');

module.exports = {
  templateUrl: 'app/containers/App.html',
  controller: App
};

function App() {
  this.feed = [feed.initialFeed];
  this.filter = feedFilters.SHOW_ALL;
}
