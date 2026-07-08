# Deployment Guide

This project is optimized for deployment on **Vercel** and **Hostinger**.

## Option 1: Vercel (Recommended)

Vercel is the native platform for Next.js and provides the best experience.

1.  **Push to GitHub:** Create a new repository on GitHub and push your code.
2.  **Import to Vercel:** Go to [Vercel](https://vercel.com/new) and import your repository.
3.  **Configure Environment Variables:** In the Vercel dashboard, add all the variables from your `.env.local` file.
    - `NEXT_PUBLIC_SUPABASE_URL`: `https://coahwjkjvbpqoqxnudnb.supabase.co`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Your Supabase Anon Key)
    - `SUPABASE_SERVICE_ROLE_KEY`: (Your Supabase Service Role Key)
    - `OPENAI_API_KEY`: (Your OpenAI Key)
    - `GOOGLE_API_KEY`: (Your Google AI Key)
    - `STRIPE_SECRET_KEY`: (Your Stripe Secret Key)
    - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: (Your Stripe Publishable Key)
    - `STRIPE_WEBHOOK_SECRET`: (Your Stripe Webhook Secret)
    - `NEXT_PUBLIC_APP_URL`: `https://your-vercel-domain.vercel.app`
4.  **Deploy:** Click "Deploy". Vercel will automatically build and host your application.

## Option 2: Hostinger (VPS or Node.js Hosting)

If you are using Hostinger's Node.js hosting or a VPS:

### For Node.js Hosting:
1.  **Upload Files:** Use the File Manager or FTP to upload the project files (excluding `node_modules`).
2.  **Install Dependencies:** Use the terminal in the Hostinger panel to run `npm install`.
3.  **Build the Project:** Run `npm run build`.
4.  **Environment Variables:** Add your environment variables in the Hostinger Node.js configuration panel.
5.  **Start Application:** Set the start command to `npm start`.

### For VPS (Ubuntu/Debian):
1.  **Install Node.js:** `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs`
2.  **Install PM2:** `sudo npm install -g pm2`
3.  **Clone & Install:** Clone your repo, then `npm install`.
4.  **Build:** `npm run build`.
5.  **Start with PM2:** `pm2 start npm --name "ai-saas" -- start`.
6.  **Setup Nginx:** Configure Nginx as a reverse proxy to port 3000.

## Database Setup (Crucial)

Before your application works, you **MUST** run the migrations in your Supabase project:

1.  Go to your [Supabase SQL Editor](https://supabase.com/dashboard/project/coahwjkjvbpqoqxnudnb/sql/new).
2.  Open the `supabase/full_schema.sql` file from this project.
3.  Copy the entire content and paste it into the Supabase SQL Editor.
4.  Click **Run**.

## Authentication Configuration

1.  In Supabase, go to **Authentication > URL Configuration**.
2.  Set **Site URL** to your deployed domain (e.g., `https://your-app.com`).
3.  Add **Redirect URLs**:
    - `https://your-app.com/auth/callback`
    - `http://localhost:3000/auth/callback` (for local testing)

## Stripe Webhook

Once deployed, update your Stripe Webhook URL to:
`https://your-app.com/api/stripe/webhook`
