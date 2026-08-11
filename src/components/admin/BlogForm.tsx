'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { createBlog, updateBlog, uploadBlogImage, type DBBlog } from '@/lib/supabase/blogs.client';
import '@/styles/quill-light.css';

import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div style={{ padding: '40px', color: '#64748b', textAlign: 'center', background: '#fff', borderRadius: '10px' }}>Loading editor...</div>
});

interface BlogFormProps {
  initialData?: DBBlog;
  isEdit?: boolean;
}

export default function BlogForm({ initialData, isEdit }: BlogFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    seoTitle: initialData?.seo_title || '',
    metaDescription: initialData?.meta_description || '',
    slug: initialData?.slug || '',
    image: initialData?.image || '',
    imageAlt: initialData?.image_alt || '',
    tag: initialData?.tag || 'Car Showcase',
    category: initialData?.category || '',
    day: initialData?.day || new Date().getDate().toString(),
    month: initialData?.month || new Date().toLocaleString('default', { month: 'short' }),
    author: initialData?.author || 'Admin',
    title: initialData?.title || '',
    content: initialData?.content || '',
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 60);
  };

  const handleSeoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSeoTitle = e.target.value;
    const newSlug = form.slug || generateSlug(newSeoTitle);
    setForm({ ...form, seoTitle: newSeoTitle, slug: newSlug });
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const manualSlug = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    setForm({ ...form, slug: manualSlug });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WEBP, etc.)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const publicUrl = await uploadBlogImage(file);
      setForm(prev => ({ ...prev, image: publicUrl }));
    } catch (err) {
      console.error(err);
      alert('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setForm(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.seoTitle.trim() || !form.title.trim() || !form.content.trim() || !form.image.trim()) {
      alert('Please fill all required fields');
      return;
    }

    const finalSlug = generateSlug(form.slug || form.seoTitle);

    const payload: Partial<DBBlog> = {
      slug: finalSlug,
      title: form.title,
      seo_title: form.seoTitle,
      meta_description: form.metaDescription,
      image: form.image,
      image_alt: form.imageAlt,
      tag: form.tag,
      category: form.category || form.tag,
      day: form.day,
      month: form.month,
      author: form.author,
      content: form.content,
    };

    setSaving(true);
    try {
      if (isEdit && initialData) {
        await updateBlog(initialData.id, payload);
        alert('Blog updated successfully!');
      } else {
        await createBlog(payload);
        alert('Blog published successfully!');
      }
      window.location.href = '/admin/blog';
    } catch (err) {
      console.error(err);
      alert('Save failed. Check console / Supabase logs.');
    } finally {
      setSaving(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['clean']
    ]
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'indent',
    'align', 'link', 'image', 'video', 'blockquote', 'code-block'
  ];

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', background: '#fff',
    border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px',
    color: '#1e293b', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '14px', color: '#475569',
  };
  const sectionTitle: React.CSSProperties = {
    color: '#f5a623', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '1px', margin: '32px 0 20px 0', paddingBottom: '10px', borderBottom: '2px solid #f1f5f9',
  };
  const btnPrimary: React.CSSProperties = {
    padding: '14px 32px', background: '#f5a623', color: '#fff', border: 'none',
    borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '15px',
    transition: 'all 0.3s', boxShadow: '0 4px 14px rgba(245, 166, 35, 0.3)',
    opacity: saving ? 0.7 : 1,
  };
  const btnSecondary: React.CSSProperties = {
    padding: '14px 32px', background: '#fff', color: '#64748b', border: '1px solid #e2e8f0',
    borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '15px', transition: 'all 0.3s',
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: '900px', background: '#fff', padding: '40px', borderRadius: '16px',
      border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
    }}>
      <div style={{ marginBottom: '32px', paddingBottom: '20px', borderBottom: '2px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ width: '40px', height: '40px', background: '#f5a623', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '20px' }}>📝</span>
          </div>
          <div>
            <p style={{ color: '#f5a623', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', margin: 0 }}>
              {isEdit ? 'Edit Blog' : 'New Blog Post'}
            </p>
            <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '4px 0 0 0', color: '#0f172a' }}>
              {isEdit ? 'Edit Your Blog' : 'Create New Blog'}
            </h2>
          </div>
        </div>
      </div>

      <h3 style={sectionTitle}>🔍 SEO Settings</h3>
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>SEO Title *</label>
        <input type="text" value={form.seoTitle} onChange={handleSeoTitleChange} style={inputStyle} required />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Meta Description *</label>
        <textarea value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })}
          style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }} required maxLength={160} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>URL Slug *</label>
        <input type="text" value={form.slug} onChange={handleSlugChange} style={inputStyle} required />
      </div>

      <h3 style={sectionTitle}>🖼️ Featured Image</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <div>
          <label style={labelStyle}>Upload Image * (max 5MB)</label>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload}
            style={{ ...inputStyle, padding: '12px 16px', cursor: 'pointer', opacity: uploading ? 0.6 : 1 }}
            required={!form.image} disabled={uploading} />
          {uploading && <p style={{ fontSize: '12px', color: '#f5a623', marginTop: '6px', fontWeight: 600 }}>Uploading to Supabase...</p>}
        </div>
        <div>
          <label style={labelStyle}>Image Alt Text *</label>
          <input type="text" value={form.imageAlt} onChange={e => setForm({ ...form, imageAlt: e.target.value })} style={inputStyle} required />
        </div>
      </div>

      {form.image && (
        <div style={{ marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ width: '220px', height: '140px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #e2e8f0', position: 'relative' }}>
            <img src={form.image} alt={form.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button type="button" onClick={handleRemoveImage}
              style={{ position: 'absolute', top: '8px', right: '8px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
              ✕ Remove
            </button>
          </div>
        </div>
      )}

      <h3 style={sectionTitle}>📋 Post Info</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <div><label style={labelStyle}>Day</label><input type="text" value={form.day} onChange={e => setForm({ ...form, day: e.target.value })} style={inputStyle} /></div>
        <div><label style={labelStyle}>Month</label><input type="text" value={form.month} onChange={e => setForm({ ...form, month: e.target.value })} style={inputStyle} /></div>
        <div><label style={labelStyle}>Tag</label><input type="text" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} style={inputStyle} /></div>
        <div><label style={labelStyle}>Category</label><input type="text" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inputStyle} placeholder={form.tag} /></div>
        <div><label style={labelStyle}>Author</label><input type="text" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} style={inputStyle} /></div>
      </div>

      <h3 style={sectionTitle}>📝 H1 Title *</h3>
      <div style={{ marginBottom: '24px' }}>
        <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inputStyle} required />
      </div>

      <h3 style={sectionTitle}>✍️ Blog Content *</h3>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ background: '#fff', border: '2px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
          <ReactQuill value={form.content} onChange={val => setForm({ ...form, content: val })}
            modules={quillModules} formats={quillFormats} theme="snow" style={{ height: '450px' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '14px', paddingTop: '16px', borderTop: '2px solid #f1f5f9' }}>
        <button type="submit" disabled={saving || uploading} style={btnPrimary}>
          {saving ? 'Saving...' : isEdit ? '💾 Update Blog' : '🚀 Publish Blog'}
        </button>
        <button type="button" onClick={() => window.location.href = '/admin/blog'} style={btnSecondary}>
          Cancel
        </button>
      </div>
    </form>
  );
}