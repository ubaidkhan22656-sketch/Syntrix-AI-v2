import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Star, MessageSquare, Zap, Search, Layout } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Active Users", value: "50K+" },
  { label: "AI Generations", value: "10M+" },
  { label: "Happy Customers", value: "99%" },
  { label: "Support", value: "24/7" },
];

const toolCategories = [
  { name: "Content Writing", icon: MessageSquare, count: 12 },
  { name: "SEO Optimization", icon: Search, count: 8 },
  { name: "Social Media", icon: Zap, count: 15 },
  { name: "Productivity", icon: Layout, count: 10 },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      
      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Features />

      {/* Tools Preview Section */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Powerful <span className="gradient-text">AI Tools</span> for every task</h2>
              <p className="text-muted-foreground text-lg">
                From long-form articles to social media captions, our platform has everything you need 
                to create high-quality content in seconds.
              </p>
            </div>
            <Link href="/tools">
              <Button variant="ghost" className="group">
                View all tools
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolCategories.map((category) => (
              <div key={category.name} className="glass p-6 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-muted-foreground text-sm">{category.count} specialized tools</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="premium-gradient rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to supercharge your content?</h2>
              <p className="text-white/80 text-lg md:text-xl mb-12">
                Join thousands of creators and businesses who are already using our AI platform 
                to transform their workflow.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-lg font-bold rounded-xl">
                    Get Started Now
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 h-14 px-8 text-lg font-bold rounded-xl">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pricing />

      {/* Testimonials */}
      <section className="py-24 bg-background border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-16">Trusted by world-class teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-8 rounded-2xl text-left">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "This platform has completely changed how we approach content creation. 
                  The AI tools are incredibly intuitive and the output quality is unmatched."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted" />
                  <div>
                    <div className="font-bold">Sarah Jenkins</div>
                    <div className="text-xs text-muted-foreground">Marketing Director at TechFlow</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="glass-card p-12 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold mb-4">Subscribe to our newsletter</h2>
              <p className="text-muted-foreground">
                Get the latest updates on AI tools, templates, and industry news delivered 
                straight to your inbox.
              </p>
            </div>
            <div className="w-full max-w-md flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <Button variant="premium" className="rounded-xl px-6">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
