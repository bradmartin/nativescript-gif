/**
 * Contains the Gif class, which represents a gif widget.
 */
declare module "nativescript-gif" {
    import dependencyObservable = require("ui/core/dependency-observable");
    import gifSource = require("gif-source");
    import * as view from "ui/core/view";


    /**
     * Represents a class that provides functionality for loading gif(s).
     */
    export class Gif extends view.View {
        public static srcProperty: dependencyObservable.Property;
        public static gifSourceProperty: dependencyObservable.Property;
        public static isLoadingProperty: dependencyObservable.Property;

        /**
         * starts playing the .gif
         */
        public start(): void;

        /**
         * stops playing the .gif
         */
        public stop(): void;

        /**
         * Returns the number of frames in the current Gif         
        */
        public getNumberOfFrames(): number;

        /**
         * Gets the native [android widget](https://github.com/koral--/android-gif-drawable) that represents the user interface for this component. Valid only when running on Android OS.
         */
        android: any /* pl.droidsonroids.gif.GifImageView */;

        /**
         * Gets the native iOS [FLAnimatedImageView](https://github.com/Flipboard/FLAnimatedImage) that represents the user interface for this component. Valid only when running on iOS.
         */
        ios: any /* FLAnimatedImageView */;

        /**
         * Gets or sets the source of the Gif. This can be either an URL string or a native gif instance.
         */
        src: any;

        /*
         * Gets or sets the gif source of the Gif.
        */

        videoSource: gifSource.GifSource;

        /**
         * Gets a value indicating if the gif is currently loading
         */
        isLoading: boolean;
    }

    /**
        * Provides common options for creating a video
        */
    export interface Options extends view.Options {

        /*
        * Gets or set the video source of the gif.
        */
        gifSource: gifSource.GifSource;

        /**
         * Gets or sets the URL of the gif
         */
        src: string;
    }


}