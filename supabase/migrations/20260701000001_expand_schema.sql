-- Add history table
CREATE TABLE history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  tool_id TEXT NOT NULL,
  input JSONB,
  output JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own history" ON history
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own history" ON history
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own history" ON history
  FOR DELETE USING (auth.uid() = user_id);

-- Add favorites table
CREATE TABLE favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects ON DELETE CASCADE,
  history_id UUID REFERENCES public.history ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_favorite UNIQUE (user_id, project_id, history_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Add blog_posts table
CREATE TABLE blog_posts (
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

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published blog posts" ON blog_posts
  FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Authors can manage their own blog posts" ON blog_posts
  FOR ALL USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);

-- Add subscriptions table for Stripe integration
CREATE TABLE subscriptions (
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

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Update profiles table to include stripe_customer_id
ALTER TABLE profiles
ADD COLUMN stripe_customer_id TEXT UNIQUE;

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

CREATE TRIGGER on_subscription_updated
  AFTER INSERT OR UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE PROCEDURE public.handle_subscription_change();

-- Create prices table (for Stripe products/prices)
CREATE TABLE prices (
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

ALTER TABLE prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Prices are public" ON prices
  FOR SELECT USING (TRUE);

-- Create products table (for Stripe products)
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  active BOOLEAN,
  name TEXT,
  description TEXT,
  image TEXT,
  metadata JSONB
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are public" ON products
  FOR SELECT USING (TRUE);

-- Admin role for blog management and other admin tasks
ALTER TABLE profiles
ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;

CREATE POLICY "Admins can manage all blog posts" ON blog_posts
  FOR ALL USING ((SELECT is_admin FROM profiles WHERE id = auth.uid()) = TRUE) WITH CHECK ((SELECT is_admin FROM profiles WHERE id = auth.uid()) = TRUE);
