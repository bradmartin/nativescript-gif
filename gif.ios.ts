import Common = require('./gif.common');
import dependencyObservable = require("ui/core/dependency-observable");
import proxy = require("ui/core/proxy");
import utils = require("utils/utils")
import enums = require("ui/enums");
import definition = require("gif");
import * as typesModule from "utils/types";

declare var FLAnimatedImageView, FLAnimatedImage, NSData, NSURL, CGRectMake;

global.moduleMerge(Common, exports);

function onGifSourcePropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var gif = <Gif>data.object;
    gif._setNativeGif(data.newValue ? data.newValue.ios : null);
}

// register the setNativeValue callback
(<proxy.PropertyMetadata>Common.Gif.gifSourceProperty.metadata).onSetNativeValue = onGifSourcePropertyChanged;

export class Gif extends Common.Gif {
    private _ios: FLAnimatedImageView;
    private _animatedImage: FLAnimatedImage;
    private _src: string;

    constructor(options?: definition.Options) {
        super(options);

        this._animatedImage = FLAnimatedImage.animatedImageWithGIFData(
            NSData.dataWithContentsOfURL(NSURL.URLWithString(
                "https://media1.giphy.com/media/ixCowc31ZeKuIHuhFe/200.gif"
            ))
        );

        this._ios = FLAnimatedImageView.alloc().init();
        this._ios.animatedImage = this._animatedImage;
        this._ios.frame = CGRectMake(0, 0, 100, 100);


    }

    public _setNativeGif(nativeGif: any) {
        if (nativeGif != null) {
            this._animatedImage = nativeGif;
            this._ios.animatedImage = this._animatedImage;
        }
    }


    get ios(): FLAnimatedImageView {
        return this._ios;
    }

    get _nativeView(): FLAnimatedImageView {
        return this._ios;
    }

}