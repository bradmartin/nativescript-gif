import types = require("utils/types");
import definition = require("gif-source");
import common = require("./gif-source-common");
import * as utilsModule from "utils/utils";
import * as fileSystemModule from "file-system";

global.moduleMerge(common, exports);

var utils: typeof utilsModule;
function ensureUtils() {
    if (!utils) {
        utils = require("utils/utils");
    }
}

var fs: typeof fileSystemModule;
function ensureFS() {
    if (!fs) {
        fs = require("file-system");
    }
}

var pl = pl;

export class GifSource implements definition.GifSource {
    public android: pl.droidsonroids.gif.GifDrawable;
    // public ios: UIImage;

    public loadFromResource(name: string): boolean {
        this.android = null;

        ensureUtils();

        var res = utils.ad.getApplicationContext().getResources();
        if (res) {
            var identifier: number = res.getIdentifier(name, 'drawable', utils.ad.getApplication().getPackageName());
            if (0 < identifier) {
                // Load BitmapDrawable with getDrawable to make use of Android internal caching
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
    }

    public loadFromFile(path: string): boolean {
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
    }
}