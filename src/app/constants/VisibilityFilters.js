var feedFilters = require('./FeedFilters');

function showAll() {
  return true;
}

function showCompleted(feed) {
  return feed.completed;
}

function showActive(feed) {
  return !feed.completed;
}

var filters = {};
filters[feedFilters.SHOW_ALL] = {filter: showAll, type: feedFilters.SHOW_ALL};
filters[feedFilters.SHOW_COMPLETED] = {filter: showCompleted, type: feedFilters.SHOW_COMPLETED};
filters[feedFilters.SHOW_ACTIVE] = {filter: showActive, type: feedFilters.SHOW_ACTIVE};

module.exports = filters;
