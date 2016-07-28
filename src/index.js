
var angular = require('angular');
require('todomvc-app-css/index.css');
require('events').EventEmitter.prototype._maxListeners = 100;

var feed = require('./app/feed/feed');
var App = require('./app/containers/App');
var Header = require('./app/components/Header');
var MainSection = require('./app/components/MainSection');
var FeedTextInput = require('./app/components/FeedTextInput');
var FeedItem = require('./app/components/FeedItem');
var Footer = require('./app/components/Footer');
require('angular-ui-router');
var routesConfig = require('./routes');
/*
import './index.scss';*/

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .service('feedService', feed.FeedService)
  .component('app', App)
  .component('headerComponent', Header)
  .component('footerComponent', Footer)
  .component('mainSection', MainSection)
  .component('feedTextInput', FeedTextInput)
  .component('feedItem', FeedItem)
