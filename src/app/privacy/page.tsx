export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="glass-card p-8 md:p-12 rounded-3xl prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: July 1, 2026</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-muted-foreground mb-4">
            We collect information you provide directly to us when you create an account, 
            use our AI tools, or communicate with us. This may include your name, email address, 
            payment information, and the content you generate using our services.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-muted-foreground mb-4">
            We use the information we collect to provide, maintain, and improve our services, 
            to process transactions, to send you technical notices and support messages, 
            and to communicate with you about products, services, and events.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Data Security</h2>
          <p className="text-muted-foreground mb-4">
            We take reasonable measures to help protect information about you from loss, 
            theft, misuse and unauthorized access, disclosure, alteration and destruction. 
            All data is encrypted in transit and at rest.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Your Rights</h2>
          <p className="text-muted-foreground mb-4">
            You have the right to access, update, or delete your personal information at any time 
            through your account settings. If you have any questions about your data, 
            please contact our privacy team.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Changes to this Policy</h2>
          <p className="text-muted-foreground mb-4">
            We may change this Privacy Policy from time to time. If we make changes, 
            we will notify you by revising the date at the top of the policy and, 
            in some cases, we may provide you with additional notice.
          </p>
        </div>
      </div>
    </div>
  );
}
