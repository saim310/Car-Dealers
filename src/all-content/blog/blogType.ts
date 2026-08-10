import { StaticImageData } from "next/image";

export type BlogDate = {
  day: string;
  month: string;
};

export type BlogComment = {
  id: number;
  name: string;
  date: string;
  text: string;
  image: string | StaticImageData;
};

export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; author: string; role: string }
  | { type: "imageBox"; images: (string | StaticImageData)[] };

export interface BlogPost {
  id: number;
  image: string | StaticImageData;
  tag: string;
  category: string;
  day: string;
  month: string;
  author: string;
  commentsText: string;
  comments: number;
  readTime: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  contentBlocks: BlogContentBlock[];
  commentsList: BlogComment[];
}

// Derived view types (for backward compatibility)
export type BlogItem = Omit<BlogPost, "comments" | "readTime" | "contentBlocks" | "commentsList" | "tags">;
export type BlogStandardItem = Omit<BlogPost, "tag" | "day" | "month" | "commentsText" | "contentBlocks" | "commentsList" | "tags"> & {
  date: BlogDate;
};