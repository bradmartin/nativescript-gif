"use strict";

var observable = require('data/observable');
var gif = require("nativescript-gif");
var data = new observable.Observable({});

var gifList = [
    { name: 'Office', path: '~/gifs/mikeScott.gif' },
    { name: 'Bugs', path: '~/gifs/bugs.gif' },
    { name: 'Silicon Valley', path: '~/gifs/swimming.gif' },
    { name: 'Steve Harvey', path: '~/gifs/steve.gif' }
]; 

var page;

// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
    // Get the event sender  
    page = args.object;
    page.bindingContext = data;
}
exports.pageLoaded = pageLoaded;

function gifLoaded(args) {
    var gif = args.object;
    console.log('Gif: ' + gif);
    data.set("gifSrc", gif.src);
}
exports.gifLoaded = gifLoaded;

function stopGif(args) {
    console.log('stop');
    var gifView = page.getViewById('myGif');
    gifView.stop();
}
exports.stopGif = stopGif;

function startGif(args) {
    console.log('start');
    var gifView = page.getViewById('myGif');
    gifView.start();
}
exports.startGif = startGif;

function randomGif(args) {
     // Just getting a random hex string from the colorArray values
    var rand = gifList[Math.floor(Math.random() * gifList.length)];
    data.set('gifPath', rand.path);
    console.log(JSON.stringify(rand));
    var gifView = page.getViewById('myGif');
    console.log('gifView.android: ' + gifView.android);
    gifView.src = rand.path;
    // getNumberOfFrames(gifView);
}
exports.randomGif = randomGif;

function getNumberOfFrames(gifView) {
    console.log(gifView.getNumberOfFrames());    
}