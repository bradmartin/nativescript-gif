import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';
import { device, isAndroid } from 'tns-core-modules/platform';
import { Color } from 'tns-core-modules/color';
import * as http from 'tns-core-modules/http';
import { Gif } from 'nativescript-gif';

const data = new Observable();

let page;

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args) {
  // Get the event sender
  page = args.object;
  page.bindingContext = data;
  data.set('src', '~/gifs/hammer.gif');

  setTimeout(() => {
    return data.set('src', '~/gifs/darthRide.gif');
  }, 3000);

  if (isAndroid && device.sdkVersion >= '21') {
    const window = app.android.startActivity.getWindow();
    window.setStatusBarColor(new Color('#00695C').android);
  }
}

export function gifLoaded(args) {
  const gif = args.object as Gif;
  data.set('gifSrc', gif.src);
}

export function stopGif(args) {
  const gifView = page.getViewById('myGif') as Gif;
  gifView.stop();
}

export function startGif(args) {
  const gifView = page.getViewById('myGif') as Gif;
  console.log('Gif: ' + gifView + ' gif.src = ' + gifView.src);
  gifView.start();
}

export function getFrames(args) {
  const gif = page.getViewById('myGif') as Gif;
  const frames = gif.getFrameCount();
  data.set('frames', frames);
}

export function getDuration(gifView) {
  const x = gifView.getDuration() as Gif;
  data.set('duration', x);
}
