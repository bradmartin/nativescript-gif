/**
 * Contains the GifSource class, which encapsulates the common abstraction behind a platform specific object that is used as a source for gifs.
 */
declare module "gif-source" {

    /**
     * Encapsulates the common abstraction behind a platform specific object that is used as a source for gifs.
     */
    export class GifSource {


        /**
        * Gets the height of this instance. This is a read-only property.
        */
        height: number;

        /**
         * Gets the width of this instance. This is a read-only property.
         */
        width: number;  
         
        /**
         * Gets the native [android widget](https://github.com/koral--/android-gif-drawable) that represents the user interface for this component. Valid only when running on Android OS.
         */
        android: any /* pl.droidsonroids.gif.GifImageView */;

        /**
         * Gets the native iOS [FLAnimatedImageView](https://github.com/Flipboard/FLAnimatedImage) that represents the user interface for this component. Valid only when running on iOS.
         */
        ios: any /* FLAnimatedImageView */;

        /**
         * Loads this instance from the specified resource name.
         * @param name The name of the resource (without its extension).
         */
        loadFromResource(name: string): boolean;

        /**
         * Loads this instance from the specified file.
         * @param path The location of the file on the file system.
         */
        loadFromFile(path: string): boolean;
        
        /*
        * Loads this instance from the specified url.
        * @param url location of the gif file
        */
        loadFromUrl(url: string): boolean;
        
        /**
         * Sets the provided native source object.
         * This will update either the android or ios properties, depending on the target os.
         * @param source The native gif object.
         */
        setNativeSource(source: any): boolean;
    }

    /**
     * Creates a new GifSource instance and loads it from the specified resource name.
     * @param name The name of the resource (without its extension).
     */
    export function fromResource(name: string): GifSource;

    /**
     * Creates a new GifSource instance and loads it from the specified file.
     * @param path The location of the file on the file system.
     */
    export function fromFile(path: string): GifSource;


    /**
     * Creates a new GifSource instance and sets the provided native source object (typically a Bitmap).
     * The native source object will update either the android or ios properties, depending on the target os.
     * @param source The native image object.
     */
    export function fromNativeSource(source: any): GifSource;

    /**
     * Downloads the gif from the provided Url and creates a new GifSource instance from it.
     * @param url The link to the remote gif file. This operation will download the gif.
     */
    export function fromUrl(url: string): GifSource;

    /**
     * Creates a new GifSource instance and loads it from the specified local file or resource(if spexified with "res://" prefix)
     * @param path The location of the file on the file system.
     */
    export function fromFileOrResource(path: string): GifSource;

    /**
     * [Obsolete. Please use utils.isFileOrResourcePath instead!] Returns true if the specified path points to a resource or local file.
     * @param path The path.
     */
    export function isFileOrResourcePath(path: string): boolean
}