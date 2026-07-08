export default function TermsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="glass-card p-8 md:p-12 rounded-3xl prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: July 1, 2026</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground mb-4">
            By accessing or using our platform, you agree to be bound by these Terms of Service 
            and all applicable laws and regulations. If you do not agree with any of these terms, 
            you are prohibited from using or accessing this site.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Use License</h2>
          <p className="text-muted-foreground mb-4">
            Permission is granted to temporarily use our AI tools for personal or commercial 
            purposes, subject to the limitations of your subscription plan. You may not:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li>Modify or copy the underlying platform code;</li>
            <li>Use the tools for any illegal purpose;</li>
            <li>Attempt to decompile or reverse engineer any software;</li>
            <li>Remove any copyright or other proprietary notations.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Content Ownership</h2>
          <p className="text-muted-foreground mb-4">
            You retain full ownership of the content you generate using our AI tools. 
            However, by using the service, you grant us a limited license to process 
            that content to provide the service to you.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Disclaimer</h2>
          <p className="text-muted-foreground mb-4">
            The AI-generated content is provided "as is". We make no warranties, 
            expressed or implied, and hereby disclaim and negate all other warranties 
            including, without limitation, implied warranties of merchantability 
            or fitness for a particular purpose.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Governing Law</h2>
          <p className="text-muted-foreground mb-4">
            These terms and conditions are governed by and construed in accordance with 
            the laws of the State of California and you irrevocably submit to the 
            exclusive jurisdiction of the courts in that State.
          </p>
        </div>
      </div>
    </div>
  );
}
