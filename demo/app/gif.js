"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Common = require('./gif.common');
var fs = require("file-system");
global.moduleMerge(Common, exports);
function onSrcPropertyChanged(data) {
    var gif = data.object;
    if (!gif.android) {
        return;
    }
}
Common.Gif.gifSourceProperty.metadata.onSetNativeValue = onSrcPropertyChanged;
var Gif = (function (_super) {
    __extends(Gif, _super);
    function Gif() {
        _super.call(this);
    }
    Object.defineProperty(Gif.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Gif.prototype._createUI = function () {
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
                this.drawable = new pl.droidsonroids.gif.GifDrawable(this.src);
            }
            this.drawable = new pl.droidsonroids.gif.GifDrawable(this.src);
        }
        else {
            console.log("No src property set for the Gif");
        }
        this._android.setImageDrawable(this.drawable);
    };
    return Gif;
}(Common.Gif));
exports.Gif = Gif;
//# sourceMappingURL=gif.android.js.map