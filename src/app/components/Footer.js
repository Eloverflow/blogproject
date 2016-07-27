var feedFilters = require('../constants/FeedFilters');

module.exports = {
  templateUrl: 'app/components/Footer.html',
  controller: Footer,
  bindings: {
    completedCount: '<',
    activeCount: '<',
    selectedFilter: '<filter',
    onClearCompleted: '&',
    onShow: '&'
  }
};

function Footer() {
  this.filters = [feedFilters.SHOW_ALL, feedFilters.SHOW_ACTIVE, feedFilters.SHOW_COMPLETED];
  this.filterTitles = {};
  this.filterTitles[feedFilters.SHOW_ALL] = 'All';
  this.filterTitles[feedFilters.SHOW_ACTIVE] = 'Active';
  this.filterTitles[feedFilters.SHOW_COMPLETED] = 'Completed';
}

Footer.prototype = {
  handleClear: function () {
    this.onClearCompleted();
  },

  handleChange: function (filter) {
    this.onShow({filter: filter});
  }
};

