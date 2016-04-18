import Common = require('./gif.common');
import dependencyObservable = require("ui/core/dependency-observable");
import proxy = require("ui/core/proxy");
import utils = require("utils/utils")
import enums = require("ui/enums");
import definition = require("nativescript-gif");
import fs = require("file-system");
import * as typesModule from "utils/types";

global.moduleMerge(Common, exports);

declare var FLAnimatedImageView: any, FLAnimatedImage: any, NSData: any, NSURL: any, CGRectMake: any;

function onGifSourcePropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var gif = <Gif>data.object;
    if (!gif.ios) {
        return;
    }

    /// This has the XML src property value    
    console.log('onGifSourcePropertyChanged on gif.ios.ts: ' + data.newValue);

    gif.src = data.newValue;

}

// function onGifSourcePropertyChanged(data: dependencyObservable.PropertyChangeData) {
//     var gif = <Gif>data.object;
//     gif._setNativeGif(data.newValue ? data.newValue.ios : null);
// }

// register the setNativeValue callback
(<proxy.PropertyMetadata>Common.Gif.srcProperty.metadata).onSetNativeValue = onGifSourcePropertyChanged;

export class Gif extends Common.Gif {
    private _ios: FLAnimatedImageView;
    private _animatedImage: FLAnimatedImage;

    constructor(options?: definition.Options) {
        super(options);

        this._ios = FLAnimatedImageView.alloc().init();
        console.log('-------- CONSTRUCTOR -------');
    }

    public onLoaded() {
        console.log('--------- ONLOADED ---------');

        super.onLoaded();

        if (this.src) {
            console.log('ONLOADED: 135 gif.ios.ts: ' + this.src);

            var isUrl = false;

            if (this.src.indexOf("://") !== -1) {
                if (this.src.indexOf('res://') === -1) {
                    isUrl = true;
                }
            }

            console.log('isUrl: ' + isUrl);

            if (!isUrl) {
                var currentPath = fs.knownFolders.currentApp().path;

                if (this.src[1] === '/' && (this.src[0] === '.' || this.src[0] === '~')) {
                    this.src = this.src.substr(2);
                }

                if (this.src[0] !== '/') {
                    this.src = currentPath + '/' + this.src;
                }

                // TODO : add iOS local gif support

            } else {

                this._animatedImage = FLAnimatedImage.animatedImageWithGIFData(
                    NSData.dataWithContentsOfURL(
                        NSURL.URLWithString(this.src)
                    )
                );

                this._ios = FLAnimatedImageView.alloc().init();
                this._ios.animatedImage = this._animatedImage;
                this._ios.frame = CGRectMake(0, 0, 100, 100);
            }


            if (isNaN(this.width) || isNaN(this.height)) {
                this.requestLayout();
            }

        } else {
            throw new Error("Gif requires a src value");
        }
    }

    get src(): any {
        return this._getValue(Gif.srcProperty);
    }

    set src(value: any) {
        this._setValue(Gif.srcProperty, value);
    }

    get ios(): FLAnimatedImageView {
        return this._ios;
    }

    get _nativeView(): FLAnimatedImageView {
        return this._ios;
    }

    public stop(): void {
        console.log('ios STOP');
        console.log('STOP: this.ios = ' + this._ios);
        this._ios.stopAnimating();
    }

    public start(): void {
        console.log('ios START');
        console.log('START: this.ios = ' + this._ios);
        this._ios.startAnimating();
    }

    public getNumberOfFrames(): void {
        console.log('ios getNumberOfFrames');
        var frames = this._ios.animatedImage.frameCount
        return frames;
    }

}