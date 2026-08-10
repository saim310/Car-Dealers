"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUserBlogBySlug, UserBlog } from "@/lib/blog-store";
import { getBlogById } from "@/all-content/blog/blogData";
import type { BlogPost, BlogContentBlock } from "@/all-content/blog/blogType";
import BlogSideBar from "@/sections/blog/BlogSideBar";

/* ------------------------------------------------------------------ */
/*  Unified view model so we can render both sources with one JSX tree  */
/* ------------------------------------------------------------------ */
type UnifiedBlog = {
  source: "admin" | "static";
  title: string;
  seoTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  day: string;
  month: string;
  author: string;
  commentsText: string;
  tag: string;
  createdAt?: string;
  tags?: string[];
  // Admin: raw HTML string
  htmlContent?: string;
  // Static: structured blocks
  contentBlocks?: BlogContentBlock[];
};

function normalizeAdmin(b: UserBlog): UnifiedBlog {
  return {
    source: "admin",
    title: b.title,
    seoTitle: b.seoTitle || b.title,
    metaDescription: b.metaDescription || "",
    image: b.image,
    imageAlt: b.imageAlt || b.title,
    day: b.day,
    month: b.month,
    author: b.author,
    commentsText: b.commentsText,
    tag: b.tag,
    createdAt: b.createdAt,
    htmlContent: b.content,
  };
}

function normalizeStatic(b: BlogPost): UnifiedBlog {
  return {
    source: "static",
    title: b.title,
    seoTitle: b.title,
    metaDescription: b.description,
    image: typeof b.image === "string" ? b.image : b.image.src,
    imageAlt: b.title,
    day: b.day,
    month: b.month,
    author: b.author,
    commentsText: b.commentsText,
    tag: b.tag,
    tags: b.tags,
    contentBlocks: b.contentBlocks,
  };
}

/* ------------------------------------------------------------------ */
/*  Renderer for static content blocks                                 */
/* ------------------------------------------------------------------ */
const RenderBlocks: React.FC<{ blocks: BlogContentBlock[] }> = ({ blocks }) => {
  return (
    <>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={idx}
                style={{ lineHeight: 1.8, color: "#475569", marginBottom: "16px", fontSize: "16px" }}
              >
                {block.text}
              </p>
            );
          case "heading":
            return (
              <h3
                key={idx}
                className="blog-details__title-2"
                style={{ marginTop: "24px", marginBottom: "12px" }}
              >
                {block.text}
              </h3>
            );
          case "quote":
            return (
              <div key={idx} className="blog-details__author-box" style={{ margin: "24px 0" }}>
                <h4 className="blog-details__author-text">&ldquo;{block.text}&rdquo;</h4>
                <p className="blog-details__author-name">
                  {block.author}
                  <span> / {block.role}</span>
                </p>
              </div>
            );
          case "imageBox":
            return (
              <div key={idx} className="blog-details__img-box" style={{ margin: "24px 0" }}>
                <div className="row">
                  {block.images.map((img, i) => (
                    <div className="col-xl-6" key={i}>
                      <div className="blog-details__img-box-img">
                        <Image
                          src={img}
                          width={410}
                          height={245}
                          alt="Detail"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */
export default function BlogDetailPage() {
  const params = useParams();
  const slug = decodeURIComponent((params?.slug as string) || "");
  const [blog, setBlog] = useState<UnifiedBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !slug) return;

    // 1. Admin store (priority)
    const adminBlog = getUserBlogBySlug(slug);
    if (adminBlog) {
      setBlog(normalizeAdmin(adminBlog));
      setLoading(false);
      return;
    }

    // 2. Static fallback (slug is numeric ID like "1", "2", etc.)
    const numericId = parseInt(slug, 10);
    if (!isNaN(numericId)) {
      const staticBlog = getBlogById(numericId);
      if (staticBlog) {
        setBlog(normalizeStatic(staticBlog));
        setLoading(false);
        return;
      }
    }

    setBlog(null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "60px 20px", textAlign: "center" }}>
        <p style={{ color: "#64748b" }}>Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container" style={{ padding: "60px 20px", textAlign: "center" }}>
        <div
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            background: "#fff",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔍</div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
            Blog Not Found
          </h2>
          <p style={{ color: "#64748b", marginBottom: "24px" }}>
            Slug:{" "}
            <code style={{ background: "#f1f5f9", padding: "4px 8px", borderRadius: "4px" }}>
              {slug}
            </code>
          </p>
          <Link
            href="/inner/blog"
            style={{
              color: "#fff",
              background: "#f5a623",
              padding: "12px 28px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 600,
              display: "inline-block",
            }}
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/inner/blog" },
    { label: blog.title },
  ];

  return (
    <>
      <title>{blog.seoTitle}</title>
      <meta name="description" content={blog.metaDescription} />
      <meta property="og:title" content={blog.seoTitle} />
      <meta property="og:description" content={blog.metaDescription} />
      <meta property="og:image" content={blog.image} />
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary_large_image" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: blog.title,
            description: blog.metaDescription,
            image: blog.image,
            datePublished: blog.createdAt || new Date().toISOString(),
            author: { "@type": "Person", name: blog.author },
            publisher: { "@type": "Organization", name: "UKA Japan" },
          }),
        }}
      />

      <section className="blog-details">
        <div className="container">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" style={{ padding: "20px 0", marginBottom: "10px" }}>
            <ol
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "14px",
                color: "#64748b",
              }}
            >
              {breadcrumbs.map((item, index) => (
                <li key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {index > 0 && <span style={{ color: "#cbd5e1" }}>/</span>}
                  {item.href ? (
                    <Link
                      href={item.href}
                      style={{ color: "#f5a623", textDecoration: "none", fontWeight: 500 }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span style={{ color: "#0f172a", fontWeight: 600 }}>{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="blog-details__left">
                <div className="blog-details__img">
                  <Image
                    src={blog.image}
                    width={850}
                    height={509}
                    alt={blog.imageAlt}
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

                  <h1
                    className="blog-details__title"
                    style={{ fontSize: "32px", fontWeight: 700, marginBottom: "24px", color: "#0f172a" }}
                  >
                    {blog.title}
                  </h1>

                  {/* Content: Admin = raw HTML; Static = structured blocks */}
                  <div
                    style={{
                      lineHeight: 1.8,
                      color: "#475569",
                      fontSize: "16px",
                      maxWidth: "100%",
                      overflowWrap: "break-word",
                    }}
                  >
                    {blog.source === "admin" && blog.htmlContent ? (
                      <div dangerouslySetInnerHTML={{ __html: blog.htmlContent }} />
                    ) : blog.source === "static" && blog.contentBlocks ? (
                      <RenderBlocks blocks={blog.contentBlocks} />
                    ) : null}
                  </div>

                  {/* Tags */}
                  <div style={{ marginTop: "40px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
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
                    {blog.tags?.map((t, i) => (
                      <span
                        key={i}
                        style={{
                          background: "#e0f2fe",
                          color: "#075985",
                          padding: "8px 18px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <BlogSideBar mainWrapper="col-xl-4 col-lg-5" wrapper="sidebar" />
          </div>
        </div>
      </section>
    </>
  );
}