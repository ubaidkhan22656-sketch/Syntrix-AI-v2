import { Sparkles, Users, Target, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Mission is to <span className="gradient-text">Democratize AI</span></h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Founded in 2024, we are a team of AI enthusiasts and software engineers 
            dedicated to building the most intuitive and powerful AI platform for 
            creators, businesses, and developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {[
            { title: "Innovation", desc: "We are constantly pushing the boundaries of what's possible with generative AI.", icon: Zap },
            { title: "Quality", desc: "Our tools are engineered for excellence, ensuring high-quality output every time.", icon: Sparkles },
            { title: "Community", desc: "We build for our users, listening to feedback to improve our platform daily.", icon: Users },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-16 h-16 rounded-2xl premium-gradient flex items-center justify-center mx-auto mb-6 shadow-xl">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-[3rem] p-12 md:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[100px] -z-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Built by experts, <br />trusted by thousands</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Our platform is powered by the latest advancements in Large Language Models (LLMs) 
                and generative technology. We combine state-of-the-art engineering with 
                luxury UI/UX design to provide an unmatched user experience.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-bold mb-1">2024</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Founded</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1">50K+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Active Users</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="Our Team" 
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl shadow-xl animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold">100% Focused</div>
                    <div className="text-xs text-muted-foreground">On User Success</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
