import { createClient } from "./client";
import type { BlogContentBlock } from "@/all-content/blog/blogType";

export interface DBBlog {
  id: number;
  slug: string;
  title: string;
  seo_title: string | null;
  meta_description: string | null;
  image: string;
  image_alt: string | null;
  tag: string;
  category: string;
  day: string;
  month: string;
  author: string;
  comments_count: number;
  read_time: string;
  content: string | null;
  content_blocks: BlogContentBlock[] | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}
export interface UserBlog {
  id: number | string;
  title: string;
  slug: string;
  content?: string;
  image?: string;
  created_at?: string;
  [key: string]: any;
}

function makeSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60);
}

export async function getBlogsClient(): Promise<DBBlog[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}
export async function getUserBlogBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();
  
  if (error) throw error;
  return data;
}
export async function getBlogBySlugClient(slug: string): Promise<DBBlog | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getBlogByIdClient(id: number): Promise<DBBlog | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createBlog(input: Partial<DBBlog>): Promise<DBBlog> {
  const supabase = createClient();
  const slug = makeSlug(input.slug || input.title || "");
  const { data, error } = await supabase
    .from("blogs")
    .insert({ ...input, slug: slug || `blog-${Date.now()}` })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateBlog(id: number, updates: Partial<DBBlog>): Promise<DBBlog> {
  const supabase = createClient();
  const payload = { ...updates };
  if (updates.title && !updates.slug) payload.slug = makeSlug(updates.title);
  if (updates.slug) payload.slug = makeSlug(updates.slug);

  const { data, error } = await supabase
    .from("blogs")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteBlog(id: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("blogs").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadBlogImage(file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("blog-images").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
  return data.publicUrl;
}
