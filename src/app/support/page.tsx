"use client";

import { useState } from "react";
import { HelpCircle, Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "How do credits work?",
    answer:
      "Credits are used to generate content with our AI tools. Each tool costs a different number of credits based on complexity. You can view your remaining credits in the dashboard.",
  },
  {
    question: "Can I upgrade my plan?",
    answer:
      "Yes, you can upgrade your plan from the Billing section in your dashboard. Choose between Starter, Pro, and Enterprise plans.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click 'Forgot Password' on the login page and follow the instructions sent to your email.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and other popular payment methods through Stripe.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription anytime from the Billing section. Your access will continue until the end of your billing period.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team by email at support@aiplatform.com or use the contact form below.",
  },
];

export default function SupportPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setEmail("");
    setMessage("");
    setIsSubmitting(false);

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Support Center</h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions or contact our support team
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="glass-card rounded-lg p-4 border border-white/10 cursor-pointer group"
              >
                <summary className="flex items-center gap-3 font-semibold">
                  <HelpCircle className="w-5 h-5 text-primary group-open:hidden" />
                  {faq.question}
                </summary>
                <p className="text-muted-foreground mt-3 ml-8">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-card rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

          {submitted ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
              <MessageSquare className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-green-400 mb-2">Message Sent!</h3>
              <p className="text-green-400/80">
                Thank you for contacting us. We'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help?"
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isSubmitting}
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-lg p-6 border border-white/10">
            <Mail className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-muted-foreground">support@aiplatform.com</p>
          </div>
          <div className="glass-card rounded-lg p-6 border border-white/10">
            <MessageSquare className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-semibold mb-2">Response Time</h3>
            <p className="text-muted-foreground">Usually within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
