"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  FileText, 
  MessageSquare, 
  Hash, 
  Image as ImageIcon, 
  FileJson, 
  Lock, 
  QrCode, 
  FileDown, 
  Maximize, 
  Scissors,
  Wand2,
  PenTool,
  CheckCircle,
  Users,
  Mail,
  Briefcase,
  Camera,
  Music,
  Code,
  Layout,
  Upload,
  Play as Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = ["All", "Writing", "SEO", "Social Media", "Business", "Developer", "PDF & Image"];

const tools = [
  // Writing
  { id: "ai-chat", name: "AI Chat", desc: "Interactive AI assistant for any task.", icon: MessageSquare, cat: "Writing", href: "/dashboard/tools/ai-chat" },
  { id: "article-writer", name: "Article Writer", desc: "Generate long-form articles.", icon: FileText, cat: "Writing", href: "/dashboard/tools/article-writer" },
  { id: "blog-writer", name: "Blog Writer", desc: "Craft engaging blog posts.", icon: PenTool, cat: "Writing", href: "/dashboard/tools/blog-writer" },
  { id: "grammar-checker", name: "Grammar Checker", desc: "Fix errors and improve flow.", icon: CheckCircle, cat: "Writing", href: "/dashboard/tools/grammar-checker" },
  { id: "paraphrasing", name: "Paraphrasing Tool", desc: "Rewrite content uniquely.", icon: Wand2, cat: "Writing", href: "/dashboard/tools/paraphrasing" },
  { id: "humanizer", name: "AI Humanizer", desc: "Make AI text sound human.", icon: Users, cat: "Writing", href: "/dashboard/tools/humanizer" },
  { id: "ai-detector", name: "AI Detector", desc: "Check for AI-generated text.", icon: Search, cat: "Writing", href: "/dashboard/tools/ai-detector" },
  
  // SEO
  { id: "seo-writer", name: "SEO Writer", desc: "Optimized content for rankings.", icon: Search, cat: "SEO", href: "/dashboard/tools/seo-writer" },
  { id: "hashtag-gen", name: "Hashtag Generator", desc: "Viral tags for social media.", icon: Hash, cat: "SEO", href: "/dashboard/tools/hashtag-gen" },
  
  // Business
  { id: "resume-builder", name: "Resume Builder", desc: "Professional resumes in seconds.", icon: Briefcase, cat: "Business", href: "/dashboard/tools/resume-builder" },
  { id: "cover-letter", name: "Cover Letter Gen", desc: "Personalized job applications.", icon: FileText, cat: "Business", href: "/dashboard/tools/cover-letter" },
  { id: "email-writer", name: "Email Writer", desc: "Professional emails for any case.", icon: Mail, cat: "Business", href: "/dashboard/tools/email-writer" },
  { id: "business-name", name: "Business Name Gen", desc: "Catchy names for your brand.", icon: Layout, cat: "Business", href: "/dashboard/tools/business-name" },
  { id: "slogan-gen", name: "Slogan Generator", desc: "Memorable brand taglines.", icon: Music, cat: "Business", href: "/dashboard/tools/slogan-gen" },
  
  // Social Media
  { id: "instagram-caption", name: "Instagram Caption", desc: "Engaging captions for IG.", icon: Camera, cat: "Social Media", href: "/dashboard/tools/instagram-caption" },
  { id: "tiktok-caption", name: "TikTok Caption", desc: "Viral hooks for TikTok.", icon: Music, cat: "Social Media", href: "/dashboard/tools/tiktok-caption" },
  { id: "youtube-title", name: "YouTube Title", desc: "High-CTR video titles.", icon: Video, cat: "Social Media", href: "/dashboard/tools/youtube-title" },
  { id: "youtube-desc", name: "YouTube Description", desc: "Optimized video descriptions.", icon: Video, cat: "Social Media", href: "/dashboard/tools/youtube-desc" },
  
  // Developer
  { id: "code-gen", name: "Code Generator", desc: "Write code in any language.", icon: Code, cat: "Developer", href: "/dashboard/tools/code-gen" },
  { id: "json-formatter", name: "JSON Formatter", desc: "Prettify and validate JSON.", icon: FileJson, cat: "Developer", href: "/dashboard/tools/json-formatter" },
  { id: "password-gen", name: "Password Generator", desc: "Secure, random passwords.", icon: Lock, cat: "Developer", href: "/dashboard/tools/password-gen" },
  { id: "qr-gen", name: "QR Code Generator", desc: "Create custom QR codes.", icon: QrCode, cat: "Developer", href: "/dashboard/tools/qr-gen" },
  
  // PDF & Image
  { id: "img-compress", name: "Image Compressor", desc: "Reduce size without quality loss.", icon: Maximize, cat: "PDF & Image", href: "/dashboard/tools/img-compress" },
  { id: "bg-remover", name: "Background Remover", desc: "Remove backgrounds instantly.", icon: Scissors, cat: "PDF & Image", href: "/dashboard/tools/bg-remover" },
  { id: "pdf-merge", name: "PDF Merge", desc: "Combine multiple PDF files.", icon: Upload, cat: "PDF & Image", href: "/dashboard/tools/pdf-merge" },
  { id: "pdf-split", name: "PDF Split", desc: "Separate PDF pages.", icon: Scissors, cat: "PDF & Image", href: "/dashboard/tools/pdf-split" },
  { id: "pdf-compress", name: "PDF Compressor", desc: "Reduce PDF file size.", icon: FileDown, cat: "PDF & Image", href: "/dashboard/tools/pdf-compress" },
];

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === "All" || tool.cat === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Tools Catalog</h1>
        <p className="text-muted-foreground">Explore our comprehensive suite of 27+ premium AI-powered tools.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                activeCategory === cat 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-white/5 text-muted-foreground hover:bg-white/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search tools..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={tool.href}>
              <div className="glass-card p-6 rounded-2xl h-full hover:border-primary/50 transition-all group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:scale-110 transition-all">
                  <tool.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{tool.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Open Tool</span>
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wand2 className="w-3 h-3 text-primary" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-24 glass-card rounded-3xl">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">No tools found</h3>
          <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
          <Button 
            variant="ghost" 
            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
            className="mt-4"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
