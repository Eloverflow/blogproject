module.exports = {
  templateUrl: 'app/components/FeedTextInput.html',
  controller: FeedTextInput,
  bindings: {
    onSave: '&',
    placeholder: '@',
    newFeed: '@',
    editing: '@',
    text: '<'
  }
};

/** @ngInject */
function FeedTextInput(feedService, $window, $timeout) {
  this.$timeout = $timeout;
  this.$window = $window;
  this.feedService = feedService;
  this.editing = this.editing || false;
  this.text = this.text || '';
  if (this.text.length) {
    this.focus();
  }
}

FeedTextInput.prototype = {
  handleBlur: function () {
    if (!this.newFeed) {
      this.onSave({text: this.text});
    }
  },

  handleSubmit: function (e) {
    if (e.keyCode === 13) {
      this.onSave({text: this.text});
      if (this.newFeed) {
        this.text = '';
      }
    }
  },

  focus: function () {
    this.$timeout(function () {
      var element = this.$window.document.querySelector('.editing .textInput');
      if (element) {
        element.focus();
      }
    }, 0);
  }
};
