import types = require("utils/types");
import fs = require("file-system");
import common = require("./gif-source-common");
import enums = require("ui/enums");
import definition = require("./gif-source");

declare var android, FLAnimatedImageView, NSBundle, NSURL;

global.moduleMerge(common, exports);

export class GifSource implements definition.GifSource {
    public android: pl.droidsonroids.gif.GifImageView;
    public ios: FLAnimatedImageView;

    public loadFromResource(name: string): boolean { 
        let gifURL = NSBundle.mainBundle().URLForResourceWithExtension(name, null);
        let gif = new FLAnimatedImageView(gifURL);
        this.ios = gif;
        return this.ios != null;
    } 

    public loadFromFile(path: string): boolean {
        var fileName = types.isString(path) ? path.trim() : "";

        if (fileName.indexOf("~/") === 0) {
            fileName = 'file://' + fs.path.join(fs.knownFolders.currentApp().path, fileName.replace("~/", ""));
        }

        let gifUrl = NSURL.URLWithString(fileName);
        let gif = new FLAnimatedImageView(gifUrl);
        this.ios = gif;
        return this.ios != null;
    }
    
    public loadFromUrl(url: string): boolean {
        let gifUrl = NSURL.URLWithString(url);
        let gif = new FLAnimatedImageView(gifUrl);
        this.ios = gif; 
        return this.ios != null;
    }

    public setNativeSource(source: any): boolean {
        this.ios = source;
        return source != null;
    }
}
