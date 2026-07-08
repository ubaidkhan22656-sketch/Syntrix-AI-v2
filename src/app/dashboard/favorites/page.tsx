"use client";

import { useState, useEffect } from "react";
import { Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

interface Favorite {
  id: string;
  history_id: string;
  created_at: string;
}

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setFavorites(data);
      }
      setIsLoading(false);
    };

    fetchFavorites();
  }, [user]);

  const handleDelete = async (id: string) => {
    await supabase.from("favorites").delete().eq("id", id);
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Favorites</h1>
          <p className="text-muted-foreground mt-1">Your saved AI-generated content</p>
        </div>
      </div>

      {isLoading ? (
        <div className="glass-card rounded-2xl p-8 border border-white/10 text-center">
          <p className="text-muted-foreground">Loading favorites...</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="glass-card rounded-2xl p-8 border border-white/10 text-center">
          <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
          <p className="text-muted-foreground">Star your favorite generations to save them here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map((item) => (
            <div key={item.id} className="glass-card rounded-lg p-4 border border-white/10 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Saved on {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
