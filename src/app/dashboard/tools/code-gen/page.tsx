"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Code, Terminal, Cpu, Braces } from "lucide-react";

export default function CodeGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setResult(`
        // AI Generated Next.js 15 Server Component
        
        import { db } from "@/lib/db";
        import { users } from "@/lib/db/schema";
        
        export default async function UserProfile({ id }: { id: string }) {
          const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.id, id),
          });
        
          if (!user) {
            return <div>User not found</div>;
          }
        
          return (
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          );
        }
      `);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <ToolLayout
      title="Code Generator"
      description="Write high-quality code, components, and functions in any programming language."
      icon={Code}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      result={result ? (
        <div className="bg-[#0d1117] p-6 rounded-xl font-mono text-sm overflow-x-auto">
          <pre className="text-blue-400">
            {result}
          </pre>
        </div>
      ) : null}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            Prompt / Task
          </label>
          <textarea
            placeholder="e.g., Create a Next.js 15 server component to fetch user data from a database using Drizzle ORM."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[120px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Braces className="w-4 h-4 text-primary" />
              Language
            </label>
            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none">
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="rust">Rust</option>
              <option value="go">Go</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              Framework
            </label>
            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none">
              <option value="nextjs">Next.js 15</option>
              <option value="react">React</option>
              <option value="fastapi">FastAPI</option>
              <option value="express">Express</option>
            </select>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
