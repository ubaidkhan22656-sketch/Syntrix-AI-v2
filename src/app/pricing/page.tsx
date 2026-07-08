import { Pricing } from "@/components/landing/pricing";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Plans for <span className="gradient-text">every creator</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Whether you're just starting out or scaling a large enterprise, 
          we have the perfect plan for your AI needs.
        </p>
      </div>
      
      <Pricing />

      <div className="container mx-auto px-4 md:px-6 mt-24">
        <h2 className="text-3xl font-bold text-center mb-16">Compare Features</h2>
        <div className="glass-card rounded-3xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5">
              <tr>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider">Feature</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-center">Starter</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-center">Pro</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                "AI Credits / Month",
                "Advanced AI Models",
                "SEO Suite",
                "Priority Support",
                "API Access",
                "Custom Templates",
                "Team Collaboration",
                "SLA Guarantee",
              ].map((feature, i) => (
                <tr key={feature} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-4 text-sm font-medium">{feature}</td>
                  <td className="px-8 py-4 text-center">
                    {i === 0 ? "1,000" : i < 3 ? <Check className="w-4 h-4 mx-auto text-primary" /> : "-"}
                  </td>
                  <td className="px-8 py-4 text-center">
                    {i === 0 ? "50,000" : i < 6 ? <Check className="w-4 h-4 mx-auto text-primary" /> : "-"}
                  </td>
                  <td className="px-8 py-4 text-center">
                    {i === 0 ? "Unlimited" : <Check className="w-4 h-4 mx-auto text-primary" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
