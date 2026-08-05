'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBlogBySlug, UserBlog } from '@/lib/blog-store';
import BlogSideBar from '@/sections/blog/BlogSideBar';

export default function BlogDetailPage() {
  const params = useParams();
  // ✅ FIXED: Decode slug from URL
  const slug = decodeURIComponent(params.slug as string);
  const [blog, setBlog] = useState<UserBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && slug) {
      const found = getUserBlogBySlug(slug);
      setBlog(found);
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ color: '#64748b' }}>Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Blog Not Found</h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            Slug: <code style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>{slug}</code>
          </p>
          <Link href="/inner/blog" style={{ 
            color: '#fff', 
            background: '#f5a623', 
            padding: '12px 28px', 
            borderRadius: '10px', 
            textDecoration: 'none',
            fontWeight: 600,
            display: 'inline-block'
          }}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/inner/blog' },
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
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": blog.title,
        "description": blog.metaDescription,
        "image": blog.image,
        "datePublished": blog.createdAt,
        "author": { "@type": "Person", "name": blog.author },
        "publisher": { "@type": "Organization", "name": "UKA Japan" },
      })}} />

      <section className="blog-details">
        <div className="container">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" style={{ padding: '20px 0', marginBottom: '10px' }}>
            <ol style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              fontSize: '14px',
              color: '#64748b'
            }}>
              {breadcrumbs.map((item, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {index > 0 && <span style={{ color: '#cbd5e1' }}>/</span>}
                  {item.href ? (
                    <Link href={item.href} style={{ color: '#f5a623', textDecoration: 'none', fontWeight: 500 }}>
                      {item.label}
                    </Link>
                  ) : (
                    <span style={{ color: '#0f172a', fontWeight: 600 }}>{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="blog-details__left">
                {/* Featured Image */}
                <div className="blog-details__img">
                  <Image src={blog.image} width={850} height={509} alt={blog.imageAlt || blog.title} priority />
                  <div className="blog-details__date">
                    <p>{blog.day}<br />{blog.month}</p>
                  </div>
                </div>

                <div className="blog-details__content">
                  {/* Meta */}
                  <div className="blog-details__user-and-meta">
                    <div className="blog-details__user">
                      <p><span className="icon-user"></span>By {blog.author}</p>
                    </div>
                    <ul className="blog-details__meta list-unstyled">
                      <li>
                        <a href="#"><span className="icon-comments"></span>{blog.commentsText}</a>
                      </li>
                    </ul>
                  </div>

                  {/* H1 Title */}
                  <h1 className="blog-details__title" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px', color: '#0f172a' }}>
                    {blog.title}
                  </h1>

                  {/* Content - Render HTML from Quill */}
           <div 
  className="blog-details__text-1"
  style={{ 
    lineHeight: '1.8', 
    color: '#475569', 
    fontSize: '16px',
    maxWidth: '100%',        // ✅ ADD KARO
    overflowWrap: 'break-word' // ✅ ADD KARO
  }}
  dangerouslySetInnerHTML={{ __html: blog.content }}
/>

                  {/* Tag */}
                  <div style={{ marginTop: '40px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ 
                      background: '#fef3c7', 
                      color: '#92400e', 
                      padding: '8px 18px', 
                      borderRadius: '20px', 
                      fontSize: '13px',
                      fontWeight: 600 
                    }}>
                      {blog.tag}
                    </span>
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