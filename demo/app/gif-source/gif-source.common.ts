import utils = require("utils/utils");
import * as httpModule from "http";

var http: typeof httpModule;
function ensureHttp() {
    if (!http) {
        http = require("http");
    }
}

// This is used for definition purposes only, it does not generate JavaScript for it.
import definition = require("gif-source");

export function fromResource(name: string): definition.GifSource {
    var gif = new definition.GifSource();
    return gif.loadFromResource(name) ? gif : null;
}

export function fromFile(path: string): definition.GifSource {
    var gif = new definition.GifSource();
    return gif.loadFromFile(path) ? gif : null;
}

export function fromUrl(url: string): Promise<definition.GifSource> {
    ensureHttp();
    return http.getImage(url);
}

export function fromFileOrResource(path: string): definition.GifSource {
    if (!isFileOrResourcePath(path)) {
        throw new Error("Path \"" + "\" is not a valid file or resource.");
    }

    if (path.indexOf(utils.RESOURCE_PREFIX) === 0) {
        return fromResource(path.substr(utils.RESOURCE_PREFIX.length));
    }
    return fromFile(path);
}

export function isFileOrResourcePath(path: string): boolean {
    return utils.isFileOrResourcePath(path);
}