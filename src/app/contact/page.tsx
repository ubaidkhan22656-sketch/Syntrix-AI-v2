import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in <span className="gradient-text">Touch</span></h1>
          <p className="text-muted-foreground text-lg">
            Have questions or need support? We're here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="glass-card p-8 md:p-12 rounded-3xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    placeholder="Tell us more about your request..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[150px]"
                  />
                </div>
                <Button variant="premium" className="w-full h-12 rounded-xl font-bold">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            {[
              { title: "Email Us", info: "support@aiplatform.com", icon: Mail },
              { title: "Live Chat", info: "Available 24/7 in dashboard", icon: MessageSquare },
              { title: "Office", info: "123 AI Boulevard, San Francisco, CA", icon: MapPin },
              { title: "Phone", info: "+1 (555) 123-4567", icon: Phone },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6 rounded-2xl flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">{item.title}</h3>
                  <p className="font-medium">{item.info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
