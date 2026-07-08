"use client";

import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

const tools = [
  {
    id: "article-writer",
    name: "Article Writer",
    description: "Generate comprehensive, SEO-optimized articles",
    icon: "📝",
  },
  {
    id: "seo-writer",
    name: "SEO Writer",
    description: "Create content optimized for search engines",
    icon: "🔍",
  },
  {
    id: "ai-chat",
    name: "AI Chat",
    description: "Have intelligent conversations with AI",
    icon: "💬",
  },
  {
    id: "code-gen",
    name: "Code Generator",
    description: "Generate code snippets and full applications",
    icon: "💻",
  },
  {
    id: "resume-builder",
    name: "Resume Builder",
    description: "Create professional resumes instantly",
    icon: "📄",
  },
  {
    id: "email-writer",
    name: "Email Writer",
    description: "Write professional emails quickly",
    icon: "✉️",
  },
  {
    id: "social-caption",
    name: "Social Caption",
    description: "Generate engaging social media captions",
    icon: "📱",
  },
  {
    id: "grammar-checker",
    name: "Grammar Checker",
    description: "Check and improve your writing",
    icon: "✓",
  },
];

export default function ToolsPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Tools</h1>
          <p className="text-muted-foreground text-lg">
            Powerful tools to generate content, code, and more
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="glass-card rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all flex flex-col"
            >
              <div className="text-4xl mb-3">{tool.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-1">{tool.description}</p>

              {user ? (
                <Link href={`/dashboard/tools/${tool.id}`}>
                  <Button variant="outline" className="w-full gap-2">
                    Use Tool
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button variant="outline" className="w-full gap-2">
                    <Lock className="w-4 h-4" />
                    Sign In to Use
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
