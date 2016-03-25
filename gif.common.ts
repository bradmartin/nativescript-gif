import definition = require("gif");
import dependencyObservable = require("ui/core/dependency-observable");
import proxy = require("ui/core/proxy");
import image = require("ui/image");
import view = require("ui/core/view");
//import gifSource = require("./gif-source");
import platform = require("platform");
import utils = require("utils/utils");
import fs = require("file-system");
import * as types from "utils/types";
import imageCommon = require("ui/image/image-common");

var SRC = "src";
var GIF_SOURCE = "gifSource";
var GIF = "Gif";
var ISLOADING = "isLoading";

// on Android we explicitly set propertySettings to None because android will invalidate its layout (skip unnecessary native call).
var AffectsLayout = platform.device.os === platform.platformNames.android ? dependencyObservable.PropertyMetadataSettings.None : dependencyObservable.PropertyMetadataSettings.AffectsLayout;

function onSrcPropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var gif = <Gif>data.object;
    var value = data.newValue;

    if (types.isString(value)) {
        value = value.trim();
    }
/*        gif.gifSource = null;
        gif["_url"] = value;

        gif._setValue(Gif.isLoadingProperty, true);

        if (gifSource.isFileOrResourcePath(value)) {
            gif.gifSource = gifSource.fromFileOrResource(value);
            gif._setValue(Gif.isLoadingProperty, false);
        } else {
            gifSource.fromUrl(value).then((r) => {
                if (gif["_url"] === value) {
                    gif.gifSource = r;
                    gif._setValue(Gif.isLoadingProperty, false);
                }
            });
        }
    } else if (value instanceof gifSource.GifSource) {
        // Support binding the imageSource trough the src property
        gif.gifSource = value;
    } */
}

export class Gif extends image.Image implements definition.Gif {

    public static srcProperty = new dependencyObservable.Property(SRC, GIF,
        new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, onSrcPropertyChanged));

    // None on purpose. for iOS we trigger it manually if needed. Android layout handles it.
    public static gifSourceProperty = new dependencyObservable.Property(GIF_SOURCE, GIF,
        new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None));

    public static isLoadingProperty = new dependencyObservable.Property(ISLOADING, GIF,
        new proxy.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None));

    constructor() {
        super();
    }

    public stop(): void {

    }

    public start(): void {

    }

    get gifSource(): gifSource.GifSource {
        return this._getValue(Gif.gifSourceProperty);
    }
    set gifSource(value: gifSource.GifSource) {
        this._setValue(Gif.gifSourceProperty, value);
    }

    get src(): any {
        return this._getValue(Gif.srcProperty);
    }
    set src(value: any) {
        this._setValue(Gif.srcProperty, value);
    }

    get isLoading(): boolean {
        return this._getValue(Gif.isLoadingProperty);
    }

}
