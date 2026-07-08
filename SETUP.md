# AI SaaS Platform - Complete Setup Guide

This guide will walk you through setting up the complete AI SaaS platform with all integrations.

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- A Supabase account and project
- OpenAI API key
- Google Generative AI API key
- Stripe account (for payments)

## Step 1: Clone and Install Dependencies

```bash
cd ai-saas-platform
npm install
# or
pnpm install
```

## Step 2: Set Up Supabase

1. Create a new Supabase project at https://supabase.com
2. Go to Project Settings > API Keys
3. Copy your `Project URL` and `anon public key`
4. Run the SQL migrations in your Supabase SQL Editor:
   - Open `supabase/migrations/20240701000000_initial_schema.sql`
   - Copy and paste the entire content into Supabase SQL Editor
   - Click "Run"
   - Repeat for `supabase/migrations/20260701000001_expand_schema.sql`

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in all the required values:

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### OpenAI
```
OPENAI_API_KEY=sk-your-openai-key
```

Get your key from: https://platform.openai.com/api-keys

### Google Generative AI
```
GOOGLE_API_KEY=your_google_api_key
```

Get your key from: https://makersuite.google.com/app/apikey

### Stripe
```
STRIPE_SECRET_KEY=sk_test_your_stripe_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NEXT_PUBLIC_STRIPE_PRICE_PRO=price_your_pro_price_id
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE=price_your_enterprise_price_id
```

Get your keys from: https://dashboard.stripe.com/apikeys

## Step 4: Set Up Stripe Products and Prices

1. Go to Stripe Dashboard > Products
2. Create two products:
   - **Pro Plan**: $49/month
   - **Enterprise Plan**: $199/month
3. Copy the Price IDs and add them to your `.env.local`

## Step 5: Configure Stripe Webhooks

1. Go to Stripe Dashboard > Webhooks
2. Add a new endpoint:
   - URL: `https://your-domain.com/api/stripe/webhook`
   - Events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
3. Copy the Webhook Secret and add it to `.env.local`

## Step 6: Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 7: Create Your First Admin User

1. Sign up at http://localhost:3000/signup
2. Go to Supabase > profiles table
3. Update your profile to set `is_admin = true`
4. Access the admin panel at http://localhost:3000/admin

## Features Overview

### Authentication
- Email/Password signup and login
- Google OAuth
- GitHub OAuth
- Password reset

### AI Tools (27+)
- Article Writer
- SEO Writer
- AI Chat
- Code Generator
- Resume Builder
- And 22+ more...

### Dashboard
- User profile management
- Subscription management
- Credit system
- History and favorites
- Analytics

### Admin Panel
- Dashboard with statistics
- Blog CMS
- User management
- System settings

### Blog CMS
- Create, edit, publish blog posts
- Markdown support
- Featured images
- Author management

### Billing
- Stripe subscription management
- Credit system
- Invoice history
- Plan upgrades

## API Endpoints

### Generation
- `POST /api/generate` - Generate content using AI tools

### Blog
- `GET /api/blog` - Get published blog posts
- `POST /api/blog` - Create new blog post (admin only)

### Stripe
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/webhook` - Stripe webhook handler

## Database Schema

### Tables
- `profiles` - User profiles and subscription info
- `projects` - User projects/saved content
- `history` - Generation history
- `favorites` - Favorite projects/history
- `blog_posts` - Blog post content
- `subscriptions` - Stripe subscription data
- `products` - Stripe products
- `prices` - Stripe prices

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add environment variables
5. Deploy!

### Deploy to Other Platforms

The application is compatible with any platform that supports Node.js 18+.

## Troubleshooting

### "Insufficient credits" error
- Check user's credit balance in the profiles table
- Verify credit costs in `src/lib/credits.ts`

### Stripe webhook not working
- Verify webhook secret in `.env.local`
- Check Stripe webhook logs in dashboard
- Ensure webhook URL is publicly accessible

### AI generation failing
- Check API keys in `.env.local`
- Verify OpenAI/Google API quotas
- Check API response in browser console

### Database errors
- Verify Supabase connection string
- Check RLS policies are enabled
- Run migrations again if needed

## Support

For issues or questions:
1. Check the GitHub repository
2. Review Supabase documentation
3. Check OpenAI API docs
4. Review Stripe documentation

## License

MIT License - See LICENSE file for details
