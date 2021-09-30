<a align="center" href="https://www.npmjs.com/package/nativescript-gif">
    <h3 align="center">NativeScript-Gif</h3>
</a>
<h4 align="center">NativeScript plugin to use GIFs in your application.</h4>

<p align="center">
 <a href="https://www.npmjs.com/package/nativescript-gif">
        <img src="https://github.com/bradmartin/nativescript-gif/workflows/Build%20CI/badge.svg" alt="Action Build">
    </a>
    <a href="https://www.npmjs.com/package/nativescript-gif">
        <img src="https://img.shields.io/npm/v/nativescript-gif.svg" alt="npm">
    </a>
    <a href="https://www.npmjs.com/package/nativescript-gif">
        <img src="https://img.shields.io/npm/dt/nativescript-gif.svg?label=npm%20downloads" alt="npm">
    </a>
    <br />
</p>

---

## Installation

NativeScript Version 7+:
`tns plugin add nativescript-gif`
NativeScript Version prior to 7:
`tns plugin add nativescript-gif@4.0.6`

The native libraries used to handle rendering GIFs for Android & iOS.

| Android Library                                                                   | iOS CocoaPod                                                                 |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [Koral-- / android-gif-drawable](https://github.com/koral--/android-gif-drawable) | [FLAnimatedImage by Flipboard](https://github.com/Flipboard/FLAnimatedImage) |

| Android Screen                           | iOS Screen                          |
| ---------------------------------------- | ----------------------------------- |
| ![GifExample](images/android_sample.gif) | ![iOSSample](images/ios_sample.gif) |

## Usage

#### Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include
`xmlns:Gif="nativescript-gif"` on the Page element._

```XML
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
      xmlns:Gif="nativescript-gif" loaded="pageLoaded">
  <StackLayout>
    <Gif:Gif headers="{{headersJSON}}" src="~/gifs/bill.gif" height="100" />
    <Gif:Gif src="https://media4.giphy.com/media/3uyIgVxP1qAjS/200.gif" height="200" />
  </StackLayout>
</Page>
```

### NativeScript Angular

```typescript
import { registerElement } from 'nativescript-angular/element-registry';
import { Gif } from 'nativescript-gif';
registerElement('Gif', () => Gif);
```

##### HTML

```HTML
<StackLayout>
    <Gif [headers]="headersJSON" src="~/gifs/bill.gif" height="100" ></Gif>
    <Gif src="https://media4.giphy.com/media/3uyIgVxP1qAjS/200.gif" height="200" ></Gif>
</StackLayout>
```

### Bundling Note:
Be sure that you have your `.gifs` added to the globs of the CopyWebpackPlugin as part of your webpack.config.

#### Prior to Webpack 5
Demo app sample: https://github.com/bradmartin/nativescript-gif/blob/master/demo/webpack.config.js#L282

```javascript
{
  from: {
    glob: '**/*.gif';
  }
}
```

#### Webpack 5+

```javascript
const webpack = require('@nativescript/webpack')

module.exports = env => {
  webpack.init(env)

  webpack.Utils.addCopyRule('**/*.gif')

  return webpack.resolveConfig()
}
```

## Properties

- **src** - _required_
  Set the gif file to play.

- **headers - (JSON Object)** - _optional_
  Set headers to add when loading a gif from URL

## API

##### start()

- starts playing the .gif

##### stop()

- stops playing the .gif

##### getFrameCount()

- returns the number of frames in the current .gif

##### isPlaying()

- returns boolean value indicating if the gif is playing.

---

###### _Android Only_

##### getDuration()

- returns the .gif duration

##### reset()

- resets the .gif to its initial frame

##### setSpeed(speedFactor: _Number_)

- sets the .gif play speed

##### recycle()

- provided to speed up freeing memory <small>_advanced usage - you shouldn't need this often_</small>
