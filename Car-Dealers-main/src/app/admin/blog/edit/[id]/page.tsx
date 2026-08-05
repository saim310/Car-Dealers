'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BlogForm from '@/components/admin/BlogForm';
import AdminGuard from '@/components/admin/AdminGuard';
import { getUserBlogById, UserBlog } from '@/lib/blog-store';

function EditBlogContent() {
  const params = useParams();
  const id = Number(params.id);
  const [blog, setBlog] = useState<UserBlog | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBlog(getUserBlogById(id));
    }
  }, [id]);

  if (!blog) {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 0' }}>
        <div className="container">
          <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', textAlign: 'center' }}>
            <p style={{ color: '#dc2626', fontSize: '18px', fontWeight: 600 }}>Blog not found.</p>
            <a href="/admin/blog" style={{ color: '#f5a623', textDecoration: 'none', fontWeight: 600 }}>← Go back</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 0 60px 0' }}>
      <div className="container">
        <BlogForm initialData={blog} isEdit />
      </div>
    </div>
  );
}

export default function EditBlogPage() {
  return (
    <AdminGuard>
      <EditBlogContent />
    </AdminGuard>
  );
}