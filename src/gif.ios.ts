/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="./typings/FLAnimatedImage.d.ts" />

import { knownFolders } from 'tns-core-modules/file-system';
import { PercentLength } from 'tns-core-modules/ui/styling/style-properties';
import { GifCommon, headersProperty, srcProperty } from './gif.common';

export class Gif extends GifCommon {
  private _animatedImage: any;
  private _headers: any;
  private _src: string;

  constructor() {
    super();
    this.nativeView = FLAnimatedImageView.alloc().initWithFrame(
      CGRectMake(0, 0, 100, 100)
    );
    this.nativeView.clipsToBounds = true;
    this._headers = null;
    this._src = null;
  }

  [headersProperty.setNative](value) {
    this._setHeader(value ? value : null);
  }

  [srcProperty.setNative](value: string) {
    this._setSrcProperty(value);
  }

  private _setSrcProperty(value: string) {
    if (value) {
      let isUrl = false;

      if (value.indexOf('://') !== -1) {
        if (value.indexOf('res://') === -1) {
          isUrl = true;
        }
      }
      this._src = value;

      if (!isUrl) {
        const currentPath = knownFolders.currentApp().path;

        if (value[1] === '/' && (value[0] === '.' || value[0] === '~')) {
          value = value.substr(2);
        }

        if (value[0] !== '/') {
          value = currentPath + '/' + value;
        }
        // Using a local .gif
        this._animatedImage = FLAnimatedImage.animatedImageWithGIFData(
          NSData.dataWithContentsOfFile(NSString.stringWithString(value) as any)
        );
        // We need to set the image in case the GIF is not from an URL
        this._setImage();
      } else {
        // Using a URL
        if (this._headers) {
          this._useAnimatedImageFromUrl(value, this._headers);
        } else {
          this._useAnimatedImageFromUrl(value);
        }
      }
    } else {
      console.log('No src value detected.');
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
   * Restarts the .gif
   */
  public reset(): void {
    let temp = this.nativeView.animatedImage;
    this.nativeView.animatedImage = null;
    this.nativeView.animatedImage = temp;

    temp = null;
  }

  /**
   * Check if the .gif is playing.
   * @returns  Boolean
   */
  public isPlaying(): boolean {
    return this.nativeView.animating;
  }

  /**
   * Get the frame count for a .gif.
   * @returns  Number of frames.
   */
  public getFrameCount(): number {
    const frames = this.nativeView.animatedImage.frameCount;
    return frames;
  }

  private _useAnimatedImageFromUrl(url: string, headers?: any): void {
    const nsUrl = NSURL.URLWithString(url);
    if (headers) {
      const request = NSMutableURLRequest.requestWithURL(nsUrl);
      for (const property in headers) {
        if (headers.hasOwnProperty(property)) {
          console.log('headers: ' + property + ', value: ' + headers[property]);
          request.addValueForHTTPHeaderField(headers[property], property);
        }
      }
      request.HTTPMethod = 'GET';
      const session = NSURLSession.sharedSession;
      const task = session.dataTaskWithRequestCompletionHandler(
        request,
        (data, response, err) => {
          if (err) {
            console.log('Error loading Gif: ' + err.localizedDescription);
          } else {
            this._animatedImage = FLAnimatedImage.animatedImageWithGIFData(
              data
            );
            this._setImage();
          }
        }
      );
      task.resume();
    } else {
      const data = NSData.dataWithContentsOfURL(nsUrl);
      // TODO: why is this not working here for giphy urls haven't tried others, maybe header related?
      console.log('data', data);
      this._animatedImage = FLAnimatedImage.animatedImageWithGIFData(data);
      console.log('animatedImage', this._animatedImage);
      this._setImage();
    }
  }

  private _setImage(): void {
    try {
      this.nativeView.animatedImage = this._animatedImage;
      this.nativeView.frame = CGRectMake(0, 0, 100, 100);
    } catch (ex) {
      console.log(ex);
    }

    if (
      isNaN(PercentLength.toDevicePixels(this.width)) ||
      isNaN(PercentLength.toDevicePixels(this.height))
    ) {
      this.requestLayout();
    }
  }

  private _setHeader(headers: any): void {
    if (headers) {
      this._headers = headers;
      if (this._src && this._src.length > 0) {
        this._setSrcProperty(this._src);
      }
    } else {
      this._headers = null;
    }
  }
}
