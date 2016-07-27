var visibilityFilters = require('../constants/VisibilityFilters');

module.exports = {
  templateUrl: 'app/components/MainSection.html',
  controller: MainSection,
  bindings: {
    feed: '=',
    filter: '<'
  }
};

/** @ngInject */
function MainSection(feedService) {
  this.feedService = feedService;
  this.selectedFilter = visibilityFilters[this.filter];
  this.completeReducer = function (count, feed) {
    return feed.completed ? count + 1 : count;
  };
}

MainSection.prototype = {
  handleClearCompleted: function () {
    this.feed = this.feedService.clearCompleted(this.feed);
  },

  handleCompleteAll: function () {
    this.feed = this.feedService.completeAll(this.feed);
  },

  handleShow: function (filter) {
    this.filter = filter;
    this.selectedFilter = visibilityFilters[filter];
  },

  handleChange: function (id) {
    this.feed = this.feedService.completeFeed(id, this.feed);
  },

  handleSave: function (e) {
    if (e.text.length === 0) {
      this.feed = this.feedService.deleteFeed(e.id, this.feed);
    } else {
      this.feed = this.feedService.editFeed(e.id, e.text, this.feed);
    }
  },

  handleDestroy: function (e) {
    this.feed = this.feedService.deleteFeed(e, this.feed);
  }
};
