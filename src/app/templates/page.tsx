"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const templates = [
  {
    id: 1,
    name: "Blog Post Template",
    description: "Perfect structure for engaging blog posts",
    category: "Writing",
  },
  {
    id: 2,
    name: "Product Description",
    description: "Convert features into compelling product descriptions",
    category: "E-commerce",
  },
  {
    id: 3,
    name: "Social Media Campaign",
    description: "Complete social media content strategy",
    category: "Marketing",
  },
  {
    id: 4,
    name: "Email Newsletter",
    description: "Engaging newsletter templates",
    category: "Email",
  },
  {
    id: 5,
    name: "Landing Page Copy",
    description: "High-converting landing page content",
    category: "Sales",
  },
  {
    id: 6,
    name: "Video Script",
    description: "Professional video scripts and storyboards",
    category: "Video",
  },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Content Templates</h1>
          <p className="text-muted-foreground text-lg">
            Pre-built templates to jumpstart your content creation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="glass-card rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all flex flex-col"
            >
              <span className="text-xs font-semibold text-primary mb-2 uppercase">
                {template.category}
              </span>
              <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-1">
                {template.description}
              </p>

              <Link href="/dashboard/tools/article-writer">
                <Button variant="outline" className="w-full gap-2">
                  Use Template
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
