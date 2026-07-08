# Premium AI SaaS Platform

A complete, production-ready AI SaaS web application built with the latest technology stack.

## Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Backend/Auth:** [Supabase](https://supabase.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Features

- **Luxury Design:** Dark-mode first, glassmorphism, premium gradients, and smooth animations.
- **27+ AI Tools:** Comprehensive suite including Article Writer, SEO Optimizer, Resume Builder, Code Generator, and more.
- **Dashboard:** Full-featured user dashboard with analytics, project history, and credit management.
- **Authentication:** Ready-to-use Supabase Auth with Email, Google, and GitHub providers.
- **SEO Optimized:** Meta tags, Open Graph, Twitter Cards, robots.txt, and sitemap.xml included.
- **Responsive:** Fully optimized for all devices (Mobile, Tablet, Desktop).

## Getting Started

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### 2. Installation

```bash
# Clone or extract the project
cd ai-saas-platform

# Install dependencies
npm install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Database Setup

Run the SQL migration found in `supabase/migrations/20240701000000_initial_schema.sql` in your Supabase SQL Editor to set up the database schema and RLS policies.

### 5. Run the Project

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components (layout, landing, dashboard, tools).
- `src/lib`: Utility functions and Supabase client.
- `supabase/migrations`: Database schema and RLS policies.
- `public`: Static assets and SEO files.

## License

This project is licensed under the MIT License.
