import platform = require("platform");
import * as types from "utils/types";
import { View, Property } from "ui/core/view";
import {Gif as GifInterface} from "./gif";

export class Gif extends View implements Gif {
    public src: string;

    constructor() {
        super()
    }
}

export const srcProperty = new Property<Gif, string>({
    name: "src", defaultValue: ""
});
srcProperty.register(Gif);

export const isLoadingProperty = new Property<Gif, boolean>({
    name: "isLoading", defaultValue: false
});
isLoadingProperty.register(Gif);