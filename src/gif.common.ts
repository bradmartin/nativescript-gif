import { View, Property } from 'tns-core-modules/ui/core/view';

export class GifCommon extends View {
  public src: string;

  constructor() {
    super();
  }
}

export const srcProperty = new Property<GifCommon, string>({
  name: 'src',
  defaultValue: ''
});
srcProperty.register(GifCommon);

export const headersProperty = new Property<GifCommon, any>({
  name: 'headers'
});
headersProperty.register(GifCommon);

export const isLoadingProperty = new Property<GifCommon, boolean>({
  name: 'isLoading',
  defaultValue: false
});
isLoadingProperty.register(GifCommon);
