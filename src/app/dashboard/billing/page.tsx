"use client";

import { Button } from "@/components/ui/button";
import { CreditCard, Check, Sparkles, Zap, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BillingPage() {
  const { user } = useAuth();
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Fetch credits
        const { data: profile } = await supabase
          .from("profiles")
          .select("credits, plan")
          .eq("id", user.id)
          .single();

        if (profile) {
          setCredits(profile.credits);
        }
      } catch (error) {
        console.error("Error fetching billing data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div className="text-center py-12">Loading billing information...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Free Tier Account</h1>
        <p className="text-muted-foreground">You are using the free tier version of AI Platform with unlimited access to all tools.</p>
      </div>

      {/* Free Tier Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-3xl border border-green-500/20 bg-green-500/5"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Free Tier Benefits</h3>
            <p className="text-muted-foreground mb-4">
              You have full access to all AI tools powered by Google Gemini. This is a free tier version with no payment required.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Unlimited access to all AI tools</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Powered by Google Gemini API</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Community support</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Plan Card */}
        <div className="premium-gradient p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -mr-32 -mt-32 rounded-full" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3 h-3" />
                  Active Plan
                </div>
                <h2 className="text-4xl font-bold">Free Tier</h2>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">$0.00</div>
                <div className="text-sm opacity-80">forever</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm font-medium">All AI Tools Included</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm font-medium">Google Gemini Powered</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm font-medium">Community Support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm font-medium">No Credit Card Required</span>
              </div>
            </div>

            <Button className="bg-white text-primary hover:bg-white/90 font-bold px-8 rounded-xl w-full">
              You're All Set!
            </Button>
          </div>
        </div>

        {/* Features Overview */}
        <div className="space-y-4">
          <div className="glass-card p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Available Tools
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="font-semibold text-sm">27+ AI Tools</div>
                <div className="text-xs text-muted-foreground mt-1">Article Writer, Code Generator, Resume Builder, and more</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="font-semibold text-sm">Unlimited Generations</div>
                <div className="text-xs text-muted-foreground mt-1">No limits on how many times you can use each tool</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="font-semibold text-sm">History & Favorites</div>
                <div className="text-xs text-muted-foreground mt-1">Save and organize your generated content</div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Account Info
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-muted-foreground text-sm">Email</span>
                <div className="font-semibold">{user?.email}</div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Plan Type</span>
                <div className="font-semibold">Free Tier</div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Status</span>
                <div className="font-semibold text-green-500">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="glass-card p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">About This Free Tier</h3>
            <p className="text-muted-foreground mb-4">
              This application uses Google Gemini's free tier API for all AI-powered features. The free tier has usage limits set by Google. If you experience rate limiting, please wait a few moments before making another request.
            </p>
            <p className="text-sm text-muted-foreground">
              For production use with higher limits, consider upgrading to a paid tier or setting up your own API keys.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="glass-card p-8 rounded-3xl">
        <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold mb-2">Is this really free?</h4>
            <p className="text-muted-foreground text-sm">
              Yes! This application is completely free. It uses Google Gemini's free tier API, and all data is stored in Supabase's free tier. No payment is required.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Are there any limits?</h4>
            <p className="text-muted-foreground text-sm">
              Google Gemini's free tier has rate limits. If you hit the limit, you'll need to wait before making more requests. For unlimited access, you would need to upgrade to a paid plan.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Can I upgrade later?</h4>
            <p className="text-muted-foreground text-sm">
              Yes, you can always upgrade to a paid tier in the future if you need higher limits and priority support.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Is my data safe?</h4>
            <p className="text-muted-foreground text-sm">
              Yes, your data is stored securely in Supabase with row-level security policies. Your account is protected with authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
