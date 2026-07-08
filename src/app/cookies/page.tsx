"use client";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>

        <div className="glass-card rounded-2xl p-8 border border-white/10 space-y-6 prose prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
            <p className="text-muted-foreground">
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Essential Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, authentication, and user preferences.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Performance Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies help us understand how visitors interact with our website by collecting information about pages visited and any errors encountered.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Functional Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies allow us to remember your choices and provide personalized features and content.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Marketing Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies track your activity across websites to help us deliver targeted advertisements and measure campaign effectiveness.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
            <p className="text-muted-foreground">
              Most web browsers allow you to control cookies through their settings. You can choose to reject cookies or be notified when a cookie is being sent. Please note that disabling cookies may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
            <p className="text-muted-foreground">
              We may allow third-party service providers to place cookies on your device for analytics, advertising, and other purposes. These third parties have their own privacy policies governing their cookie use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this cookie policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about our use of cookies, please contact us at privacy@aiplatform.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
