"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  Shield, 
  Globe, 
  BarChart, 
  Cpu, 
  Layers 
} from "lucide-react";

const features = [
  {
    title: "Lightning Fast",
    description: "Generate high-quality content in seconds with our optimized AI engines.",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Enterprise Security",
    description: "Your data is encrypted and protected with industry-standard protocols.",
    icon: Shield,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Global Reach",
    description: "Support for over 50 languages to help you scale your business globally.",
    icon: Globe,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Advanced Analytics",
    description: "Track your usage and optimize your AI-generated content performance.",
    icon: BarChart,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Powerful Models",
    description: "Access the latest LLMs including GPT-4, Claude 3, and Gemini Pro.",
    icon: Cpu,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    title: "Seamless Integration",
    description: "Connect with your favorite tools via our robust API and plugins.",
    icon: Layers,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to <span className="gradient-text">scale with AI</span></h2>
          <p className="text-muted-foreground text-lg">
            Our platform provides a comprehensive suite of tools designed to help you 
            work smarter, not harder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl group hover:border-primary/50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
