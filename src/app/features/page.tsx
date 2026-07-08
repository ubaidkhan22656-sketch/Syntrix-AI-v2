"use client";

import { Zap, Brain, Zap as ZapIcon, Shield, Smartphone, Gauge } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Generation",
    description: "Advanced AI models generate high-quality content for any use case",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get results in seconds, not hours. Optimized for speed and efficiency",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and never shared with third parties",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Access your tools on any device, anytime, anywhere",
  },
  {
    icon: Gauge,
    title: "Customizable",
    description: "Fine-tune outputs to match your exact requirements",
  },
  {
    icon: ZapIcon,
    title: "Unlimited Potential",
    description: "Scale your content production without limits",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Powerful Features</h1>
          <p className="text-muted-foreground text-lg">
            Everything you need to generate amazing content with AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all"
              >
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
