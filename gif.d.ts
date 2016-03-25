/**
 * Contains the Gif class, which represents a gif widget.
 */
declare module "gif" {
    import dependencyObservable = require("ui/core/dependency-observable");
    import image = require("ui/image");
    import gifSource = require("gif-source");

    /**
     * Represents a class that provides functionality for loading gif(s).
     */
    export class Gif extends image.Image {
        public static srcProperty: dependencyObservable.Property;
        public static imageSourceProperty: dependencyObservable.Property;
        public static isLoadingProperty: dependencyObservable.Property;

        public stop(): void;

        public start(): void;
        
        /**
         * Gets the native [android widget](https://github.com/koral--/android-gif-drawable) that represents the user interface for this component. Valid only when running on Android OS.
         */
        android: any /* pl.droidsonroids.gif.GifImageView */;

        /**
         * Gets the native iOS [Gifu](https://cocoapods.org/pods/Gifu) that represents the user interface for this component. Valid only when running on iOS.
         */
        ios: any /* UIImageView */;

        /**
        * Gets or sets the gif source of the gif.
        */
        gifSource: gifSource.GifSource;


        /**
         * Gets or sets the source of the Gif. This can be either an URL string or a native image instance.
         */
        src: any;

        /**
         * Gets a value indicating if the gif is currently loading
         */
        isLoading: boolean;        
    }
}