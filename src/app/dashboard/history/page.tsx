"use client";

import { useState, useEffect } from "react";
import { Clock, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

interface HistoryItem {
  id: string;
  tool_id: string;
  input: any;
  output: any;
  created_at: string;
}

export default function HistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (!error && data) {
        setHistory(data);
      }
      setIsLoading(false);
    };

    fetchHistory();
  }, [user]);

  const handleDelete = async (id: string) => {
    await supabase.from("history").delete().eq("id", id);
    setHistory(history.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">History</h1>
          <p className="text-muted-foreground mt-1">View your past AI generations</p>
        </div>
      </div>

      {isLoading ? (
        <div className="glass-card rounded-2xl p-8 border border-white/10 text-center">
          <p className="text-muted-foreground">Loading history...</p>
        </div>
      ) : history.length === 0 ? (
        <div className="glass-card rounded-2xl p-8 border border-white/10 text-center">
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No history yet</h3>
          <p className="text-muted-foreground">Your AI generations will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div key={item.id} className="glass-card rounded-lg p-4 border border-white/10 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold capitalize">{item.tool_id}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {typeof item.output === "string" ? item.output : item.output?.text || "No output"}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const text = typeof item.output === "string" ? item.output : item.output?.text || "";
                    navigator.clipboard.writeText(text);
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
