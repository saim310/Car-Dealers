"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BlogSideBar from "./BlogSideBar";
import { useBlogs } from "@/hooks/useBlogs";
import { useBlogFilters } from "@/context/BlogFilterContext";

const BlogStandardMain: React.FC = () => {
  const { standardBlogs } = useBlogs();
  const { searchQuery, activeCategory, activeTag } = useBlogFilters();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, activeTag]);

  const totalPages = Math.ceil(standardBlogs.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBlog = standardBlogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <section className="blog-list">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="blog-list__left">
              {currentBlog.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                  <h3>No articles found matching your criteria.</h3>
                  <p>Please adjust your search or filters to find what you are looking for.</p>
                </div>
              )}

              {currentBlog.map((blog) => (
                <div className="blog-list__single" key={blog.id}>
                  <div className="blog-list__img">
                    <Image src={blog.image} width={850} height={475} alt={blog.title} />
                    <div className="blog-list__date">
                      <p>{blog.day}<br />{blog.month}</p>
                    </div>
                  </div>
                  <div className="blog-list__content">
                    <div className="blog-list__user-and-meta">
                      <div className="blog-list__user">
                        <p><span className="icon-user"></span>{blog.author}</p>
                      </div>
                      <ul className="blog-list__meta list-unstyled">
                        <li>
                          <Link href={blog.link}>
                            <span className="icon-comments"></span>Comments {`(0${blog.comments})`}
                          </Link>
                        </li>
                        <li>
                          <Link href={blog.link}>
                            <span className="icon-clock"></span>{blog.readTime}
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <h3 className="blog-list__title">
                      <Link href={blog.link}>{blog.title}</Link>
                    </h3>
                    <p className="blog-list__text">{blog.description}</p>
                    <Link href={blog.link} className="blog-list__read-more">
                      Learn More<span className="icon-arrow-right"></span>
                    </Link>
                  </div>
                </div>
              ))}

              {totalPages > 1 && (
                <div className="car-listing__pagination">
                  <ul className="pg-pagination list-unstyled">
                    <li className="prev">
                      <button
                        onClick={(e) => { handlePageChange(currentPage - 1); e.preventDefault(); }}
                        disabled={currentPage === 1}
                      >
                        <i className="fas fa-angle-left"></i>
                      </button>
                    </li>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <li key={index} className={`count ${currentPage === index + 1 ? "active" : ""}`}>
                        <button onClick={() => handlePageChange(index + 1)} className="pg-btn">
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className="next">
                      <button
                        aria-label="Next"
                        onClick={(e) => { handlePageChange(currentPage + 1); e.preventDefault(); }}
                        disabled={currentPage === totalPages}
                      >
                        <i className="fas fa-angle-right"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <BlogSideBar mainWrapper="col-xl-4 col-lg-5" wrapper="sidebar" />
        </div>
      </div>
    </section>
  );
};

export default BlogStandardMain;