import { supabase } from "./supabase";

export const CREDIT_COSTS = {
  "article-writer": 10,
  "seo-writer": 10,
  "blog-writer": 10,
  "ai-chat": 5,
  "code-gen": 15,
  "resume-builder": 10,
  "email-writer": 5,
  "social-caption": 3,
  "grammar-checker": 5,
  "paraphrasing": 5,
  "humanizer": 5,
  "ai-detector": 5,
  "hashtag-gen": 3,
  "cover-letter": 10,
  "business-name": 5,
  "slogan-gen": 5,
  "instagram-caption": 3,
  "tiktok-caption": 3,
  "youtube-title": 3,
  "youtube-desc": 5,
  "json-formatter": 1,
  "password-gen": 1,
  "qr-gen": 1,
  "img-compress": 5,
  "bg-remover": 10,
  "pdf-merge": 5,
  "pdf-split": 5,
  "pdf-compress": 5,
};

export async function getUserCredits(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data?.credits || 0;
}

export async function deductCredits(userId: string, amount: number) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ credits: supabase.rpc("decrement_credits", { amount }) })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function addCredits(userId: string, amount: number) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ credits: supabase.rpc("increment_credits", { amount }) })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function hasEnoughCredits(userId: string, toolId: string) {
  const credits = await getUserCredits(userId);
  const cost = CREDIT_COSTS[toolId as keyof typeof CREDIT_COSTS] || 5;
  return credits >= cost;
}

export function getCreditCost(toolId: string): number {
  return CREDIT_COSTS[toolId as keyof typeof CREDIT_COSTS] || 5;
}

// Plan-based credit limits
export const PLAN_CREDITS = {
  starter: 1000,
  pro: 50000,
  enterprise: Infinity,
};

export const PLAN_PRICES = {
  starter: 0,
  pro: 4900, // $49.00 in cents
  enterprise: 19900, // $199.00 in cents
};
