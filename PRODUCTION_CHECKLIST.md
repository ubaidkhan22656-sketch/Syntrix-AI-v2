# Production Deployment Checklist

This checklist ensures your AI SaaS platform is production-ready before deployment.

## Environment Variables

- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` to your Supabase project URL
- [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your Supabase anon key
- [ ] Set `SUPABASE_SERVICE_ROLE_KEY` to your Supabase service role key
- [ ] Set `GOOGLE_API_KEY` to your Google Generative AI API key
- [ ] Set `NEXT_PUBLIC_APP_URL` to your production domain (e.g., https://yourdomain.com)
- [ ] Set `NODE_ENV=production`

## Database Setup

- [ ] Create Supabase project
- [ ] Run all migrations in order:
  - [ ] `20240701000000_initial_schema.sql`
  - [ ] `20260701000001_expand_schema.sql`
  - [ ] `20260701000002_add_credit_functions.sql`
- [ ] Verify all tables are created
- [ ] Verify RLS policies are enabled
- [ ] Verify RPC functions are created

## Authentication Setup

- [ ] Configure Supabase Auth providers (Email/Password)
- [ ] Configure OAuth providers (Google, GitHub) if needed
- [ ] Set OAuth redirect URLs to `https://yourdomain.com/auth/callback`
- [ ] Set password reset redirect to `https://yourdomain.com/reset-password`
- [ ] Test email authentication flow
- [ ] Test OAuth flow
- [ ] Test password reset flow

## API Configuration

- [ ] Verify Google Generative AI API key is valid
- [ ] Test API generation endpoint with valid session token
- [ ] Verify credit deduction works correctly
- [ ] Verify history tracking works
- [ ] Test all AI tools at least once

## Security

- [ ] Enable HTTPS on production domain
- [ ] Configure CORS properly if needed
- [ ] Review and update security headers in `next.config.ts`
- [ ] Enable rate limiting on API endpoints
- [ ] Set up monitoring and logging
- [ ] Review Row Level Security (RLS) policies
- [ ] Verify service role key is never exposed to client

## Performance

- [ ] Enable caching headers
- [ ] Optimize images
- [ ] Minify CSS and JavaScript
- [ ] Test page load times
- [ ] Set up CDN for static assets
- [ ] Monitor database query performance

## SEO & Metadata

- [ ] Update site title and description
- [ ] Create sitemap.xml
- [ ] Create robots.txt
- [ ] Add meta tags to all pages
- [ ] Test Open Graph tags
- [ ] Submit sitemap to search engines

## Deployment

- [ ] Build project successfully: `npm run build`
- [ ] Test build output locally
- [ ] Deploy to Vercel or your hosting provider
- [ ] Verify all routes work in production
- [ ] Test authentication flows in production
- [ ] Test API endpoints in production
- [ ] Monitor error logs

## Monitoring & Maintenance

- [ ] Set up error tracking (e.g., Sentry)
- [ ] Set up analytics
- [ ] Set up uptime monitoring
- [ ] Create backup strategy
- [ ] Document deployment process
- [ ] Create runbook for common issues

## Post-Deployment

- [ ] Test all user flows end-to-end
- [ ] Verify email notifications work
- [ ] Monitor performance metrics
- [ ] Check for any console errors
- [ ] Test on multiple devices/browsers
- [ ] Verify SSL certificate is valid

## Documentation

- [ ] Update README with production setup instructions
- [ ] Document API endpoints
- [ ] Document environment variables
- [ ] Create user guide
- [ ] Create admin guide

## Final Checks

- [ ] All critical issues resolved
- [ ] No console errors in production
- [ ] Database backups configured
- [ ] Monitoring and alerts configured
- [ ] Support contact information updated
- [ ] Terms of Service and Privacy Policy updated
