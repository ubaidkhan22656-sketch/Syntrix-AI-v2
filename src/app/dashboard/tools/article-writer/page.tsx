"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { FileText, Type, List, Languages } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import axios from "axios";

export default function ArticleWriterPage() {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    topic: "",
    keyPoints: "",
    language: "en",
    tone: "professional",
  });

  const handleGenerate = async () => {
    if (!user || !formData.topic) return;

    setIsGenerating(true);
    try {
      const response = await axios.post("/api/generate", {
        tool: "article-writer",
        input: formData,
        userId: user.id,
      });
      setResult(response.data.output);
    } catch (error) {
      console.error("Generation error:", error);
      setResult("Failed to generate article. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ToolLayout
      title="Article Writer"
      description="Generate high-quality, SEO-optimized long-form articles in seconds."
      icon={FileText}
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
            <Type className="w-4 h-4 text-primary" />
            Article Topic
          </label>
          <input
            type="text"
            placeholder="e.g., The future of AI in 2026"
            value={formData.topic}
            onChange={(e) =>
              setFormData({ ...formData, topic: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <List className="w-4 h-4 text-primary" />
            Key Points (optional)
          </label>
          <textarea
            placeholder="e.g., Hyper-personalization, autonomous systems, ethical AI"
            value={formData.keyPoints}
            onChange={(e) =>
              setFormData({ ...formData, keyPoints: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Languages className="w-4 h-4 text-primary" />
              Language
            </label>
            <select
              value={formData.language}
              onChange={(e) =>
                setFormData({ ...formData, language: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              Tone
            </label>
            <select
              value={formData.tone}
              onChange={(e) =>
                setFormData({ ...formData, tone: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="creative">Creative</option>
              <option value="academic">Academic</option>
            </select>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
