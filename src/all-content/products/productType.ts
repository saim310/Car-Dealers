import { StaticImageData } from "next/image";

export interface ProductItem {
  id: number | string;
  title?: string;
  model?: string;
  name?: string;
  brand?: string;
  price: number | string;
  previousPrice?: number | string;
  salePrice?: number;
  image?: string | StaticImageData;
  img?: string | StaticImageData;
  images?: string[];
  category?: string;
  city?: string;
  yard?: string;
  bodyStyle?: string;
  year?: string | number;
  mileage?: string | number;
  transmission?: string;
  fuel?: string;
  persons?: string | number;
  stockStatus?: string; // Explicitly added for stock status from CSV
  status?: string;
  rating?: number;
  isNew?: boolean;
  discount?: string;
  [key: string]: any; // Catch-all for any extra dynamic CSV columns
}