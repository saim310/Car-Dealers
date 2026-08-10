"use client";
import { useMemo, useState, useEffect } from "react";
import { useBlogFilters } from "@/context/BlogFilterContext";
import { getUserBlogs } from "@/lib/blog-store";
import type { UserBlog } from "@/lib/blog-store";

export interface BlogViewModel {
  id: number;
  image: string;
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
  content: string;
  createdAt: string;
}

function estimateReadTime(htmlContent: string): string {
  const text = htmlContent.replace(/<[^>]*>/g, " ").trim();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} Min Read`;
}

function extractCommentsCount(commentsText: string): number {
  const match = commentsText.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function mapUserBlog(blog: UserBlog): BlogViewModel {
  return {
    id: blog.id,
    image: blog.image,
    tag: blog.tag,
    category: blog.tag || "General",
    day: blog.day,
    month: blog.month,
    author: blog.author,
    commentsText: blog.commentsText || "0 Comments",
    comments: extractCommentsCount(blog.commentsText || "0 Comments"),
    readTime: estimateReadTime(blog.content),
    title: blog.title,
    description: blog.metaDescription || blog.title,
    link: `/inner/blog-details/${blog.slug}`,
    tags: [blog.tag].filter(Boolean),
    content: blog.content,
    createdAt: blog.createdAt,
  };
}

export const useBlogs = () => {
  const { searchQuery, activeCategory, activeTag } = useBlogFilters();
  const [rawBlogs, setRawBlogs] = useState<UserBlog[]>([]);

  useEffect(() => {
    setRawBlogs(getUserBlogs());
  }, []);

  const allBlogs = useMemo(() => rawBlogs.map(mapUserBlog), [rawBlogs]);

  const filteredBlogs = useMemo(() => {
    return allBlogs.filter((blog) => {
      const matchesSearch =
        !searchQuery ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !activeCategory || blog.category === activeCategory;
      const matchesTag = !activeTag || blog.tags.includes(activeTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [allBlogs, searchQuery, activeCategory, activeTag]);

  const recentPosts = useMemo(() => {
    return [...allBlogs]
      .sort((a, b) => b.id - a.id)
      .slice(0, 3)
      .map((b) => ({
        id: b.id,
        title: b.title,
        image: b.image,
        link: b.link,
      }));
  }, [allBlogs]);

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    allBlogs.forEach((post) => {
      map.set(post.category, (map.get(post.category) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [allBlogs]);

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    allBlogs.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet);
  }, [allBlogs]);

  return {
    blogs: filteredBlogs,
    standardBlogs: filteredBlogs,
    recentPosts,
    categories,
    tags,
  };
};