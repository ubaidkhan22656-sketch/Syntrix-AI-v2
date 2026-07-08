"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Wand2, 
  FileText, 
  History, 
  Star, 
  Settings, 
  CreditCard, 
  User, 
  HelpCircle,
  LogOut,
  Sparkles,
  BarChart3
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const sidebarLinks = [
  { group: "Main", items: [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Tools", href: "/dashboard/tools", icon: Wand2 },
    { name: "Projects", href: "/dashboard/projects", icon: FileText },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  ]},
  { group: "Library", items: [
    { name: "Favorites", href: "/dashboard/favorites", icon: Star },
    { name: "History", href: "/dashboard/history", icon: History },
  ]},
  { group: "Account", items: [
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]},
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <aside className="w-64 border-r border-white/10 h-screen flex flex-col sticky top-0 bg-card">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">AI Platform</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        {sidebarLinks.map((group) => (
          <div key={group.group} className="mb-6">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
              {group.group}
            </h4>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "group-hover:text-foreground")} />
                    <span className="text-sm font-medium">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="glass rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium">Credits</span>
            <span className="text-xs font-bold text-primary">750 / 1000</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: "75%" }} />
          </div>
          <Link href="/dashboard/billing">
            <button className="w-full mt-3 text-xs font-semibold py-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
              Upgrade Plan
            </button>
          </Link>
        </div>
        
        <div className="space-y-1">
          <Link
            href="/support"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Support</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
