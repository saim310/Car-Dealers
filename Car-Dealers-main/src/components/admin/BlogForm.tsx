'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { addUserBlog, updateUserBlog, UserBlog } from '@/lib/blog-store';
import '@/styles/quill-light.css';

import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div style={{ padding: '40px', color: '#64748b', textAlign: 'center', background: '#fff', borderRadius: '10px' }}>Loading editor...</div>
});

interface BlogFormProps {
  initialData?: UserBlog;
  isEdit?: boolean;
}

export default function BlogForm({ initialData, isEdit }: BlogFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    seoTitle: initialData?.seoTitle || '',
    metaDescription: initialData?.metaDescription || '',
    slug: initialData?.slug || '',
    image: initialData?.image || '',
    imageAlt: initialData?.imageAlt || '',
    tag: initialData?.tag || 'Car Showcase',
    day: initialData?.day || new Date().getDate().toString(),
    month: initialData?.month || new Date().toLocaleString('default', { month: 'short' }),
    author: initialData?.author || 'Admin',
    commentsText: initialData?.commentsText || 'Comment',
    title: initialData?.title || '',
    content: initialData?.content || '',
  });

  const [uploading, setUploading] = useState(false);

  // ✅ AUTO-GENERATE SLUG FROM SEO TITLE
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

  // ✅ DIRECT FILE UPLOAD HANDLER
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WEBP, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploading(true);
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;
      setForm(prev => ({ ...prev, image: base64 }));
      setUploading(false);
    };

    reader.onerror = () => {
      alert('Failed to read image. Please try again.');
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  // ✅ REMOVE IMAGE
  const handleRemoveImage = () => {
    setForm(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.seoTitle.trim() || !form.title.trim() || !form.content.trim() || !form.image.trim()) {
      alert('Please fill all required fields');
      return;
    }

    const finalSlug = generateSlug(form.slug || form.seoTitle);
    const data = { ...form, slug: finalSlug };

    if (isEdit && initialData) {
      updateUserBlog(initialData.id, data);
      alert('Blog updated successfully!');
    } else {
      addUserBlog(data as any);
      alert('Blog published successfully!');
    }
    window.location.href = '/admin/blog';
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
    'color', 'background',
    'list', 'bullet', 'indent',
    'align',
    'link', 'image', 'video',
    'blockquote', 'code-block'
  ];

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#1e293b',
    outline: 'none',
    transition: 'all 0.3s',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontWeight: 600,
    marginBottom: '8px',
    fontSize: '14px',
    color: '#475569',
  };

  const sectionTitle: React.CSSProperties = {
    color: '#f5a623',
    fontSize: '13px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    margin: '32px 0 20px 0',
    paddingBottom: '10px',
    borderBottom: '2px solid #f1f5f9',
  };

  const btnPrimary: React.CSSProperties = {
    padding: '14px 32px',
    background: '#f5a623',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '15px',
    transition: 'all 0.3s',
    boxShadow: '0 4px 14px rgba(245, 166, 35, 0.3)',
  };

  const btnSecondary: React.CSSProperties = {
    padding: '14px 32px',
    background: '#fff',
    color: '#64748b',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '15px',
    transition: 'all 0.3s',
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      maxWidth: '900px', 
      background: '#fff', 
      padding: '40px', 
      borderRadius: '16px', 
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
    }}>
      {/* Header */}
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

      {/* ===== SEO SECTION ===== */}
      <h3 style={sectionTitle}>🔍 SEO Settings</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>SEO Title * <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Google search result title)</span></label>
        <input 
          type="text" 
          value={form.seoTitle} 
          onChange={handleSeoTitleChange}
          style={inputStyle}
          placeholder="Top 10 Luxury Cars 2026 | Best Premium Vehicles"
          required
          onFocus={e => { e.currentTarget.style.borderColor = '#f5a623'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 166, 35, 0.1)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Recommended: 50-60 characters</p>
          <p style={{ fontSize: '12px', color: form.seoTitle.length > 60 ? '#dc2626' : '#94a3b8', margin: 0, fontWeight: 600 }}>
            {form.seoTitle.length}/60
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Meta Description * <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Google search snippet)</span></label>
        <textarea 
          value={form.metaDescription} 
          onChange={e => setForm({...form, metaDescription: e.target.value})}
          style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }}
          placeholder="Brief summary that appears in Google search results..."
          required
          maxLength={160}
          onFocus={e => { e.currentTarget.style.borderColor = '#f5a623'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 166, 35, 0.1)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Recommended: 150-160 characters</p>
          <p style={{ fontSize: '12px', color: form.metaDescription.length > 160 ? '#dc2626' : '#94a3b8', margin: 0, fontWeight: 600 }}>
            {form.metaDescription.length}/160
          </p>
        </div>
      </div>

      {/* SLUG FIELD */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>
          URL Slug * 
          <span style={{ color: '#94a3b8', fontWeight: 400 }}> (auto-generated from SEO title)</span>
        </label>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          background: '#f8f9fa', 
          padding: '4px 4px 4px 16px', 
          borderRadius: '10px', 
          border: '1px solid #e2e8f0' 
        }}>
          <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}>
            yoursite.com/blog/
          </span>
          <input 
            type="text" 
            value={form.slug} 
            onChange={handleSlugChange}
            style={{ 
              ...inputStyle, 
              border: 'none', 
              background: 'transparent', 
              padding: '10px 12px',
              fontFamily: 'monospace',
              color: '#2563eb'
            }}
            placeholder="top-10-luxury-cars-2026"
            required
          />
        </div>
        <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px', fontFamily: 'monospace' }}>
          <span style={{ color: '#f5a623' }}>Final URL:</span> 
          {' '}https://yoursite.com/blog/{form.slug || generateSlug(form.seoTitle)}
        </p>
        {form.slug.includes(' ') && (
          <p style={{ fontSize: '12px', color: '#dc2626', marginTop: '6px', fontWeight: 600 }}>
            ⚠️ Spaces will be auto-converted to hyphens on save
          </p>
        )}
      </div>

      {/* ===== IMAGE SECTION — DIRECT UPLOAD ===== */}
      <h3 style={sectionTitle}>🖼️ Featured Image</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        {/* ✅ FILE UPLOAD INPUT */}
        <div>
          <label style={labelStyle}>Upload Image * <span style={{ color: '#94a3b8', fontWeight: 400 }}>(JPG, PNG, WEBP — max 5MB)</span></label>
          <div style={{ position: 'relative' }}>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              style={{ 
                ...inputStyle, 
                padding: '12px 16px',
                cursor: 'pointer',
                opacity: uploading ? 0.6 : 1
              }}
              required={!form.image}
            />
            {uploading && (
              <div style={{ 
                position: 'absolute', 
                right: '16px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: '#f5a623',
                fontWeight: 600
              }}>
                <span style={{ 
                  width: '14px', 
                  height: '14px', 
                  border: '2px solid #f5a623', 
                  borderTopColor: 'transparent', 
                  borderRadius: '50%', 
                  animation: 'spin 1s linear infinite' 
                }} />
                Uploading...
              </div>
            )}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Image Alt Text * <span style={{ color: '#94a3b8', fontWeight: 400 }}>(SEO + accessibility)</span></label>
          <input 
            type="text" 
            value={form.imageAlt} 
            onChange={e => setForm({...form, imageAlt: e.target.value})}
            style={inputStyle}
            placeholder="Red Ferrari sports car on highway"
            required
            onFocus={e => { e.currentTarget.style.borderColor = '#f5a623'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 166, 35, 0.1)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
          />
        </div>
      </div>

      {/* ✅ IMAGE PREVIEW + REMOVE */}
      {form.image && (
        <div style={{ marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ 
            width: '220px', 
            height: '140px', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            border: '2px solid #e2e8f0', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            position: 'relative'
          }}>
            <img src={form.image} alt={form.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {/* Remove button overlay */}
            <button
              type="button"
              onClick={handleRemoveImage}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#b91c1c'}
              onMouseLeave={e => e.currentTarget.style.background = '#dc2626'}
            >
              ✕ Remove
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 4px 0' }}>
              <strong style={{ color: '#475569' }}>Preview:</strong> This is how your image will appear
            </p>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Alt: {form.imageAlt}</p>
            <p style={{ fontSize: '12px', color: '#22c55e', margin: '8px 0 0 0', fontWeight: 600 }}>
              ✓ Image uploaded successfully
            </p>
          </div>
        </div>
      )}

      {/* ===== META INFO ===== */}
      <h3 style={sectionTitle}>📋 Post Info</h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
        gap: '16px', 
        marginBottom: '20px' 
      }}>
        <div>
          <label style={labelStyle}>Day</label>
          <input type="text" value={form.day} onChange={e => setForm({...form, day: e.target.value})} 
            style={inputStyle} onFocus={e => { e.currentTarget.style.borderColor = '#f5a623'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 166, 35, 0.1)'; }} onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }} />
        </div>
        <div>
          <label style={labelStyle}>Month</label>
          <input type="text" value={form.month} onChange={e => setForm({...form, month: e.target.value})} 
            style={inputStyle} onFocus={e => { e.currentTarget.style.borderColor = '#f5a623'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 166, 35, 0.1)'; }} onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }} />
        </div>
        <div>
          <label style={labelStyle}>Tag</label>
          <input type="text" value={form.tag} onChange={e => setForm({...form, tag: e.target.value})} 
            style={inputStyle} onFocus={e => { e.currentTarget.style.borderColor = '#f5a623'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 166, 35, 0.1)'; }} onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }} />
        </div>
        <div>
          <label style={labelStyle}>Author</label>
          <input type="text" value={form.author} onChange={e => setForm({...form, author: e.target.value})} 
            style={inputStyle} onFocus={e => { e.currentTarget.style.borderColor = '#f5a623'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 166, 35, 0.1)'; }} onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }} />
        </div>
      </div>

      {/* ===== H1 TITLE ===== */}
      <h3 style={sectionTitle}>📝 H1 Title *</h3>
      
      <div style={{ marginBottom: '24px' }}>
        <input 
          type="text" 
          value={form.title} 
          onChange={e => setForm({...form, title: e.target.value})}
          style={inputStyle}
          placeholder="Top 10 Luxury Cars You Must Drive in 2026"
          required
          onFocus={e => { e.currentTarget.style.borderColor = '#f5a623'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 166, 35, 0.1)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
        />
        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>This is the main heading that appears on the blog detail page</p>
      </div>

      {/* ===== QUILL EDITOR ===== */}
      <h3 style={sectionTitle}>✍️ Blog Content *</h3>
      
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          background: '#fff', 
          border: '2px solid #e2e8f0', 
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <ReactQuill 
            value={form.content} 
            onChange={val => setForm({...form, content: val})}
            modules={quillModules}
            formats={quillFormats}
            theme="snow"
            style={{ height: '450px' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
            💡 Use toolbar for headings, bold, links, images, lists
          </p>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
            First 2 paragraphs auto-show as short description
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '14px', paddingTop: '16px', borderTop: '2px solid #f1f5f9' }}>
        <button type="submit" style={btnPrimary}
          onMouseEnter={e => { e.currentTarget.style.background = '#e6951a'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#f5a623'; e.currentTarget.style.transform = 'translateY(0)'; }}>
          {isEdit ? '💾 Update Blog' : '🚀 Publish Blog'}
        </button>
        <button type="button" onClick={() => window.location.href = '/admin/blog'} style={btnSecondary}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#f5a623'; e.currentTarget.style.color = '#f5a623'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; }}>
          Cancel
        </button>
      </div>

      {/* CSS for spinner */}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}