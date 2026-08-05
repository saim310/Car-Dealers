import { StaticImageData } from "next/image";

export type BlogItem = {
  id: number;
  image: string | StaticImageData;
  tag: string;
  day: string;
  month: string;
  author: string;
  commentsText: string;
  title: string;
  description: string;
  link: string;
};

type BlogDate = {
    day: string;
    month: string;
};

export type BlogStandardItem = {
    id: number;
    image: string | StaticImageData;
    date: BlogDate;
    author: string;
    comments: number;
    readTime: string;
    title: string;
    description: string;
    link: string;
};









