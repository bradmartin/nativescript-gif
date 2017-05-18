import Common = require('./gif.common');
import utils = require("utils/utils")
import view = require("ui/core/view");
import fs = require("file-system");
import application = require("application");
import * as http from "http";
import { srcProperty } from "./gif.common";

declare var pl: any;

global.moduleMerge(Common, exports);

export class Gif extends Common.Gif {
    private _drawable: any;

    constructor() {
        super();
    }

    public createNativeView() {
        this.nativeView = new pl.droidsonroids.gif.GifImageView(this._context);
        return this.nativeView;
    }

    /**
     * Stop playing the .gif
     */
    public stop(): void {
        if (this._drawable)
            this._drawable.stop();
    }

    /**
     * Start playing the .gif
     */
    public start(): void {
        if (this._drawable)
            this._drawable.start();
    }

    /**
     * Check if the .gif is playing.
     * @returns  Boolean
     */
    public isPlaying(): boolean {
        if (this._drawable) {
            var isPlaying = this._drawable.isRunning();
            return isPlaying;
        } else {
            return false;
        }
    }

    /**
     * Get the frame count for a .gif.
     * @returns  Number of frames.
     */
    public getFrameCount(): number {
        if (this._drawable)
            var frames = this._drawable.getNumberOfFrames();
        return frames;
    }

    public reset(): void {
        this._drawable.reset();
    }

    public getDuration(): number {
        if (this._drawable) {
            var duration = this._drawable.getDuration();
            return duration;
        } else {
            return 0;
        }
    }

    public setSpeed(factor: number): void {
        if (this._drawable)
            this._drawable.setSpeed(factor);
    }

    public recycle(): void {
        if (this._drawable)
            this._drawable.recycle();
    }

    [srcProperty.setNative](value: string) {
        var that = this;  // TS doesn't always know when to create that
        if (value) {
            value = value.trim();
            var isUrl = false;

            if (value.indexOf("://") !== -1) {
                if (value.indexOf('res://') === -1) {
                    isUrl = true;
                }
            }

            if (!isUrl) {
                var currentPath = fs.knownFolders.currentApp().path;

                if (value[1] === '/' && (value[0] === '.' || value[0] === '~')) {
                    value = value.substr(2);
                }

                if (value[0] !== '/') {
                    value = currentPath + '/' + value;
                }

                this._drawable = new pl.droidsonroids.gif.GifDrawable(value);
                this.nativeView.setImageDrawable(this._drawable);

            } else {

                http.request({ url: value, method: "GET" }).then(function (r) {

                    that._drawable = new pl.droidsonroids.gif.GifDrawable(r.content.raw.toByteArray());
                    that.nativeView.setImageDrawable(that._drawable);


                }, function (err) {
                    console.log(err);
                });

            }

        } else {
            console.log("No src property set for the Gif");
        }
    }

}


    // var array = buffer.array();
                    // console.log('array: ' + array);

                    // var inputStream = java.io.InputStream.read(array);
                    // console.log('inputStream: ' + inputStream);