import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// Create a Supabase client with service role for server-side operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the session token
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tool, input } = await request.json();

    if (!tool || !input) {
      return NextResponse.json(
        { error: "Missing required fields: tool, input" },
        { status: 400 }
      );
    }

    // Get user profile to check credits
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("credits, plan")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    // Define credit costs for each tool
    const CREDIT_COSTS: Record<string, number> = {
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
    };

    const creditCost = CREDIT_COSTS[tool] || 5;

    // Check if user has enough credits
    if (profile.credits < creditCost) {
      return NextResponse.json(
        { error: "Insufficient credits", required: creditCost, available: profile.credits },
        { status: 402 }
      );
    }

    let output = "";

    // Route to appropriate AI tool
    switch (tool) {
      case "article-writer":
        output = await generateArticle(input);
        break;
      case "seo-writer":
        output = await generateSEOContent(input);
        break;
      case "ai-chat":
        output = await generateChatResponse(input);
        break;
      case "code-gen":
        output = await generateCode(input);
        break;
      case "blog-writer":
        output = await generateBlogPost(input);
        break;
      case "resume-builder":
        output = await generateResume(input);
        break;
      case "email-writer":
        output = await generateEmail(input);
        break;
      case "social-caption":
        output = await generateSocialCaption(input);
        break;
      case "grammar-checker":
        output = await generateGrammarCheck(input);
        break;
      case "paraphrasing":
        output = await generateParaphrase(input);
        break;
      case "humanizer":
        output = await generateHumanizer(input);
        break;
      case "ai-detector":
        output = await generateAIDetector(input);
        break;
      case "hashtag-gen":
        output = await generateHashtags(input);
        break;
      case "cover-letter":
        output = await generateCoverLetter(input);
        break;
      case "business-name":
        output = await generateBusinessName(input);
        break;
      case "slogan-gen":
        output = await generateSlogan(input);
        break;
      case "instagram-caption":
        output = await generateInstagramCaption(input);
        break;
      case "tiktok-caption":
        output = await generateTikTokCaption(input);
        break;
      case "youtube-title":
        output = await generateYouTubeTitle(input);
        break;
      case "youtube-desc":
        output = await generateYouTubeDescription(input);
        break;
      default:
        output = await generateGenericContent(input, tool);
    }

    // Deduct credits
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ credits: profile.credits - creditCost })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating credits:", updateError);
    }

    // Save to history
    const { error: historyError } = await supabaseAdmin.from("history").insert({
      user_id: user.id,
      tool_id: tool,
      input: input,
      output: { text: output },
    });

    if (historyError) {
      console.error("Error saving to history:", historyError);
    }

    return NextResponse.json({ output, creditsUsed: creditCost });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}

async function generateArticle(input: any): Promise<string> {
  const prompt = `Write a comprehensive article about "${input.topic}" with the following key points: ${input.keyPoints || ""}. 
  Tone: ${input.tone || "professional"}. 
  Language: ${input.language || "English"}.
  Make it at least 1000 words with proper headings and structure.`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateSEOContent(input: any): Promise<string> {
  const prompt = `Create SEO-optimized content for the keyword "${input.keyword}". 
  Include meta title, meta description, and body content.
  Secondary keywords: ${input.secondaryKeywords || ""}.
  Content type: ${input.contentType || "blog post"}.
  Ensure keyword density is 1-2% and include semantic variations.`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateChatResponse(input: any): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(input.message);
  return result.response.text();
}

async function generateCode(input: any): Promise<string> {
  const prompt = `Generate ${input.language || "TypeScript"} code for the following task:
  ${input.prompt}
  Framework: ${input.framework || "None"}
  Include comments and best practices.`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateBlogPost(input: any): Promise<string> {
  const prompt = `Write an engaging blog post about "${input.topic}".
  Target audience: ${input.audience || "general"}.
  Tone: ${input.tone || "conversational"}.
  Include an engaging introduction, 3-5 main sections, and a compelling conclusion.
  Add a call-to-action at the end.`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateResume(input: any): Promise<string> {
  const prompt = `Create a professional resume for:
  Name: ${input.name}
  Experience: ${input.experience}
  Education: ${input.education}
  Skills: ${input.skills}
  Format it in a clean, ATS-friendly manner.`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateEmail(input: any): Promise<string> {
  const prompt = `Write a professional email for the following context:
  Purpose: ${input.purpose}
  Recipient: ${input.recipient}
  Key points: ${input.keyPoints}
  Tone: ${input.tone || "professional"}
  Keep it concise and action-oriented.`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateSocialCaption(input: any): Promise<string> {
  const prompt = `Create an engaging social media caption for ${input.platform}:
  Topic: ${input.topic}
  Tone: ${input.tone || "engaging"}
  Include relevant hashtags and emojis.
  Keep it under 280 characters for Twitter, 2200 for Instagram.`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateGrammarCheck(input: any): Promise<string> {
  const prompt = `Review the following text for grammar, spelling, and punctuation errors. Provide corrections and explanations:
  "${input.text}"`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateParaphrase(input: any): Promise<string> {
  const prompt = `Paraphrase the following text while maintaining its original meaning:
  "${input.text}"
  Style: ${input.style || "formal"}`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateHumanizer(input: any): Promise<string> {
  const prompt = `Rewrite the following text to sound more natural and human-like, as if written by a person:
  "${input.text}"`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateAIDetector(input: any): Promise<string> {
  const prompt = `Analyze the following text and determine if it appears to be written by AI or a human. Provide your assessment and reasoning:
  "${input.text}"`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateHashtags(input: any): Promise<string> {
  const prompt = `Generate 20 relevant hashtags for the following topic or content:
  "${input.topic}"
  Platform: ${input.platform || "general"}`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateCoverLetter(input: any): Promise<string> {
  const prompt = `Write a professional cover letter for:
  Job Title: ${input.jobTitle}
  Company: ${input.company}
  Your Name: ${input.name}
  Your Experience: ${input.experience}
  Key Skills: ${input.skills}`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateBusinessName(input: any): Promise<string> {
  const prompt = `Generate 10 creative business names for:
  Industry: ${input.industry}
  Description: ${input.description}
  Style: ${input.style || "professional"}`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateSlogan(input: any): Promise<string> {
  const prompt = `Create 5 memorable slogans for:
  Business: ${input.business}
  Industry: ${input.industry}
  Values: ${input.values || "quality, innovation"}`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateInstagramCaption(input: any): Promise<string> {
  const prompt = `Create an engaging Instagram caption for:
  Topic: ${input.topic}
  Tone: ${input.tone || "engaging"}
  Include relevant hashtags and emojis.
  Keep it under 2200 characters.`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateTikTokCaption(input: any): Promise<string> {
  const prompt = `Create a viral TikTok caption for:
  Topic: ${input.topic}
  Tone: ${input.tone || "trendy"}
  Include trending hashtags and hooks.
  Keep it catchy and under 150 characters.`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateYouTubeTitle(input: any): Promise<string> {
  const prompt = `Generate 5 high-CTR YouTube video titles for:
  Topic: ${input.topic}
  Keywords: ${input.keywords || ""}
  Style: ${input.style || "engaging"}`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateYouTubeDescription(input: any): Promise<string> {
  const prompt = `Write an optimized YouTube video description for:
  Title: ${input.title}
  Topic: ${input.topic}
  Keywords: ${input.keywords || ""}
  Include timestamps if applicable.`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateGenericContent(input: any, tool: string): Promise<string> {
  const prompt = `Generate content using the ${tool} tool with the following input: ${JSON.stringify(input)}`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}
