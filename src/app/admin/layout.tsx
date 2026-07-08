"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { LogOut, BarChart3, FileText, Users, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!profile?.is_admin) {
        router.push("/dashboard");
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    checkAdmin();
  }, [user, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 glass-card rounded-none border-r border-white/10 p-6 flex flex-col">
          <div className="mb-8">
            <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
            <p className="text-xs text-muted-foreground">Manage your platform</p>
          </div>

          <nav className="flex-1 space-y-2">
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl">
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/blog">
              <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl">
                <FileText className="w-4 h-4" />
                Blog Posts
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl">
                <Users className="w-4 h-4" />
                Users
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </Link>
          </nav>

          <Button
            variant="outline"
            className="w-full justify-start gap-3 rounded-xl"
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
