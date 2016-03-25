"use strict";
var common = require("./gif-source-common");
global.moduleMerge(common, exports);
var utils;
function ensureUtils() {
    if (!utils) {
        utils = require("utils/utils");
    }
}
var fs;
function ensureFS() {
    if (!fs) {
        fs = require("file-system");
    }
}
var pl = pl;
var GifSource = (function () {
    function GifSource() {
    }
    GifSource.prototype.loadFromResource = function (name) {
        this.android = null;
        ensureUtils();
        var res = utils.ad.getApplicationContext().getResources();
        if (res) {
            var identifier = res.getIdentifier(name, 'drawable', utils.ad.getApplication().getPackageName());
            if (0 < identifier) {
                var resString = 'android.R.drawable.' + name;
                var ResName = resString.replace(/'/g, '');
                console.log('rNameReplaced: ' + ResName);
                var gifResource = new pl.droidsonroids.gif.GifDrawable(res, ResName);
                if (gifResource) {
                    this.android = gifResource;
                }
            }
        }
        return this.android != null;
    };
    GifSource.prototype.loadFromFile = function (path) {
        this.android = null;
        ensureFS();
        console.log('loadFromFile PATH: ' + path);
        var currentPath = fs.knownFolders.currentApp().path;
        if (path[1] === '/' && (path[0] === '.' || path[0] === '~')) {
            path = path.substr(2);
        }
        if (path[0] !== '/') {
            path = currentPath + '/' + path;
        }
        this.android = new pl.droidsonroids.gif.GifDrawable(path);
        return this.android != null;
    };
    return GifSource;
}());
exports.GifSource = GifSource;
//# sourceMappingURL=gif-source.android.js.map