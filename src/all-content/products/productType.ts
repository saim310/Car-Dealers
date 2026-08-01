import { StaticImageData } from "next/image";

export interface ProductItem {
id: number | string;
    title?: string;
    model?: string;
    name?: string;
    price: number | string;
    image?: string;
    img?: string;
    category?: string;
    city?: string;
    [key: string]: any;
}
