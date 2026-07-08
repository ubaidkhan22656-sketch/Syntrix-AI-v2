-- Create RPC functions for credit management
CREATE OR REPLACE FUNCTION public.increment_credits(user_id UUID, amount INTEGER)
RETURNS INTEGER AS $$
DECLARE
  new_credits INTEGER;
BEGIN
  UPDATE public.profiles
  SET credits = credits + amount
  WHERE id = user_id
  RETURNING credits INTO new_credits;
  
  RETURN COALESCE(new_credits, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.decrement_credits(user_id UUID, amount INTEGER)
RETURNS INTEGER AS $$
DECLARE
  new_credits INTEGER;
BEGIN
  UPDATE public.profiles
  SET credits = GREATEST(0, credits - amount)
  WHERE id = user_id
  RETURNING credits INTO new_credits;
  
  RETURN COALESCE(new_credits, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.increment_credits(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.decrement_credits(UUID, INTEGER) TO authenticated;
