import { Size } from "./Size";
import { Coment } from "./Comment";

export interface Product{
    id: number;
    imageUrl: string;
    name: string;
    count: number;
    size: Size;
    weight: string;
    comments: Array<Coment>;
};