-- INITIAL SCHEMA
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  credits INTEGER DEFAULT 1000,
  plan TEXT DEFAULT 'starter',
  is_admin BOOLEAN DEFAULT FALSE,
  stripe_customer_id TEXT UNIQUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  tool_type TEXT NOT NULL,
  content TEXT,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EXPANDED SCHEMA
-- Add history table
CREATE TABLE IF NOT EXISTS history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  tool_id TEXT NOT NULL,
  input JSONB,
  output JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects ON DELETE CASCADE,
  history_id UUID REFERENCES public.history ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_favorite UNIQUE (user_id, project_id, history_id)
);

-- Add blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES auth.users ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  status TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prices table
CREATE TABLE IF NOT EXISTS prices (
  id TEXT PRIMARY KEY,
  product_id TEXT,
  active BOOLEAN,
  unit_amount BIGINT,
  currency TEXT,
  type TEXT,
  interval TEXT,
  interval_count INTEGER,
  trial_period_days INTEGER,
  description TEXT,
  metadata JSONB,
  name TEXT
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  active BOOLEAN,
  name TEXT,
  description TEXT,
  image TEXT,
  metadata JSONB
);

-- RLS CONFIGURATION
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE history ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- POLICIES
-- Profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Projects
CREATE POLICY "Users can view own projects" ON projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON projects FOR DELETE USING (auth.uid() = user_id);

-- History
CREATE POLICY "Users can view own history" ON history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own history" ON history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own history" ON history FOR DELETE USING (auth.uid() = user_id);

-- Favorites
CREATE POLICY "Users can view own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites" ON favorites FOR DELETE USING (auth.uid() = user_id);

-- Blog Posts
CREATE POLICY "Anyone can view published blog posts" ON blog_posts FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Authors can manage their own blog posts" ON blog_posts FOR ALL USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Admins can manage all blog posts" ON blog_posts FOR ALL USING ((SELECT is_admin FROM profiles WHERE id = auth.uid()) = TRUE) WITH CHECK ((SELECT is_admin FROM profiles WHERE id = auth.uid()) = TRUE);

-- Subscriptions
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscriptions" ON subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own subscriptions" ON subscriptions FOR UPDATE USING (auth.uid() = user_id);

-- Prices & Products
CREATE POLICY "Prices are public" ON prices FOR SELECT USING (TRUE);
CREATE POLICY "Products are public" ON products FOR SELECT USING (TRUE);

-- FUNCTIONS & TRIGGERS
-- Trigger for new user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, credits, plan, is_admin)
  VALUES (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', 1000, 'starter', FALSE);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update profile on subscription change
CREATE OR REPLACE FUNCTION public.handle_subscription_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'active' THEN
    UPDATE public.profiles
    SET plan = (SELECT p.name FROM public.prices p WHERE p.id = NEW.stripe_price_id),
        stripe_customer_id = NEW.stripe_customer_id
    WHERE id = NEW.user_id;
  ELSIF NEW.status = 'canceled' OR NEW.status = 'unpaid' THEN
    UPDATE public.profiles
    SET plan = 'starter'
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_subscription_updated ON public.subscriptions;
CREATE TRIGGER on_subscription_updated
  AFTER INSERT OR UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE PROCEDURE public.handle_subscription_change();
