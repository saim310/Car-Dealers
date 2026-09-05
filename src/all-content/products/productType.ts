import { StaticImageData } from "next/image";

export interface BadgeConfig {
  label: string;
  bg: string;
  color: string;
  icon: string;
}

export interface ProductItem {
  id: number | string;
  stockNumber?: string;
  vin?: string;
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
  City?: string;
  yard?: string;
  Yard?: string;
  bodyStyle?: string;
  bodyType?: string;
  Body?: string;
  year?: string | number;
  mileage?: string | number;
  transmission?: string;
  fuel?: string;
  persons?: string | number;
  stockStatus?: string;
  status?: string;
  rating?: number;
  isNew?: boolean;
  discount?: string;
  [key: string]: any; // Fallback for raw CSV data fields
}