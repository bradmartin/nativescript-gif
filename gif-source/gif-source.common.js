"use strict";
var utils = require("utils/utils");
var http;
function ensureHttp() {
    if (!http) {
        http = require("http");
    }
}
var definition = require("gif-source");
function fromResource(name) {
    var gif = new definition.GifSource();
    return gif.loadFromResource(name) ? gif : null;
}
exports.fromResource = fromResource;
function fromFile(path) {
    var gif = new definition.GifSource();
    return gif.loadFromFile(path) ? gif : null;
}
exports.fromFile = fromFile;
function fromUrl(url) {
    ensureHttp();
    return http.getImage(url);
}
exports.fromUrl = fromUrl;
function fromFileOrResource(path) {
    if (!isFileOrResourcePath(path)) {
        throw new Error("Path \"" + "\" is not a valid file or resource.");
    }
    if (path.indexOf(utils.RESOURCE_PREFIX) === 0) {
        return fromResource(path.substr(utils.RESOURCE_PREFIX.length));
    }
    return fromFile(path);
}
exports.fromFileOrResource = fromFileOrResource;
function isFileOrResourcePath(path) {
    return utils.isFileOrResourcePath(path);
}
exports.isFileOrResourcePath = isFileOrResourcePath;
//# sourceMappingURL=gif-source.common.js.map