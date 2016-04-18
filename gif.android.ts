import Common = require('./gif.common');
import dependencyObservable = require("ui/core/dependency-observable");
import proxy = require("ui/core/proxy");
import utils = require("utils/utils")
import view = require("ui/core/view");
import fs = require("file-system");

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
            console.log('SRC: ' + this.src);

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

            }

            // this._drawable = new pl.droidsonroids.gif.GifDrawable(this.src);

        } else {
            console.log("No src property set for the Gif");
        }

        this._android.setImageDrawable(this._drawable);

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