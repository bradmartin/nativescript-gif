/// <reference path="./demo/node_modules/tns-core-modules/tns-core-modules.d.ts" /> Needed for autocompletion and compilation.
/// <reference path="gif.d.ts" />

import definition = require("nativescript-gif");
import view = require("ui/core/view");
import { PropertyMetadata } from "ui/core/proxy";
import dependencyObservable = require("ui/core/dependency-observable");
import platform = require("platform");
import * as types from "utils/types";

var SRC = "src";
var GIF = "Gif";
var ISLOADING = "isLoading";

// on Android we explicitly set propertySettings to None because android will invalidate its layout (skip unnecessary native call).
var AffectsLayout = platform.device.os === platform.platformNames.android ? dependencyObservable.PropertyMetadataSettings.None : dependencyObservable.PropertyMetadataSettings.AffectsLayout;

function onSrcPropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var gif = <Gif>data.object;
    var value = data.newValue;

    if (types.isString(value)) {
        value = value.trim();
        gif.src = value;
    }
}

export class Gif extends view.View implements definition.Gif {

    public static srcProperty = new dependencyObservable.Property(SRC, GIF,
        new PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, onSrcPropertyChanged));

    public static isLoadingProperty = new dependencyObservable.Property(ISLOADING, GIF,
        new PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None));

    constructor(options?: definition.Options) {
        super(options);
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