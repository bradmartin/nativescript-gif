"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
var view = require("ui/core/view");
var gifSource = require("./gif-source");
var platform = require("platform");
var types = require("utils/types");
var SRC = "src";
var GIF_SOURCE = "gifSource";
var GIF = "Gif";
var ISLOADING = "isLoading";
var AffectsLayout = platform.device.os === platform.platformNames.android ? dependencyObservable.PropertyMetadataSettings.None : dependencyObservable.PropertyMetadataSettings.AffectsLayout;
function onSrcPropertyChanged(data) {
    var gif = data.object;
    var value = data.newValue;
    if (types.isString(value)) {
        value = value.trim();
        gif.gifSource = null;
        gif["_url"] = value;
        gif._setValue(Gif.isLoadingProperty, true);
        if (gifSource.isFileOrResourcePath(value)) {
            gif.gifSource = gifSource.fromFileOrResource(value);
            gif._setValue(Gif.isLoadingProperty, false);
        }
        else {
            gifSource.fromUrl(value).then(function (r) {
                if (gif["_url"] === value) {
                    gif.gifSource = r;
                    gif._setValue(Gif.isLoadingProperty, false);
                }
            });
        }
    }
    else if (value instanceof gifSource.GifSource) {
        gif.gifSource = value;
    }
}
var Gif = (function (_super) {
    __extends(Gif, _super);
    function Gif() {
        _super.call(this);
    }
    Gif.prototype.stop = function () {
    };
    Gif.prototype.start = function () {
    };
    Object.defineProperty(Gif.prototype, "gifSource", {
        get: function () {
            return this._getValue(Gif.gifSourceProperty);
        },
        set: function (value) {
            this._setValue(Gif.gifSourceProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gif.prototype, "src", {
        get: function () {
            return this._getValue(Gif.srcProperty);
        },
        set: function (value) {
            this._setValue(Gif.srcProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gif.prototype, "isLoading", {
        get: function () {
            return this._getValue(Gif.isLoadingProperty);
        },
        enumerable: true,
        configurable: true
    });
    Gif.srcProperty = new dependencyObservable.Property(SRC, GIF, new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, onSrcPropertyChanged));
    Gif.gifSourceProperty = new dependencyObservable.Property(GIF_SOURCE, GIF, new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None));
    Gif.isLoadingProperty = new dependencyObservable.Property(ISLOADING, GIF, new proxy.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None));
    return Gif;
}(view.View));
exports.Gif = Gif;
//# sourceMappingURL=gif.common.js.map