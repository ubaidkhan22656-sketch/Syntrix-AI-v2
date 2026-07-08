"use client";

import { useParams } from "next/navigation";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Wand2, Type } from "lucide-react";
import { useState } from "react";

export default function GenericToolPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const toolName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setResult(`This is a simulated output for the ${toolName} tool. In a production environment, this would be connected to a specialized AI model to generate high-quality results based on your specific inputs.`);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <ToolLayout
      title={toolName}
      description={`Generate high-quality ${toolName.toLowerCase()} content with our advanced AI model.`}
      icon={Wand2}
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
            Input Details
          </label>
          <textarea
            placeholder={`Enter details for your ${toolName.toLowerCase()}...`}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[150px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Style / Tone</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none">
            <option value="default">Default</option>
            <option value="professional">Professional</option>
            <option value="creative">Creative</option>
            <option value="casual">Casual</option>
          </select>
        </div>
      </div>
    </ToolLayout>
  );
}
