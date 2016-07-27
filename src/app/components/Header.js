module.exports = {
  templateUrl: 'app/components/Header.html',
  controller: Header,
  bindings: {
    feeds: '='
  }
};

/** @ngInject */
function Header(feedService) {
  this.feedService = feedService;
}

Header.prototype = {
  handleSave: function (text) {
    if (text.length !== 0) {
      this.feeds = this.feedService.addFeed(text, this.feeds);
    }
  }
};
