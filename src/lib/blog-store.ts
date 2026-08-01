export interface UserBlog {
  id: number;
  seoTitle: string;
  metaDescription: string;
  slug: string;
  image: string;
  imageAlt: string;
  tag: string;
  day: string;
  month: string;
  author: string;
  commentsText: string;
  title: string;
  content: string;
  createdAt: string;
}

const STORAGE_KEY = 'user_blogs';

export function getUserBlogs(): UserBlog[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addUserBlog(blog: Omit<UserBlog, 'id' | 'createdAt'>): UserBlog {
  const blogs = getUserBlogs();
  const id = Date.now();
  // ✅ FIXED: Clean slug - remove spaces, special chars
  const cleanSlug = blog.slug
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
  
  const newBlog: UserBlog = {
    ...blog,
    id,
    slug: cleanSlug || `blog-${id}`,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newBlog, ...blogs]));
  return newBlog;
}

export function updateUserBlog(id: number, updates: Partial<Omit<UserBlog, 'id' | 'createdAt'>>): UserBlog | null {
  const blogs = getUserBlogs();
  const index = blogs.findIndex(b => b.id === id);
  if (index === -1) return null;
  
  // ✅ FIXED: Clean slug on update too
  const cleanUpdates = { ...updates };
  if (updates.slug) {
    cleanUpdates.slug = updates.slug
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 60);
  }
  
  blogs[index] = { ...blogs[index], ...cleanUpdates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  return blogs[index];
}

export function deleteUserBlog(id: number): boolean {
  const blogs = getUserBlogs();
  const filtered = blogs.filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return blogs.length !== filtered.length;
}

export function getUserBlogById(id: number): UserBlog | null {
  return getUserBlogs().find(b => b.id === id) || null;
}

// ✅ FIXED: Match slug with URL decoding
export function getUserBlogBySlug(slug: string): UserBlog | null {
  const decodedSlug = decodeURIComponent(slug);
  const blogs = getUserBlogs();
  
  // Try exact match first
  let blog = blogs.find(b => b.slug === decodedSlug);
  
  // Try with hyphens instead of spaces
  if (!blog) {
    blog = blogs.find(b => b.slug === decodedSlug.replace(/\s+/g, '-'));
  }
  
  // Try case-insensitive
  if (!blog) {
    blog = blogs.find(b => b.slug.toLowerCase() === decodedSlug.toLowerCase());
  }
  
  return blog || null;
}

export function exportBlogsToJSON() {
  const blogs = getUserBlogs();
  const blob = new Blob([JSON.stringify(blogs, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `blogs-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importBlogsFromJSON(jsonString: string): boolean {
  try {
    const blogs = JSON.parse(jsonString);
    if (Array.isArray(blogs)) {
      // ✅ Clean slugs on import
      const cleanedBlogs = blogs.map(b => ({
        ...b,
        slug: b.slug
          ?.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
          .substring(0, 60) || `blog-${b.id}`
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedBlogs));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}