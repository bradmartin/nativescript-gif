import definition = require("nativescript-gif");
import dependencyObservable = require("ui/core/dependency-observable");
import view = require("ui/core/view");
import proxy = require("ui/core/proxy");
import gifSource = require("./gif-source/gif-source");
import image = require("ui/image");
import enums = require("ui/enums");
import platform = require("platform");
import fs = require("file-system");
import utils = require("utils/utils");
import * as types from "utils/types";

var SRC = "src";
var GIF_SOURCE = "gifSource";
var GIF = "Gif";
var ISLOADING = "isLoading";

// on Android we explicitly set propertySettings to None because android will invalidate its layout (skip unnecessary native call).
var AffectsLayout = platform.device.os === platform.platformNames.android ? dependencyObservable.PropertyMetadataSettings.None : dependencyObservable.PropertyMetadataSettings.AffectsLayout;

function onSrcPropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var gif = <Gif>data.object;
    var value = data.newValue;

    // if (types.isString(value)) {
    //     value = value.trim();
    //     gif.src = value;
    // }
    console.log('onSrcPropertyChanged: ' + value);

    if (types.isString(value)) {
        value = value.trim();
        gif.gifSource = null;
        gif["_url"] = value;

        gif._setValue(Gif.isLoadingProperty, true);

        if (utils.isFileOrResourcePath(value)) {
            gif.gifSource = gifSource.fromFileOrResource(value);
            gif._setValue(Gif.isLoadingProperty, false);
        } else {
            if (gif["_url"] === value) {
                gif.gifSource = gifSource.fromUrl(value);
                gif._setValue(Gif.isLoadingProperty, false);
            }
        }
    } else if (value instanceof gifSource.GifSource) {
        gif.gifSource = value;
    } else {
        gif.gifSource = gifSource.fromNativeSource(value);
    }

}

export class Gif extends view.View implements definition.Gif {

    public static srcProperty = new dependencyObservable.Property(
        SRC,
        GIF,
        new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, onSrcPropertyChanged));

    public static gifSourceProperty = new dependencyObservable.Property(
        GIF_SOURCE,
        GIF,
        new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None)
    );

    public static isLoadingProperty = new dependencyObservable.Property(
        ISLOADING,
        GIF,
        new proxy.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None));

    constructor(options?: definition.Options) {
        super();
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

    public _setNativeGif(nativeGif: any) {
        //
    }

    public stop(): void {

    }

    public start(): void {

    }

}
