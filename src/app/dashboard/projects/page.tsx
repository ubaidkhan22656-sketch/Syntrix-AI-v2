"use client";

import { useState } from "react";
import { Plus, Folder, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const [projects] = useState([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">Organize and manage your AI-generated content</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      <div className="glass-card rounded-2xl p-8 border border-white/10 text-center">
        <Folder className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
        <p className="text-muted-foreground mb-6">
          Create your first project to organize your AI-generated content
        </p>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Project
        </Button>
      </div>
    </div>
  );
}
