"use client";

import { useState } from "react";
import { Settings, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export default function SettingsPage() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    darkMode: true,
    language: "en",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      <div className="glass-card rounded-2xl p-8 border border-white/10 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-muted-foreground"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <h2 className="text-lg font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Email Notifications</label>
                <p className="text-xs text-muted-foreground mt-1">Receive email updates about your account</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.emailNotifications}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    emailNotifications: e.target.checked,
                  })
                }
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Dark Mode</label>
                <p className="text-xs text-muted-foreground mt-1">Use dark theme for the interface</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.darkMode}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    darkMode: e.target.checked,
                  })
                }
                className="w-4 h-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={preferences.language}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    language: e.target.value,
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
