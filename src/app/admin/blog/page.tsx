'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBlogsClient, deleteBlog, type DBBlog } from '@/lib/supabase/blogs.client';
import AdminGuard from '@/components/admin/AdminGuard';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function getShortDesc(htmlContent: string): string {
  const text = stripHtml(htmlContent);
  return text.length > 140 ? text.substring(0, 140) + '...' : text;
}

function AdminBlogContent() {
  const [blogs, setBlogs] = useState<DBBlog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await getBlogsClient();
      setBlogs(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load blogs from Supabase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try {
      await deleteBlog(id);
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed.');
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '32px', flexWrap: 'wrap', gap: '16px'
        }}>
          <div>
            <p style={{ color: '#f5a623', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px 0' }}>
              Blog Management
            </p>
            <h1 style={{ fontSize: '32px', fontWeight: 700, margin: 0, color: '#0f172a' }}>
              Manage Your Blogs
            </h1>
            <p style={{ color: '#64748b', marginTop: '6px', fontSize: '14px' }}>
              Full SEO control with rich text editor — powered by Supabase
            </p>
          </div>
          <Link href="/admin/blog/add"
            style={{
              padding: '12px 28px', background: '#f5a623', color: '#fff', border: 'none',
              borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '14px',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 14px rgba(245, 166, 35, 0.3)',
            }}
          >
            <span style={{ fontSize: '18px' }}>+</span> Add New Blog
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '12px',
            border: '1px dashed #cbd5e1', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
            <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '16px' }}>
              No blogs found yet.
            </p>
            <Link href="/admin/blog/add" style={{ color: '#f5a623', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>
              Create your first blog →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {blogs.map((blog) => (
              <div key={blog.id} style={{
                background: '#fff', padding: '24px', borderRadius: '12px',
                border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '160px', height: '100px', flexShrink: 0, borderRadius: '10px',
                    overflow: 'hidden', background: '#f1f5f9', border: '1px solid #e2e8f0',
                  }}>
                    <img
                      src={blog.image} alt={blog.image_alt || ''}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { (e.target as HTMLImageElement).src = '/assets/images/blog/blog-1-1.jpg'; }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
                        {blog.tag}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '13px' }}>
                        {blog.day} {blog.month} • {blog.author}
                      </span>
                      <span style={{ color: '#2563eb', fontSize: '12px', fontWeight: 600, fontFamily: 'monospace' }}>
                        /blog/{blog.slug}
                      </span>
                    </div>

                    <h3 style={{ fontWeight: 700, fontSize: '17px', margin: '0 0 6px 0', color: '#0f172a' }}>
                      {blog.seo_title || 'Untitled Blog'}
                    </h3>

                    <p style={{ fontSize: '13px', color: '#2563eb', margin: '0 0 8px 0', fontWeight: 500 }}>
                      H1: {blog.title || 'No H1 title'}
                    </p>

                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>
                      {getShortDesc(blog.content || '')}
                    </p>

                    <div style={{ marginTop: '12px', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 4px 0' }}>
                        <span style={{ color: '#f5a623', fontWeight: 600 }}>Meta:</span> {blog.meta_description?.substring(0, 80) || 'No meta description'}...
                      </p>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                        <span style={{ color: '#f5a623', fontWeight: 600 }}>Alt:</span> {blog.image_alt}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
                    <Link href={`/admin/blog/edit/${blog.id}`}
                      style={{
                        padding: '10px 20px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe',
                        borderRadius: '8px', fontWeight: 600, fontSize: '13px', textDecoration: 'none',
                        display: 'inline-block', textAlign: 'center',
                      }}
                    >
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(blog.id)}
                      style={{
                        padding: '10px 20px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca',
                        borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminBlogPage() {
  return (
    <AdminGuard>
      <AdminBlogContent />
    </AdminGuard>
  );
}