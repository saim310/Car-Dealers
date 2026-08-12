import { getBlogBySlugServer } from "@/lib/supabase/blogs.server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BlogSideBar from "@/sections/blog/BlogSideBar";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlugServer(decodeURIComponent(slug));
  if (!blog) return { title: "Blog Not Found" };
  return {
    title: blog.seo_title || blog.title,
    description: blog.meta_description || "",
    openGraph: {
      title: blog.seo_title || blog.title,
      description: blog.meta_description || "",
      images: [blog.image],
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlugServer(decodeURIComponent(slug));

  if (!blog) return notFound();

  return (
    <section className="blog-details">
      <div className="container">
        <nav aria-label="breadcrumb" style={{ padding: "20px 0" }}>
          <Link href="/">Home</Link> / <Link href="/inner/blog">Blog</Link> / <span>{blog.title}</span>
        </nav>
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="blog-details__left">
              <div className="blog-details__img">
                <Image src={blog.image} width={850} height={509} alt={blog.image_alt || blog.title} priority />
                <div className="blog-details__date"><p>{blog.day}<br />{blog.month}</p></div>
              </div>
              <div className="blog-details__content">
                <p><span className="icon-user"></span>By {blog.author}</p>
                <h1 style={{ fontSize: "32px", fontWeight: 700, margin: "20px 0" }}>{blog.title}</h1>
                <div
                  style={{
                    lineHeight: 1.8,
                    color: "#475569",
                    fontSize: "16px",
                    maxWidth: "100%",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    overflow: "hidden",
                  }}
                >
                  {blog.content ? (
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                  ) : blog.content_blocks ? (
                    blog.content_blocks.map((block, idx) => {
                      if (block.type === "paragraph") return <p key={idx}>{block.text}</p>;
                      if (block.type === "heading") return <h3 key={idx}>{block.text}</h3>;
                      if (block.type === "quote") return <blockquote key={idx}>&ldquo;{block.text}&rdquo; — {block.author}</blockquote>;
                      return null;
                    })
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <BlogSideBar mainWrapper="col-xl-4 col-lg-5" wrapper="sidebar" />
        </div>
      </div>
    </section>
  );
}