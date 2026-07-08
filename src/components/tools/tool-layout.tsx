"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Copy, Download, Share2, History } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
  result?: React.ReactNode;
  onGenerate: () => void;
  isGenerating?: boolean;
}

export function ToolLayout({ 
  title, 
  description, 
  icon: Icon, 
  children, 
  result, 
  onGenerate,
  isGenerating = false
}: ToolLayoutProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/tools">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Side */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl space-y-6">
            {children}
            <Button 
              variant="premium" 
              className="w-full h-12 rounded-xl font-bold"
              onClick={onGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Generate Content
                </div>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <History className="w-3 h-3" />
              Recent generations
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-primary">View History</span>
          </div>
        </div>

        {/* Result Side */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl min-h-[400px] flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
              <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Result</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" disabled={!result}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" disabled={!result}>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" disabled={!result}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 p-6 relative">
              {isGenerating && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full"
                  />
                </div>
              )}
              
              {result ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="prose prose-invert max-w-none"
                >
                  {result}
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 opacity-20" />
                  </div>
                  <p className="max-w-[200px]">Fill in the details and click generate to see the results.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
