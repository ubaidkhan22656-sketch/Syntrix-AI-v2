"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Search, Target, Key, Layout } from "lucide-react";

export default function SEOWriterPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setResult(`
        # Optimized Content for: "Best AI SaaS Tools 2026"

        ## Meta Data
        - **Title:** Top 10 Best AI SaaS Tools for Productivity in 2026
        - **Description:** Discover the most powerful AI SaaS platforms in 2026. Compare features, pricing, and benefits of the leading AI-powered productivity tools.
        - **Keywords:** AI SaaS, productivity tools, artificial intelligence software, 2026 technology trends.

        ## Content Structure
        - H1: The Ultimate Guide to AI SaaS Tools in 2026
        - H2: Why AI SaaS is Essential for Modern Business
        - H2: Top 5 AI Writing Assistants
        - H2: Best AI Image Generation Platforms
        - H2: Future Outlook: What's Next for AI SaaS?

        ## SEO Score: 98/100
        - Keyword density: 1.5% (Optimal)
        - Readability: Easy
        - Semantic keywords included: machine learning, automation, cloud computing.
      `);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <ToolLayout
      title="SEO Writer"
      description="Create content that ranks #1 on Google with our advanced SEO optimization tool."
      icon={Search}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result ? (
        <div className="whitespace-pre-wrap leading-relaxed">
          {result}
        </div>
      ) : null}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Target Keyword
          </label>
          <input
            type="text"
            placeholder="e.g., Best AI SaaS Tools 2026"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Key className="w-4 h-4 text-primary" />
            Secondary Keywords
          </label>
          <textarea
            placeholder="e.g., productivity, automation, machine learning"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Layout className="w-4 h-4 text-primary" />
            Content Type
          </label>
          <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none">
            <option value="blog">Blog Post</option>
            <option value="landing">Landing Page</option>
            <option value="product">Product Description</option>
            <option value="guide">Ultimate Guide</option>
          </select>
        </div>
      </div>
    </ToolLayout>
  );
}
