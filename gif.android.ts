import Common = require('./gif.common');
import dependencyObservable = require("ui/core/dependency-observable");
import proxy = require("ui/core/proxy");
import utils = require("utils/utils")
import view = require("ui/core/view");
import fs = require("file-system");
import application = require("application");
import * as http from "http";

global.moduleMerge(Common, exports);

function onSrcPropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var gif = <Gif>data.object;
    if (!gif.android) {
        return;
    }

    gif.src = data.newValue;
}

// register the setNativeValue callback
(<proxy.PropertyMetadata>Common.Gif.srcProperty.metadata).onSetNativeValue = onSrcPropertyChanged;

export class Gif extends Common.Gif {
    private _android: pl.droidsonroids.gif.GifImageView;
    private _drawable: pl.droidsonroids.gif.GifDrawable;

    constructor() {
        super();
    }

    get android(): pl.droidsonroids.gif.GifDrawable {
        return this._android;
    }

    public _createUI() {
        this._android = new pl.droidsonroids.gif.GifImageView(this._context);

        if (this.src) {
            var isUrl = false;

            if (this.src.indexOf("://") !== -1) {
                if (this.src.indexOf('res://') === -1) {
                    isUrl = true;
                }
            }

            if (!isUrl) {
                var currentPath = fs.knownFolders.currentApp().path;

                if (this.src[1] === '/' && (this.src[0] === '.' || this.src[0] === '~')) {
                    this.src = this.src.substr(2);
                }

                if (this.src[0] !== '/') {
                    this.src = currentPath + '/' + this.src;
                }

                this._drawable = new pl.droidsonroids.gif.GifDrawable(this.src);

            } else {

                // if (android.os.Build.VERSION.SDK_INT > 9) {
                //     var policy = new android.os.StrictMode.ThreadPolicy.Builder().permitAll().build();
                //     android.os.StrictMode.setThreadPolicy(policy);
                // }

                /*** SUGGESTED APPROACH FROM LIBRARY AUTHOR *****/

                // // // String url = "https://media4.giphy.com/media/BgBf6pW9qOgQU/200.gif";
                // // // URLConnection urlConnection = new URL(url).openConnection();
                // // // urlConnection.connect();
                // // // final int contentLength = urlConnection.getContentLength();
                // // // ByteBuffer buffer = ByteBuffer.allocateDirect(contentLength);
                // // // ReadableByteChannel channel = Channels.newChannel(urlConnection.getInputStream());
                // // // while (buffer.remaining() > 0)
                // // //     channel.read(buffer);
                // // // channel.close();
                // // // GifDrawable drawable = new GifDrawable(buffer);

                // var url = new java.net.URL(this.src);
                // var urlConnection = url.openConnection();
                // urlConnection.connect();
                // var contentLength = urlConnection.getContentLength();
                // var buffer = java.nio.ByteBuffer.allocateDirect(contentLength);
                // var channel = java.nio.channels.Channels.newChannel(urlConnection.getInputStream());
                // while (buffer.remaining() > 0) {
                //     channel.read(buffer);
                // }
                // channel.close();                


                http.request({ url: this.src, method: "GET" }).then(function (r) {

                    let contentLength;
                    for (var header in r.headers) {
                        if (header === "Content-Length") {
                            contentLength = r.headers[header];
                            break;
                        }
                    };

                    console.log('contentLength: ' + contentLength);

                    let buffer = java.nio.ByteBuffer.allocateDirect(contentLength);
                    console.log('buffer: ' + buffer);

                    // var array = buffer.array();
                    // console.log('array: ' + array);

                    // var inputStream = java.io.InputStream.read(array);
                    // console.log('inputStream: ' + inputStream);

                    let channel = java.nio.channels.Channels.newChannel(r.content.raw);
                    console.log('channel: ' + channel);

                    let bytesRead = 0;
                    console.log('bytesRead: ' + bytesRead);

                    /**** THIS WORKS IN THE NATIVE ANDROID CODE ABOVE but NOT HERE *****/
                    while (buffer.remaining() > 0) {
                        channel.read(buffer);
                    }

                    // /**  ANOTHER OPTION TO ATTEMPT THE WHILE LOOP IS NOT WORKING :/    **/
                    // while (bytesRead >= 0) {
                    //     buffer.rewind();
                    //     bytesRead = channel.read(buffer);
                    //     buffer.rewind();

                    //     for (var i = 0; i < bytesRead; i++) {
                    //         var b = buffer.get();
                    //         console.log('Byte read: ' + b);
                    //     }
                    // }

                    channel.close();

                    this._drawable = new pl.droidsonroids.gif.GifDrawable(buffer);
                    console.log('this._drawable: ' + this._drawable);

                }, function (err) {
                    console.log(err);
                });

                // this._drawable = new pl.droidsonroids.gif.GifDrawable(buffer);

            }

            this._android.setImageDrawable(this._drawable);

        } else {
            console.log("No src property set for the Gif");
        }

    }



    /**
     * Stop playing the .gif
     */
    public stop(): void {
        this._drawable.stop();
    }

    /**
     * Start playing the .gif
     */
    public start(): void {
        this._drawable.start();
    }

    /**
     * Check if the .gif is playing.
     * @returns  Boolean
     */
    public isPlaying(): boolean {
        var isPlaying = this._drawable.isRunning();
        return isPlaying;
    }

    /**
     * Get the frame count for a .gif.
     * @returns  Number of frames.
     */
    public getFrameCount(): number {
        var frames = this._drawable.getNumberOfFrames();
        return frames;
    }

    public reset(): void {
        this._drawable.reset();
    }

    public getDuration(): number {
        var duration = this._drawable.getDuration();
        return duration;
    }

    public setSpeed(factor: number): void {
        this._drawable.setSpeed(factor);
    }

    public recycle(): void {
        this._drawable.recycle();
    }

}