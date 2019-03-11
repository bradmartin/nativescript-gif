
declare class FLAnimatedImage extends NSObject {

	static alloc(): FLAnimatedImage; // inherited from NSObject

	static animatedImageWithGIFData(data: NSData): FLAnimatedImage;

	static logStringFromBlockWithLevel(stringBlock: () => string, level: FLLogLevel): void;

	static new(): FLAnimatedImage; // inherited from NSObject

	static setLogBlockLogLevel(logBlock: (p1: string, p2: FLLogLevel) => void, logLevel: FLLogLevel): void;

	static sizeForImage(image: any): CGSize;

	readonly data: NSData;

	readonly delayTimesForIndexes: NSDictionary<any, any>;

	readonly frameCacheSizeCurrent: number;

	frameCacheSizeMax: number;

	readonly frameCount: number;

	readonly loopCount: number;

	readonly posterImage: UIImage;

	readonly size: CGSize;

	constructor(o: { animatedGIFData: NSData; });

	constructor(o: { animatedGIFData: NSData; optimalFrameCacheSize: number; predrawingEnabled: boolean; });

	imageLazilyCachedAtIndex(index: number): UIImage;

	initWithAnimatedGIFData(data: NSData): this;

	initWithAnimatedGIFDataOptimalFrameCacheSizePredrawingEnabled(data: NSData, optimalFrameCacheSize: number, isPredrawingEnabled: boolean): this;
}

declare var FLAnimatedImageVersionNumber: number;

declare var FLAnimatedImageVersionString: interop.Reference<number>;

declare class FLAnimatedImageView extends UIImageView {

	static alloc(): FLAnimatedImageView; // inherited from NSObject

	static appearance(): FLAnimatedImageView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): FLAnimatedImageView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): FLAnimatedImageView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): FLAnimatedImageView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): FLAnimatedImageView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): FLAnimatedImageView; // inherited from UIAppearance

	static new(): FLAnimatedImageView; // inherited from NSObject

	animatedImage: FLAnimatedImage;

	readonly currentFrame: UIImage;

	readonly currentFrameIndex: number;

	loopCompletionBlock: (p1: number) => void;

	runLoopMode: string;
}

declare const enum FLLogLevel {

	None = 0,

	Error = 1,

	Warn = 2,

	Info = 3,

	Debug = 4,

	Verbose = 5
}

declare class FLWeakProxy extends NSProxy {

	static alloc(): FLWeakProxy; // inherited from NSProxy

	static weakProxyForObject(targetObject: any): FLWeakProxy;
}

declare var kFLAnimatedImageDelayTimeIntervalMinimum: number;
