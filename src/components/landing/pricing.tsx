"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    price: "0",
    description: "Perfect for individuals exploring AI tools.",
    features: [
      "1,000 AI Credits / month",
      "Basic AI Chat",
      "Article Writer (Limited)",
      "Standard Support",
      "5 Projects",
    ],
    buttonText: "Start for Free",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: "49",
    description: "Best for professionals and small teams.",
    features: [
      "50,000 AI Credits / month",
      "Advanced AI Models",
      "Full SEO Suite",
      "Priority Support",
      "Unlimited Projects",
      "Custom Templates",
    ],
    buttonText: "Get Started Pro",
    href: "/signup",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "199",
    description: "For large organizations with custom needs.",
    features: [
      "Unlimited AI Credits",
      "Dedicated Account Manager",
      "API Access",
      "Custom Model Training",
      "Advanced Security",
      "SLA Support",
    ],
    buttonText: "Contact Sales",
    href: "/contact",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, <span className="gradient-text">Transparent Pricing</span></h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that's right for you and start building with AI today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative glass-card p-8 rounded-3xl flex flex-col ${
                tier.popular ? "border-primary/50 ring-1 ring-primary/50" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full premium-gradient text-white text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-muted-foreground text-sm">{tier.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-bold">${tier.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href={tier.href}>
                <Button 
                  variant={tier.popular ? "premium" : "outline"} 
                  className="w-full h-12 rounded-xl font-bold"
                >
                  {tier.buttonText}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
