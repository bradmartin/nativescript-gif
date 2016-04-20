# NativeScript-Gif
NativeScript plugin to use .gifs

##### *<span style="color: #ff4081">Current limitation, Android only support local .gifs. The Android library should support remote urls, I will gladly accept any PR to implement this feature.</span>*

Android Library | iOS CocoaPod
--------------- | ------------
[Koral-- / android-gif-drawable](https://github.com/koral--/android-gif-drawable) | [FLAnimatedImage by Flipboard](https://github.com/Flipboard/FLAnimatedImage)

## Installation 
`npm install nativescript-gif`

Android Screen | iOS Screen
-------------- | ----------
![GifExample](screens/android_sample.gif) | ![iOSSample](screens/ios_sample.gif)

## Usage

<span style="color:red">IMPORTANT: </span>*Make sure you include
`xmlns:Gif="nativescript-gif"` on the Page element.*

###
```XML
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
      xmlns:Gif="nativescript-gif" loaded="pageLoaded">
  <StackLayout>
    <Gif:Gif src="~/gifs/bill.gif" height="100" />
    <Gif:Gif src="https://media4.giphy.com/media/3uyIgVxP1qAjS/200.gif" height="200" />
  </StackLayout> 
</Page>  
```

## API

##### start()
- starts playing the .gif

##### stop()
- stops playing the .gif

##### getFrameCount()
- returns the number of frames in the current .gif

##### isPlaying()
- returns boolean value indicating if the gif is playing.

***

###### *Android Only*

##### getDuration()
- returns the .gif duration

##### reset()
- resets the .gif to its initial frame

##### setSpeed(speedFactor: *Number*)
- sets the .gif play speed

##### recycle()
- provided to speed up freeing memory <small>*advanced usage - you shouldn't need this often*</small>

#### Contributors
- [NathanaelA](https://github.com/NathanaelA) - [@CongoCart](https://twitter.com/CongoCart)
- [NathanWalker](https://github.com/NathanWalker) - [@wwwalkerrun](https://twitter.com/wwwalkerrun)