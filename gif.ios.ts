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

function onSrcPropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var gif = <Gif>data.object;
    if (!gif.ios) {
        return;
    }

    /// This has the XML src property value    
    console.log('onSrcPropertyChanged on gif.ios.ts: ' + data.newValue);

    gif.src = data.newValue;

}
// register the setNativeValue callback
(<proxy.PropertyMetadata>Common.Gif.srcProperty.metadata).onSetNativeValue = onSrcPropertyChanged;

export class Gif extends Common.Gif {
    private _ios: FLAnimatedImageView;
    private _animatedImage: FLAnimatedImage;

    constructor(options?: definition.Options) {
        super(options);

        console.log('** CONSTRUCTOR **');
        console.log('this: ' + this);
        console.log('this._ios: ' + this._ios);

        console.log(this.src);

            if (this.src) {
                console.log('gif.ios.js SRC: ' + this.src);

                var isUrl = false;

                if (this.src.indexOf("://") !== -1) {
                    if (this.src.indexOf('res://') === -1) {
                        isUrl = true;
                        console.log('isUrl: ' + isUrl);
                    }
                }

                // NOT A REMOTE URL            
                if (!isUrl) {
                    var currentPath = fs.knownFolders.currentApp().path;

                    if (this.src[1] === '/' && (this.src[0] === '.' || this.src[0] === '~')) {
                        this.src = this.src.substr(2);
                    }

                    if (this.src[0] !== '/') {
                        this.src = currentPath + '/' + this.src;
                    }

                    console.log('!isUrl this.src: ' + this.src);

                    // this._drawable = new pl.droidsonroids.gif.GifDrawable(this.src);
                }
                else // Gif src is a remote Url
                {
                    let src = "'" + this.src + "'";
                    console.log('is a remote url: ' + this.src);
                    this._animatedImage = FLAnimatedImage.animatedImageWithGIFData(
                        NSData.dataWithContentsOfURL(NSURL.URLWithString(
                            src
                        ))
                    );

                    this._ios = FLAnimatedImageView.alloc().init();
                    this._ios.animatedImage = this._animatedImage;
                    this._ios.frame = CGRectMake(0, 0, 100, 100);

                }

            }
            else {
                console.log("No src property set for the Gif");
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
        this._ios.stopAnimating();
    }

    public start(): void {
        console.log('ios START');
        this._ios.startAnimating();
    }

    public getNumberOfFrames(): void {
        console.log('ios getNumberOfFrames');
        var frames = this._ios.animatedImage.frameCount
        return frames;
    }

}