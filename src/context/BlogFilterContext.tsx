"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

interface BlogFilterContextType {
  searchQuery: string;
  activeCategory: string;
  activeTag: string;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  setActiveTag: (tag: string) => void;
  clearFilters: () => void;
}

const BlogFilterContext = createContext<BlogFilterContextType | null>(null);

export const BlogFilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [activeTag, setActiveTag] = useState("");

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setActiveCategory("");
    setActiveTag("");
  }, []);

  return (
    <BlogFilterContext.Provider
      value={{
        searchQuery,
        activeCategory,
        activeTag,
        setSearchQuery,
        setActiveCategory,
        setActiveTag,
        clearFilters,
      }}
    >
      {children}
    </BlogFilterContext.Provider>
  );
};

export const useBlogFilters = (): BlogFilterContextType => {
  const context = useContext(BlogFilterContext);
  if (!context) {
    throw new Error("useBlogFilters must be used within a BlogFilterProvider");
  }
  return context;
};