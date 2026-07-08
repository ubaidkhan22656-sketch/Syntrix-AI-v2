"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Briefcase, User, GraduationCap, Trophy } from "lucide-react";

export default function ResumeBuilderPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setResult(`
        # JOHN DOE
        Full-Stack AI Engineer | San Francisco, CA

        ## PROFESSIONAL SUMMARY
        Innovative Software Engineer with 5+ years of experience in building scalable AI-powered web applications. Expert in React, Next.js, and Python.

        ## WORK EXPERIENCE
        **Senior AI Engineer | TechFlow Solutions**
        *2022 - Present*
        - Led the development of a flagship AI content platform, increasing user engagement by 45%.
        - Implemented RAG systems using Pinecone and OpenAI API.

        **Full-Stack Developer | Innovate Lab**
        *2019 - 2022*
        - Developed 20+ responsive web applications using React and Node.js.
        - Optimized database queries, reducing latency by 30%.

        ## EDUCATION
        **B.S. in Computer Science**
        University of Technology | 2015 - 2019

        ## SKILLS
        - Languages: TypeScript, Python, SQL, Go
        - Frameworks: Next.js, Tailwind CSS, FastAPI
        - Tools: Docker, AWS, Supabase, Git
      `);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <ToolLayout
      title="Resume Builder"
      description="Create a professional, ATS-friendly resume in seconds with AI."
      icon={Briefcase}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result ? (
        <div className="whitespace-pre-wrap leading-relaxed font-serif bg-white text-black p-8 rounded shadow-inner">
          {result}
        </div>
      ) : null}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Full Name & Role
          </label>
          <input
            type="text"
            placeholder="e.g., John Doe - Full Stack Engineer"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            Work Experience
          </label>
          <textarea
            placeholder="Paste your raw experience or bullet points here..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              Education
            </label>
            <input
              type="text"
              placeholder="e.g., BS Computer Science"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" />
              Template
            </label>
            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none">
              <option value="modern">Modern Professional</option>
              <option value="creative">Creative Designer</option>
              <option value="minimal">Minimalist</option>
              <option value="executive">Executive</option>
            </select>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
