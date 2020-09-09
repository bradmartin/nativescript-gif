import { Http, knownFolders } from '@nativescript/core';
import { GifCommon, headersProperty, srcProperty } from './gif.common';

declare var pl;

export class Gif extends GifCommon {
  private _drawable: any;
  private _headers: any;
  private _src: string;

  constructor() {
    super();
    this._headers = null;
    this._src = null;
  }

  public createNativeView() {
    this.nativeView = new pl.droidsonroids.gif.GifImageView(this._context);
    return this.nativeView;
  }

  /**
   * Stop playing the .gif
   */
  public stop(): void {
    if (this._drawable) {
      this._drawable.stop();
    }
  }

  /**
   * Start playing the .gif
   */
  public start(): void {
    if (this._drawable) {
      this._drawable.start();
    }
  }

  /**
   * Check if the .gif is playing.
   * @returns  Boolean
   */
  public isPlaying(): boolean {
    if (this._drawable) {
      const isPlaying = this._drawable.isRunning();
      return isPlaying;
    } else {
      return false;
    }
  }

  /**
   * Get the frame count for a .gif.
   * @returns  Number of frames.
   */
  public getFrameCount(): number {
    let frames;
    if (this._drawable) {
      frames = this._drawable.getNumberOfFrames();
    }
    return frames;
  }

  public reset(): void {
    this._drawable.reset();
  }

  public getDuration(): number {
    if (this._drawable) {
      const duration = this._drawable.getDuration();
      return duration;
    } else {
      return 0;
    }
  }

  public setSpeed(factor: number): void {
    if (this._drawable) {
      this._drawable.setSpeed(factor);
    }
  }

  public recycle(): void {
    if (this._drawable) {
      this._drawable.recycle();
    }
  }

  [headersProperty.setNative](value) {
    this._setHeader(value ? value : null);
  }

  [srcProperty.setNative](value: string) {
    this._setSrcProperty(value);
  }

  private _setSrcProperty(value: string) {
    if (value) {
      value = value.trim();
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

        this._drawable = new pl.droidsonroids.gif.GifDrawable(value);
        this.nativeView.setImageDrawable(this._drawable);
      } else {
        const requestOptions: any = { url: value, method: 'GET' };
        if (this._headers !== null) {
          requestOptions.headers = this._headers;
        }
        Http.request(requestOptions).then(
          (r) => {
            if (r.statusCode === 200) {
              this._drawable = new pl.droidsonroids.gif.GifDrawable(
                r.content.raw.toByteArray()
              );
              this.nativeView.setImageDrawable(this._drawable);
            } else {
              console.log('error getting image: ' + r.statusCode);
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    } else {
      console.log('No src property set for the Gif.');
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
