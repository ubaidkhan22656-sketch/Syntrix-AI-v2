import { Sidebar } from "@/components/layout/sidebar";
import { Search, Bell, User } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/10 bg-card/50 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 w-full max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search tools, projects, history..." 
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-lg hover:bg-white/5 flex items-center justify-center relative transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
            </button>
            <div className="w-px h-6 bg-white/10 mx-2" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold">John Doe</div>
                <div className="text-xs text-muted-foreground">Pro Plan</div>
              </div>
              <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-white font-bold shadow-lg">
                JD
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
