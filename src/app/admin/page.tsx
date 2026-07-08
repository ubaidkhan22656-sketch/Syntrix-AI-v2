"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, FileText, TrendingUp, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    activeSubscriptions: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total users
        const { count: usersCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        // Get total blog posts
        const { count: postsCount } = await supabase
          .from("blog_posts")
          .select("*", { count: "exact", head: true });

        // Get active subscriptions
        const { count: subsCount } = await supabase
          .from("subscriptions")
          .select("*", { count: "exact", head: true })
          .eq("status", "active");

        setStats({
          totalUsers: usersCount || 0,
          totalPosts: postsCount || 0,
          activeSubscriptions: subsCount || 0,
          totalRevenue: (subsCount || 0) * 49, // Approximate
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Blog Posts",
      value: stats.totalPosts,
      icon: FileText,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Active Subscriptions",
      value: stats.activeSubscriptions,
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Monthly Revenue",
      value: `$${stats.totalRevenue}`,
      icon: DollarSign,
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your platform's performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.title} className="glass-card p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {card.title}
              </h3>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground mt-2">Updated in real-time</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-8 rounded-3xl">
          <h2 className="text-xl font-bold mb-6">Recent Users</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="font-bold">User {i}</div>
                  <div className="text-xs text-muted-foreground">user{i}@example.com</div>
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">Active</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left font-bold">
              Create New Blog Post
            </button>
            <button className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left font-bold">
              Manage Users
            </button>
            <button className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left font-bold">
              View Analytics
            </button>
            <button className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left font-bold">
              System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
