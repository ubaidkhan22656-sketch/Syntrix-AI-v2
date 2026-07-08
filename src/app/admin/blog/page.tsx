"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

export default function BlogCMSPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;

      try {
        const { data } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("author_id", user.id)
          .order("created_at", { ascending: false });

        if (data) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await supabase.from("blog_posts").delete().eq("id", id);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handlePublish = async (id: string, isPublished: boolean) => {
    try {
      await supabase
        .from("blog_posts")
        .update({ is_published: !isPublished })
        .eq("id", id);

      setPosts(
        posts.map((p) =>
          p.id === id ? { ...p, is_published: !isPublished } : p
        )
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog CMS</h1>
          <p className="text-muted-foreground">Create and manage your blog posts</p>
        </div>
        <Link href="/admin/blog/new">
          <Button variant="premium" className="rounded-xl gap-2">
            <Plus className="w-4 h-4" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No blog posts yet. Create your first post to get started!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/10 bg-white/5">
                <tr>
                  <th className="text-left py-4 px-6 font-bold uppercase tracking-wider text-xs">Title</th>
                  <th className="text-left py-4 px-6 font-bold uppercase tracking-wider text-xs">Slug</th>
                  <th className="text-left py-4 px-6 font-bold uppercase tracking-wider text-xs">Status</th>
                  <th className="text-left py-4 px-6 font-bold uppercase tracking-wider text-xs">Created</th>
                  <th className="text-right py-4 px-6 font-bold uppercase tracking-wider text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-4 px-6 font-bold">{post.title}</td>
                    <td className="py-4 px-6 text-muted-foreground">{post.slug}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          post.is_published
                            ? "bg-green-500/10 text-green-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {post.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePublish(post.id, post.is_published)}
                        >
                          {post.is_published ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </Button>
                        <Link href={`/admin/blog/${post.id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
