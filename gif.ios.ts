import Common = require('./gif.common');
import dependencyObservable = require("ui/core/dependency-observable");
import proxy = require("ui/core/proxy");
import { View } from "ui/core/view";
import utils = require("utils/utils")
import enums = require("ui/enums");
import definition = require("nativescript-gif");
import fs = require("file-system");
import * as typesModule from "utils/types";

global.moduleMerge(Common, exports);

declare var FLAnimatedImageView: any, FLAnimatedImage: any, NSData: any, NSString: any, NSURL: any, CGRectMake: any;

function onSrcPropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var gif = <Gif>data.object;
    if (!gif.ios) {
        return;
    }

    gif.src = data.newValue;

}

// register the setNativeValue callback
(<proxy.PropertyMetadata>Common.Gif.srcProperty.metadata).onSetNativeValue = onSrcPropertyChanged;

export class Gif extends Common.Gif {
    private _ios: FLAnimatedImageView;
    private _animatedImage: FLAnimatedImage;

    constructor(options?: definition.Options) {
        super(options);
        this._ios = FLAnimatedImageView.alloc().initWithFrame(CGRectMake(0, 0, 100, 100));
        this._ios.clipsToBounds = true;
    }

    public onLoaded() {
        super.onLoaded();

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
                // Using a local .gif
                this._animatedImage = FLAnimatedImage.animatedImageWithGIFData(
                    NSData.dataWithContentsOfFile(
                        NSString.stringWithString(this.src)
                    )
                );
                
            } else {
                // Using a URL
                this._animatedImage = FLAnimatedImage.animatedImageWithGIFData(
                    NSData.dataWithContentsOfURL(
                        NSURL.URLWithString(this.src)
                    )
                );   
                
            }

            try {
                this._ios.animatedImage = this._animatedImage;
                this._ios.frame = CGRectMake(0, 0, 100, 100);
            } catch (ex) {
                console.log(ex);
            }


            if (isNaN(this.width) || isNaN(this.height)) {
                this.requestLayout();
            }

        } else {
            console.log("No src value detected.");
        }
    }

    get ios(): FLAnimatedImageView {
        return this._ios;
    }

    get _nativeView(): FLAnimatedImageView {
        return this._ios;
    }

    get src(): any {
        return this._getValue(Gif.srcProperty);
    }

    set src(value: any) {
        this._setValue(Gif.srcProperty, value);
    }


    /**
     * Stop playing the .gif
     */
    public stop(): void {
        this._ios.stopAnimating();
    }

    /**
     * Start playing the .gif
     */
    public start(): void {
        this._ios.startAnimating();
    }

    /**
     * Check if the .gif is playing.
     * @returns  Boolean
     */
    public isPlaying(): boolean {
        var isPlaying = this._ios.animatedImage.isAnimating();
        return isPlaying;
    }

    /**
     * Get the frame count for a .gif.
     * @returns  Number of frames.
     */
    public getFrameCount(): number {
        var frames = this._ios.animatedImage.frameCount
        return frames;
    }

}