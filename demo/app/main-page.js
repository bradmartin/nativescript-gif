"use strict";
var observable = require('data/observable');
var app = require("application");
var platform = require("platform");
var color = require("color");
var http = require("http");
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
    if (app.android && platform.device.sdkVersion >= "21") {
        var window = app.android.startActivity.getWindow();
        window.setStatusBarColor(new color.Color("#00695C").android);
        window.setNavigationBarColor(new color.Color("#004D40").android);
    }
}
exports.pageLoaded = pageLoaded;


function gifLoaded(args) {
    var gif = args.object;
    // console.log('Gif: ' + gif);
    data.set("gifSrc", gif.src);
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



function remoteGif(args) {
    console.log('REMOTE GIF START');
    var url = "https://media4.giphy.com/media/3uyIgVxP1qAjS/200.gif";
    var drawable;
    
    http.request({ url: url, method: "GET" }).then(function (r) {

        // for (var header in r.headers) {
        //     console.log(header + ":" + r.headers[header]);
        // };

        console.log('Response CONTENT: ' + r.content);
        var bytes = r.content.raw;

        // var buffer = java.nio.ByteBuffer.allocate(bytes);
        // // b.copyPixelsToBuffer(buffer);

        // var array = buffer.array();
        // console.log('array: ' + array);

        drawable = new pl.droidsonroids.gif.GifDrawable(bytes);
        console.log('DRAWABLE: ' + drawable);

        var gifImageView = new pl.droidsonroids.gif.GifImageView(app.android.currentContext);
        // gifImageView.setImageURI(android.net.Uri.parse(url));
        // console.log('GIF IMAGE VIEW mainpage.js: ' + gifImageView);

        gifImageView.setImageDrawable(drawable);

        args.view = gifImageView;

    }, function (err) {
        console.log(err);
    });

    // var gifImageView = new pl.droidsonroids.gif.GifImageView(app.android.currentContext);
    // // gifImageView.setImageURI(android.net.Uri.parse(url));
    // // console.log('GIF IMAGE VIEW mainpage.js: ' + gifImageView);

    // gifImageView.setImageDrawable(drawable);

    // args.view = gifImageView;

}
exports.remoteGif = remoteGif;
//# sourceMappingURL=main-page.js.map