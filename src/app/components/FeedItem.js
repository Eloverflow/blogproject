module.exports = {
  templateUrl: 'app/components/FeedItem.html',
  controller: FeedItem,
  bindings: {
    feed: '<',
    onDestroy: '&',
    onChange: '&',
    onSave: '&'
  }
};

function FeedItem() {
  this.editing = false;
}

FeedItem.prototype = {
  handleDoubleClick: function () {
    this.editing = true;
  },

  handleSave: function (text) {
    this.onSave({
      feed: {
        text: text,
        id: this.feed.id
      }
    });
    this.editing = false;
  },

  handleDestroy: function (id) {
    this.onDestroy({id: id});
  }
};
