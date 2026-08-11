"use client";
import { useMemo, useState, useEffect, useCallback } from "react";
import { useBlogFilters } from "@/context/BlogFilterContext";
import { getBlogsClient, type DBBlog } from "@/lib/supabase/blogs.client";

function toBlogItem(b: DBBlog) {
  return {
    id: b.id,
    image: b.image,
    tag: b.tag,
    category: b.category,
    day: b.day,
    month: b.month,
    author: b.author,
    commentsText: `Comments (${String(b.comments_count).padStart(2, "0")})`,
    title: b.title,
    description: b.meta_description || "",
    link: `/inner/blog-details/${b.slug}`,
    tags: b.tags || [],
  };
}

export const useBlogs = () => {
  const { searchQuery, activeCategory, activeTag } = useBlogFilters();
  const [allBlogs, setAllBlogs] = useState<ReturnType<typeof toBlogItem>[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBlogsClient();
      setAllBlogs(data.map(toBlogItem));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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

  const recentPosts = useMemo(() => allBlogs.slice(0, 3), [allBlogs]);

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    allBlogs.forEach((b) => map.set(b.category, (map.get(b.category) || 0) + 1));
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [allBlogs]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    allBlogs.forEach((b) => b.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [allBlogs]);

  return { blogs: filteredBlogs, standardBlogs: filteredBlogs, recentPosts, categories, tags, loading, refresh: load };
};