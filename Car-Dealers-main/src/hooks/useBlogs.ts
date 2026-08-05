'use client';

import { useState, useEffect } from 'react';
import { blogData as staticBlogData, blogStandardListData as staticStandardData } from '@/all-content/blog/blogData';
import { BlogItem, BlogStandardItem } from '@/all-content/blog/blogType';
import { getUserBlogs } from '@/lib/blog-store';

// ✅ FIXED: Client-side HTML strip using DOM
function stripHtml(html: string): string {
  if (!html) return '';
  if (typeof window === 'undefined') return html.replace(/<<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  let text = tmp.textContent || tmp.innerText || '';
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

function getShortDesc(htmlContent: string): string {
  const text = stripHtml(htmlContent);
  return text.length > 140 ? text.substring(0, 140) + '...' : text;
}

export function useBlogs() {
  const [data, setData] = useState({
    blogs: staticBlogData,
    standardBlogs: staticStandardData,
  });

  useEffect(() => {
    try {
      const userBlogs = getUserBlogs();
      
      const formatted: BlogItem[] = userBlogs.map((b) => ({
        id: b.id,
        image: b.image,
        tag: b.tag,
        day: b.day,
        month: b.month,
        author: b.author,
        commentsText: b.commentsText,
        title: b.title,
        description: getShortDesc(b.content),
        link: `/inner/blog-details/${b.slug}`,
      }));
      
      const formattedStandard: BlogStandardItem[] = userBlogs.map((b) => ({
        id: b.id,
        image: b.image,
        date: { day: b.day, month: b.month },
        author: b.author,
        comments: 0,
        readTime: '4 Min Read',
        title: b.title,
        description: getShortDesc(b.content),
        link: `/inner/blog-details/${b.slug}`,
      }));

      setData({
        blogs: [...formatted, ...staticBlogData],
        standardBlogs: [...formattedStandard, ...staticStandardData],
      });
    } catch (e) {
      console.error('Error loading blogs:', e);
    }
  }, []);

  return data;
}