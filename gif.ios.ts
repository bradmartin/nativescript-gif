import Common = require('./gif.common');
import dependencyObservable = require("ui/core/dependency-observable");
import { View } from "ui/core/view";
import utils = require("utils/utils")
import enums = require("ui/enums");
import fs = require("file-system");
import * as typesModule from "utils/types";
import { srcProperty } from "./gif.common";
import {PercentLength} from "ui/styling/style-properties";

global.moduleMerge(Common, exports);

declare const FLAnimatedImage, NSData, NSString, NSURL, CGRectMake, FLAnimatedImageView;

export class Gif extends Common.Gif {
    private _animatedImage: any;

    constructor() {
        super();
        this.nativeView = FLAnimatedImageView.alloc().initWithFrame(CGRectMake(0, 0, 100, 100));
        this.nativeView.clipsToBounds = true;
    }

    [srcProperty.setNative](value: string) {
         if (value) {
            var isUrl = false;

            if (value.indexOf("://") !== -1) {
                if (value.indexOf('res://') === -1) {
                    isUrl = true;
                }
            }

            if (!isUrl) {
                var currentPath = fs.knownFolders.currentApp().path;

                if (value[1] === '/' && (value[0] === '.' || value[0] === '~')) {
                    value = value.substr(2);
                }

                if (value[0] !== '/') {
                    value = currentPath + '/' + value;
                }
                // Using a local .gif
                this._animatedImage = FLAnimatedImage.animatedImageWithGIFData(
                    NSData.dataWithContentsOfFile(
                        NSString.stringWithString(value)
                    )
                );
                
            } else {
                // Using a URL
                this._animatedImage = FLAnimatedImage.animatedImageWithGIFData(
                    NSData.dataWithContentsOfURL(
                        NSURL.URLWithString(value)
                    )
                );   
                
            }

            try {
                this.nativeView.animatedImage = this._animatedImage;
                this.nativeView.frame = CGRectMake(0, 0, 100, 100);
            } catch (ex) {
                console.log(ex);
            }


            if (isNaN(PercentLength.toDevicePixels(this.width)) || isNaN(PercentLength.toDevicePixels(this.height))) {
                this.requestLayout();
            }

        } else {
            console.log("No src value detected.");
        }
    }

    /**
     * Stop playing the .gif
     */
    public stop(): void {
        this.nativeView.stopAnimating();
    }

    /**
     * Start playing the .gif
     */
    public start(): void {
        this.nativeView.startAnimating();
    }

    /**
     * Check if the .gif is playing.
     * @returns  Boolean
     */
    public isPlaying(): boolean {
        var isPlaying = this.nativeView.animatedImage.isAnimating();
        return isPlaying;
    }

    /**
     * Get the frame count for a .gif.
     * @returns  Number of frames.
     */
    public getFrameCount(): number {
        var frames = this.nativeView.animatedImage.frameCount
        return frames;
    }

}