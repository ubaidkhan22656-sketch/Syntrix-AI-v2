# AI SaaS Platform - Free Tier Version

This is the **completely free** version of the AI SaaS platform. It requires no paid API keys and uses only free services.

## What's Included

✅ **27+ AI Tools** - All powered by Google Gemini free tier
✅ **User Authentication** - Email, Google, and GitHub login via Supabase
✅ **Database** - PostgreSQL via Supabase free tier
✅ **History & Favorites** - Save and organize your generated content
✅ **Responsive Design** - Works on all devices
✅ **Dark Mode** - Beautiful premium UI

## What's NOT Included (Free Tier)

❌ **OpenAI Integration** - Removed completely
❌ **Stripe Payments** - Disabled (no subscription billing)
❌ **Premium Support** - Community support only
❌ **Advanced Models** - Uses Gemini free tier only

## Quick Start

### 1. Clone or Extract the Project

```bash
cd ai-saas-platform
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a new project (free tier)
3. Go to **Project Settings > API**
4. Copy your `Project URL` and `anon public key`
5. In the SQL Editor, run the migration file: `supabase/full_schema.sql`

### 3. Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **Create API Key**
3. Copy your API key

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GOOGLE_API_KEY=your_google_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Free Tier Limitations

**Google Gemini Free Tier:**
- Rate limits apply (requests per minute)
- If you hit the limit, wait a few moments before making another request
- For higher limits, upgrade to a paid Google Cloud plan

**Supabase Free Tier:**
- 500MB database storage
- 1GB bandwidth
- Sufficient for testing and small projects
- For production, consider upgrading to a paid plan

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GOOGLE_API_KEY`
5. Deploy

### Deploy to Hostinger

See `HOSTINGER_DEPLOYMENT.md` for detailed instructions.

## Important Notes

⚠️ **API Keys Security:**
- Never commit `.env.local` to version control
- Keep your `SUPABASE_SERVICE_ROLE_KEY` and `GOOGLE_API_KEY` secret
- Use environment variables for all sensitive data

⚠️ **Rate Limiting:**
- Google Gemini free tier has rate limits
- If you get rate limit errors, wait before making more requests
- Consider implementing request queuing for production

⚠️ **Data Privacy:**
- All user data is stored in Supabase
- Supabase has Row Level Security (RLS) policies enabled
- Your data is protected and private

## Upgrading Later

If you want to add paid features later:

1. **Add OpenAI:** Install `openai` package and update `/api/generate/route.ts`
2. **Add Stripe:** Install `stripe` package and update billing routes
3. **Upgrade Limits:** Switch to paid tiers of Supabase and Google Cloud

## Troubleshooting

### "Unauthorized" Error
- Check that your Supabase keys are correct
- Verify authentication is enabled in Supabase

### "Insufficient credits" Error
- This is expected if you haven't set up initial credits
- Check the database schema in `supabase/full_schema.sql`

### "API Key Error" from Google
- Verify your `GOOGLE_API_KEY` is correct
- Check that the key is enabled in Google Cloud Console
- Ensure you're not hitting rate limits

### Supabase Connection Error
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check that your project is running in Supabase dashboard
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is valid

## Support

For issues:
1. Check the troubleshooting section above
2. Review Supabase documentation: https://supabase.com/docs
3. Review Google Gemini documentation: https://ai.google.dev/docs
4. Check Next.js documentation: https://nextjs.org/docs

## License

This project is open source and available under the MIT License.

## Next Steps

1. ✅ Set up Supabase and Google Gemini keys
2. ✅ Run `npm install` and `npm run dev`
3. ✅ Create an account and test the AI tools
4. ✅ Deploy to Vercel or Hostinger
5. 🚀 Share with your users!

---

**Happy building! 🚀**
