"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  FileText, 
  History, 
  TrendingUp, 
  ArrowUpRight, 
  Clock,
  Sparkles,
  MessageSquare,
  Search,
  Wand2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  { label: "AI Credits Used", value: "750", total: "1,000", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { label: "Projects Created", value: "24", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Words Generated", value: "12,450", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Time Saved", value: "48h", icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10" },
];

const recentActivity = [
  { id: 1, title: "Next.js 15 Guide", type: "Article Writer", date: "2 hours ago", status: "Completed" },
  { id: 2, title: "Marketing Strategy", type: "SEO Writer", date: "5 hours ago", status: "Completed" },
  { id: 3, title: "Product Description", type: "AI Chat", date: "Yesterday", status: "Completed" },
  { id: 4, title: "Company Slogan", type: "Slogan Generator", date: "2 days ago", status: "Completed" },
];

const suggestedTools = [
  { name: "Article Writer", icon: FileText, desc: "Write high-quality long-form articles in minutes." },
  { name: "SEO Optimizer", icon: Search, desc: "Optimize your content for search engines." },
  { name: "Social Post", icon: MessageSquare, desc: "Create engaging posts for any platform." },
  { name: "AI Humanizer", icon: Wand2, desc: "Make AI content sound more natural." },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your AI workspace today.</p>
        </div>
        <Link href="/dashboard/tools">
          <Button variant="premium" className="rounded-xl shadow-lg shadow-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-xs font-medium text-green-500 flex items-center">
                +12% <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</div>
            {stat.total && (
              <div className="mt-4">
                <div className="w-full bg-white/5 rounded-full h-1.5 mb-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: "75%" }} />
                </div>
                <div className="text-[10px] text-right text-muted-foreground">75% of monthly limit</div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <Link href="/dashboard/history" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  <tr>
                    <th className="px-6 py-4">Project Name</th>
                    <th className="px-6 py-4">Tool Type</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentActivity.map((activity) => (
                    <tr key={activity.id} className="hover:bg-white/[0.02] transition-colors cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="font-medium group-hover:text-primary transition-colors">{activity.title}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{activity.type}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{activity.date}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Suggested Tools */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Suggested Tools</h2>
          <div className="space-y-4">
            {suggestedTools.map((tool) => (
              <div key={tool.name} className="glass-card p-4 rounded-xl hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <tool.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">{tool.name}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{tool.desc}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
            <Link href="/dashboard/tools" className="block">
              <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 rounded-xl">
                Explore All Tools
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
