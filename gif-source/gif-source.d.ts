/**
 * Contains the GifSource class that is used as a source for gifs.
 */
declare module "gif-source" {
    
    /**
     * Encapsulates the common abstraction behind a platform specific object (typically a Bitmap) that is used as a source for images.
     */
    export class GifSource {

        /**
         * Gets the native [android widget](https://github.com/koral--/android-gif-drawable) that represents the user interface for this component. Valid only when running on Android OS.
         */
        android: any /* pl.droidsonroids.gif.GifImageView */;

        /**
         * Gets the native iOS [Gifu](https://cocoapods.org/pods/Gifu) that represents the user interface for this component. Valid only when running on iOS.
         */
        ios: any /* UIImageView */;

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
    }

   /**
    * Creates a new GifSource instance and loads it from the specified resource name.
    * @param name The name of the resource (without its extension).
    */
    export function fromResource(name: string): GifSource;

   /**
    * Creates a new ImageSource instance and loads it from the specified file.
    * @param path The location of the file on the file system.
    */
    export function fromFile(path: string): GifSource;

   /**
    * Downloads the image from the provided Url and creates a new GifSource instance from it.
    * @param url The link to the remote gif. This operation will download and decode the gif.
    */
    export function fromUrl(url: string): Promise<GifSource>;

    /**
     * Creates a new ImageSource instance and loads it from the specified local file or resource(if spexified with "res://" prefix)
     * @param path The location of the file on the file system.
     */
    export function fromFileOrResource(path: string): GifSource;
}