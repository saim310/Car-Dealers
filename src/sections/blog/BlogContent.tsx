"use client";
import React, { useState } from 'react';
import { motion } from "framer-motion" 
import Image from 'next/image';
import { BlogItem } from '@/all-content/blog/blogType';
import { useBlogs } from '@/hooks/useBlogs';

const BlogContent: React.FC = () => {
    const { blogs } = useBlogs();
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8;
    
    const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentBlog = blogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div className="col-xl-8">
            <div className="row">
                {currentBlog.map((blog: BlogItem) => (
                    <motion.div
                        initial={{ y: blog.id % 2 === 0 ? 20 : -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ amount: 0, once: true }}
                        className="col-xl-6 col-lg-6" key={blog.id}>
                        <div className="blog-one__single">
                            <div className="blog-one__img-box">
                                <div className="blog-one__img">
                                    {blog?.image && (
                                        <Image src={blog.image} width={370} height={250} alt={blog.title} />
                                    )}
                                    <div className="blog-one__tags">
                                        <span>{blog.tag}</span>
                                    </div>
                                </div>
                                <div className="blog-one__date">
                                    <p>{blog.day}</p>
                                    <span>{blog.month}</span>
                                </div>
                            </div>

                            <div className="blog-one__content">
                                <ul className="blog-one__meta list-unstyled">
                                    <li>
                                        <a href={blog.link}>
                                            <span className="fas fa-user"></span>
                                            {blog.author}
                                        </a>
                                    </li>
                                    <li>
                                        <a href={blog.link}>
                                            <span className="fas fa-comments"></span>
                                            {blog.commentsText}
                                        </a>
                                    </li>
                                </ul>

                                <h3 className="blog-one__title">
                                    <a href={blog.link}>{blog.title}</a>
                                </h3>

                                <p className="blog-one__text">{blog.description}</p>

                                <a href={blog.link} className="blog-one__read-more">
                                    Read More <span className="fas fa-arrow-right"></span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}

                <div className="car-listing__pagination">
                    <ul className="pg-pagination list-unstyled">
                        <li className="prev">
                            <button
                                onClick={(e) => { handlePageChange(currentPage - 1); e.preventDefault() }}
                                disabled={currentPage === 1}
                            ><i className="fas fa-angle-left"></i></button>
                        </li>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <li key={index} className={`count ${currentPage === index + 1 ? "active" : ""}`}>
                                <button onClick={() => handlePageChange(index + 1)} className="pg-btn">
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className="next">
                            <button aria-label="Next"
                                onClick={(e) => { handlePageChange(currentPage + 1); e.preventDefault() }}
                                disabled={currentPage === totalPages}
                            ><i className="fas fa-angle-right"></i></button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BlogContent;