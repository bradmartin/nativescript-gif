'use strict';
var observable = require('data/observable');
var app = require('application');
var platform = require('platform');
var color = require('color');
var http = require('http');
var data = new observable.Observable({});

var page;

// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
  // Get the event sender
  page = args.object;
  page.bindingContext = data;
  data.set('src', '~/gifs/hammer.gif');
  setTimeout(function() {
    return data.set('src', '~/gifs/darthRide.gif');
  }, 3000);
  if (app.android && platform.device.sdkVersion >= '21') {
    var window = app.android.startActivity.getWindow();
    window.setStatusBarColor(new color.Color('#00695C').android);
  }
}
exports.pageLoaded = pageLoaded;

function gifLoaded(args) {
  var gif = args.object;
  // console.log('Gif: ' + gif);
  data.set('gifSrc', gif.src);
}
exports.gifLoaded = gifLoaded;

function stopGif(args) {
  var gifView = page.getViewById('myGif');
  gifView.stop();
}
exports.stopGif = stopGif;

function startGif(args) {
  var gifView = page.getViewById('myGif');
  console.log('Gif: ' + gifView);
  gifView.start();
}
exports.startGif = startGif;

function getFrames(args) {
  var gif = page.getViewById('myGif');
  var frames = gif.getFrameCount();
  data.set('frames', frames);
}
exports.getFrames = getFrames;

function getDuration(gifView) {
  var x = gifView.getDuration();
  data.set('duration', x);
}
exports.getDuration = getDuration;
//# sourceMappingURL=main-page.js.map
