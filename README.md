# NativeScript-Gif
NativeScript plugin to use .gifs

*Currently Android only, iOS is in the works.*

*Current Limitation - only local .gif files for now.*

Android Library | iOS CocoaPod
--------------- | ------------
[Koral-- / android-gif-drawable](https://github.com/koral--/android-gif-drawable) | [Gifu](https://cocoapods.org/pods/Gifu)

## Installation 
`npm install nativescript-gif`

## Sample Screen

![GifExample](screens/sample.gif)

## Usage

<span style="color:red">IMPORTANT: </span>*Make sure you include
`xmlns:Gif="nativescript-gif"` on the Page element.*

###
```XML
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
      xmlns:Gif="nativescript-gif" loaded="pageLoaded">
  <StackLayout>
    <Gif:Gif src="~/gifs/bill.gif" />
  </StackLayout> 
</Page>  
```

## API

##### start()
- starts playing the .gif

##### stop()
- stops playing the .gif

##### getNumberOfFrames()
- returns the number of frames in the current .gif

##### recycle()
- provided to speed up freeing memory <small>*advanced usage - you shouldn't need this often*</small>

#### Contributors
- [NathanaelA](https://github.com/NathanaelA)