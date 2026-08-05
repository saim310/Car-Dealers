import { StaticImageData } from "next/image";
import gallery1 from "../../../public/assets/images/gallery/gallery-1-1.jpg";
import gallery2 from "../../../public/assets/images/gallery/gallery-1-2.jpg";
import gallery3 from "../../../public/assets/images/gallery/gallery-1-3.jpg";
import gallery4 from "../../../public/assets/images/gallery/gallery-1-4.jpg";
import gallery5 from "../../../public/assets/images/gallery/gallery-1-5.jpg";
import gallery6 from "../../../public/assets/images/gallery/gallery-1-6.jpg";


type GalleryItem = {
    id: number;
    image: string | StaticImageData;
    link: string;
};

export const galleryData: GalleryItem[] = [
    {
        id: 1,
        image: gallery1,
        link: "/inner/cart",
    },
    {
        id: 2,
        image: gallery2,
        link: "/inner/cart",
    },
    {
        id: 3,
        image: gallery3,
        link: "/inner/cart",
    },
    {
        id: 4,
        image: gallery4,
        link: "/inner/cart",
    },
    {
        id: 5,
        image: gallery5,
        link: "/inner/cart",
    },
    {
        id: 6,
        image: gallery6,
        link: "/inner/cart",
    },
    {
        id: 7,
        image: gallery3,
        link: "/inner/cart",
    },
    {
        id: 8,
        image: gallery4,
        link: "/inner/cart",
    },
];
