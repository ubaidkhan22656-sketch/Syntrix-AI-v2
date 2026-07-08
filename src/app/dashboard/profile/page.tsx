"use client";

import { Button } from "@/components/ui/button";
import { User, Mail, Shield, Camera, Sparkles } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="glass-card p-8 rounded-3xl text-center">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-3xl premium-gradient flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                JD
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-background border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors shadow-lg">
                <Camera className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <h3 className="text-xl font-bold">John Doe</h3>
            <p className="text-sm text-muted-foreground mb-4">john@example.com</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Pro Member
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Account Status</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span>Member since</span>
                <span className="font-medium">Jan 2024</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Email Verified</span>
                <span className="text-green-500 font-medium">Yes</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>2FA Status</span>
                <span className="text-yellow-500 font-medium">Disabled</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="glass-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  placeholder="Tell us about yourself..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[100px]"
                  defaultValue="AI enthusiast and digital creator building the future."
                />
              </div>
              <Button variant="premium" className="h-12 px-8 rounded-xl font-bold">
                Save Changes
              </Button>
            </form>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Security
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <div className="font-bold">Change Password</div>
                  <div className="text-xs text-muted-foreground">Update your account password regularly.</div>
                </div>
                <Button variant="outline" size="sm" className="rounded-lg">Update</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <div className="font-bold">Two-Factor Authentication</div>
                  <div className="text-xs text-muted-foreground">Add an extra layer of security to your account.</div>
                </div>
                <Button variant="outline" size="sm" className="rounded-lg">Enable</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
