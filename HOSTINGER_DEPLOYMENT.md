# Hostinger Deployment Guide

This guide provides step-by-step instructions for deploying your AI SaaS platform to Hostinger.

## Prerequisites

- Hostinger account with Node.js hosting or VPS
- Your Supabase project URL and API keys
- OpenAI API key
- Google Generative AI API key
- Stripe API keys (if using payments)

## Option 1: Hostinger Node.js Hosting (Recommended for Beginners)

### Step 1: Prepare Your Project

1. Extract the project ZIP file locally
2. Ensure `.env.local` is NOT included in your deployment (it's in `.gitignore`)
3. Verify the project builds locally: `npm run build`

### Step 2: Upload to Hostinger

1. Go to your Hostinger dashboard
2. Navigate to **Hosting > File Manager** or use **FTP**
3. Upload all project files EXCEPT:
   - `node_modules/` (Hostinger will install these)
   - `.next/` (will be generated during build)
   - `.env.local` (keep this secret)
   - `.git/` (optional)

### Step 3: Configure Environment Variables

1. In Hostinger dashboard, go to **Node.js > Environment Variables**
2. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://coahwjkjvbpqoqxnudnb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
GOOGLE_API_KEY=your_google_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PRICE_PRO=price_1234567890
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE=price_0987654321
NEXT_PUBLIC_APP_URL=https://your-hostinger-domain.com
NODE_ENV=production
```

### Step 4: Set Build and Start Commands

In Hostinger Node.js settings:

- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Node Version:** 18 or higher

### Step 5: Deploy

1. Click **Deploy** or **Redeploy**
2. Hostinger will install dependencies and build your project
3. Your app will be live at your Hostinger domain

---

## Option 2: Hostinger VPS (Ubuntu/Debian)

### Step 1: Connect to Your VPS

```bash
ssh root@your_vps_ip
```

### Step 2: Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs npm
```

### Step 3: Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### Step 4: Clone Your Project

```bash
cd /home
git clone your_github_repo ai-saas
cd ai-saas
npm install
```

Or upload via FTP/SFTP:

```bash
scp -r ./ai-saas-platform root@your_vps_ip:/home/
```

### Step 5: Create .env File

```bash
nano /home/ai-saas/.env.local
```

Add all the environment variables listed above, then save (`Ctrl+X`, `Y`, `Enter`).

### Step 6: Build the Project

```bash
cd /home/ai-saas
npm run build
```

### Step 7: Start with PM2

```bash
pm2 start npm --name "ai-saas" -- start
pm2 save
pm2 startup
```

### Step 8: Configure Nginx (Reverse Proxy)

```bash
sudo apt-get install -y nginx
```

Create Nginx config:

```bash
sudo nano /etc/nginx/sites-available/ai-saas
```

Add:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/ai-saas /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 9: Set Up SSL (HTTPS)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://coahwjkjvbpqoqxnudnb.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key (public) | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (secret) | `eyJhbGc...` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `GOOGLE_API_KEY` | Google Generative AI key | `AIzaSy...` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_live_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` |
| `NEXT_PUBLIC_STRIPE_PRICE_PRO` | Stripe Pro plan price ID | `price_1234567890` |
| `NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE` | Stripe Enterprise price ID | `price_0987654321` |
| `NEXT_PUBLIC_APP_URL` | Your deployed domain | `https://your-domain.com` |
| `NODE_ENV` | Environment mode | `production` |

---

## Getting Your API Keys

### Supabase
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings > API**
4. Copy `Project URL` and `anon public key`
5. For service role key, scroll down and copy it

### OpenAI
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Click **Create new secret key**
3. Copy and save it

### Google Generative AI
1. Go to [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Click **Create API Key**
3. Copy and save it

### Stripe
1. Go to [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
2. Copy your **Secret Key** and **Publishable Key**
3. Go to **Webhooks** and create a new endpoint
4. Set URL to: `https://your-domain.com/api/stripe/webhook`
5. Copy the webhook secret

---

## Database Setup

**CRITICAL:** Before your app works, you must run the database migrations:

1. Go to your [Supabase SQL Editor](https://supabase.com/dashboard/project/coahwjkjvbpqoqxnudnb/sql/new)
2. Open `supabase/full_schema.sql` from your project
3. Copy the entire content
4. Paste into Supabase SQL Editor
5. Click **Run**

---

## Troubleshooting

### Build Fails on Hostinger

- Check that all environment variables are set
- Verify Node.js version is 18+
- Check build logs in Hostinger dashboard

### Application Won't Start

- Check PM2 logs: `pm2 logs ai-saas`
- Verify `.env.local` file exists with all variables
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

### Supabase Connection Error

- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is valid
- Ensure RLS policies are enabled in Supabase

### Authentication Not Working

- Go to Supabase > Authentication > URL Configuration
- Set **Site URL** to your Hostinger domain
- Add **Redirect URLs**: `https://your-domain.com/auth/callback`

### Stripe Webhooks Not Working

- Verify webhook URL in Stripe dashboard
- Check webhook secret matches `STRIPE_WEBHOOK_SECRET`
- View webhook logs in Stripe dashboard

---

## Monitoring

### Check Application Status

```bash
pm2 status
pm2 logs ai-saas
```

### Monitor Resource Usage

```bash
pm2 monit
```

### Restart Application

```bash
pm2 restart ai-saas
```

---

## Support

For issues:
1. Check Hostinger documentation
2. Review Supabase docs
3. Check OpenAI API status
4. Review Stripe documentation
