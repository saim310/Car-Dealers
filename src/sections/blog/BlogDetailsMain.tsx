"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BlogSideBar from "./BlogSideBar";
import { getUserBlogBySlug, UserBlog } from "@/lib/supabase/blogs.client";

const BlogDetailsMain: React.FC = () => {
  const params = useParams();
  const slug = decodeURIComponent((params?.slug as string) || "");
  const [blog, setBlog] = useState<UserBlog | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (typeof window !== "undefined" && slug) {
    const fetchBlog = async () => {
      const found = await getUserBlogBySlug(slug);
      setBlog(found);
      setLoading(false);
    };
    fetchBlog();
  }
}, [slug]);


  if (loading) {
    return (
      <section className="blog-details">
        <div className="container" style={{ padding: "60px 20px", textAlign: "center" }}>
          <p style={{ color: "#64748b" }}>Loading article...</p>
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="blog-details">
        <div className="container" style={{ padding: "60px 20px", textAlign: "center" }}>
          <h3 style={{ marginBottom: "12px" }}>Blog post not found.</h3>
          <p style={{ color: "#64748b", marginBottom: "24px" }}>
            The article you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/inner/blog"
            className="thm-btn"
            style={{ display: "inline-block" }}
          >
            Return to Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-details">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="blog-details__left">
              <div className="blog-details__img">
                <Image
                  src={blog.image}
                  width={850}
                  height={509}
                  alt={blog.imageAlt || blog.title}
                  priority
                />
                <div className="blog-details__date">
                  <p>
                    {blog.day}
                    <br />
                    {blog.month}
                  </p>
                </div>
              </div>

              <div className="blog-details__content">
                <div className="blog-details__user-and-meta">
                  <div className="blog-details__user">
                    <p>
                      <span className="icon-user"></span>By {blog.author}
                    </p>
                  </div>
                  <ul className="blog-details__meta list-unstyled">
                    <li>
                      <a href="#">
                        <span className="icon-comments"></span>
                        {blog.commentsText}
                      </a>
                    </li>
                  </ul>
                </div>

                <h3 className="blog-details__title">{blog.title}</h3>

                <div
                  className="blog-details__text-1"
                  style={{
                    lineHeight: 1.8,
                    color: "#475569",
                    fontSize: "16px",
                    maxWidth: "100%",
                    overflowWrap: "break-word",
                  }}
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                <div
                  style={{
                    marginTop: "40px",
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      background: "#fef3c7",
                      color: "#92400e",
                      padding: "8px 18px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {blog.tag}
                  </span>
                </div>

                {/* Comment Form Placeholder */}
                <div className="comment-form" style={{ marginTop: "60px" }}>
                  <h3 className="comment-form__title">Leave A Comment</h3>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="comment-one__form contact-form-validated"
                  >
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="comment-form__input-box">
                          <input type="text" placeholder="Your Name" name="name" />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="comment-form__input-box">
                          <input type="email" placeholder="Your Email" name="email" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="comment-form__input-box text-message-box">
                          <textarea name="message" placeholder="Write your message"></textarea>
                        </div>
                        <div className="comment-form__btn-box">
                          <button type="submit" className="thm-btn comment-form__btn">
                            Submit Now <span className="fas fa-arrow-right"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <BlogSideBar mainWrapper="col-xl-4 col-lg-5" wrapper="sidebar" />
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsMain;
