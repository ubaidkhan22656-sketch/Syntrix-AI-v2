"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

export default function NewBlogPostPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    imageUrl: "",
  });

  const handleSave = async () => {
    if (!user || !formData.title || !formData.slug || !formData.content) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("blog_posts").insert({
        author_id: user.id,
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        image_url: formData.imageUrl,
        is_published: false,
      });

      if (error) throw error;

      router.push("/admin/blog");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create New Blog Post</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 rounded-3xl">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter post title"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="e.g., my-awesome-post"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider">Featured Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Write your blog post content here. Supports Markdown."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[400px] font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl">
            <h3 className="font-bold mb-4">Post Settings</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Status
                </div>
                <div className="font-bold">Draft</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Author
                </div>
                <div className="font-bold">{user?.email}</div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl">
            <h3 className="font-bold mb-4">Actions</h3>
            <div className="space-y-3">
              <Button
                variant="premium"
                className="w-full rounded-xl gap-2"
                onClick={handleSave}
                disabled={loading}
              >
                <Save className="w-4 h-4" />
                {loading ? "Saving..." : "Save Post"}
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
