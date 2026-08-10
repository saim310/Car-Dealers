"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useBlogFilters } from "@/context/BlogFilterContext";
import { useBlogs } from "@/hooks/useBlogs";

interface SideBarProps {
  mainWrapper: string;
  wrapper: string;
}

const BlogSideBar: React.FC<SideBarProps> = ({ mainWrapper, wrapper }) => {
  const { searchQuery, activeCategory, activeTag, setSearchQuery, setActiveCategory, setActiveTag, clearFilters } = useBlogFilters();
  const { recentPosts, categories, tags } = useBlogs();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
  };

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(activeCategory === categoryName ? "" : categoryName);
  };

  const handleTagClick = (tagName: string) => {
    setActiveTag(activeTag === tagName ? "" : tagName);
  };

  const hasActiveFilters = searchQuery || activeCategory || activeTag;

  return (
    <div className={mainWrapper}>
      <div className={wrapper}>
        {/* Search */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ amount: 0.05, once: true }}
          className="sidebar__single sidebar__search"
        >
          <form onSubmit={handleSearchSubmit} className="sidebar__search-form">
            <input
              type="search"
              placeholder="Search articles..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            <button type="submit"><i className="fa fa-search"></i></button>
          </form>
          {hasActiveFilters && (
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={clearFilters}
                style={{
                  background: "#ff0000",
                  color: "#fff",
                  border: "none",
                  padding: "6px 14px",
                  fontSize: "12px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.5, once: true }}
          className="sidebar__single sidebar__category"
        >
          <h3 className="sidebar__title">Categories</h3>
          <ul className="sidebar__category-list list-unstyled">
            {categories.map((cat) => (
              <li key={cat.name} className={activeCategory === cat.name ? "active" : ""}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick(cat.name); }}>
                  {cat.name} <span>({cat.count})</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Recent Posts */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.5, once: true }}
          className="sidebar__single sidebar__post"
        >
          <h3 className="sidebar__title">Recent Posts</h3>
          <div className="sidebar__post-box">
            {recentPosts.map((post) => (
              <div className="sidebar__post-single" key={post.id}>
                <div className="sidebar-post__img">
                  <Image src={post.image} width={350} height={140} alt={post.title} />
                </div>
                <div className="sidebar__post-content-box">
                  <h3>
                    <Link href={post.link}>{post.title}</Link>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.5, once: true }}
          className="sidebar__single sidebar__tags"
        >
          <h3 className="sidebar__title">Tags Cloud</h3>
          <ul className="sidebar__tags-list clearfix list-unstyled">
            {tags.map((tag) => (
              <li key={tag}>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleTagClick(tag); }}
                  style={{
                    backgroundColor: activeTag === tag ? "var(--thm-base)" : "",
                    color: activeTag === tag ? "#fff" : "",
                  }}
                >
                  {tag}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogSideBar;