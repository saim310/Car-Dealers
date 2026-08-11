import { createClient } from "./server";
import type { DBBlog } from "./blogs.client";

export async function getBlogsServer(): Promise<DBBlog[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getBlogBySlugServer(slug: string): Promise<DBBlog | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}