/**
 * Contains the Gif class, which represents a gif widget.
 */
import { View } from 'tns-core-modules/ui/core/view';

/**
 * Represents a class that provides functionality for loading gif(s).
 */
export class Gif extends View {
  public static srcProperty: any;
  public static isLoadingProperty: any;

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

  /**
   * Gets a value indicating if the gif is currently loading
   */
  isLoading: boolean;

  /**
   * Stop playing the .gif
   */
  stop: () => void;
  /**
   * Start playing the .gif
   */
  start: () => void;

  /**
   * Check if the .gif is playing.
   * @returns  Boolean
   */
  isPlaying: () => boolean;

  /**
   * Get the frame count for a .gif.
   * @returns  Number of frames.
   */
  getFrameCount(): number;

  /**
   * Android Only
   */
  reset(): void;

  /**
   * Android Only
   */
  getDuration(): number;

  /**
   * Android Only
   */
  setSpeed(factor: number): void;

  /**
   * Android Only
   */
  recycle(): void;
}
