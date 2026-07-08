# API Documentation

## Authentication

All authenticated endpoints require a valid user ID in the request body.

## Endpoints

### Content Generation

#### POST /api/generate

Generate content using AI tools.

**Request:**
```json
{
  "tool": "article-writer",
  "input": {
    "topic": "The future of AI",
    "keyPoints": "machine learning, automation",
    "language": "en",
    "tone": "professional"
  },
  "userId": "user-id-here"
}
```

**Response:**
```json
{
  "output": "Generated content here..."
}
```

**Supported Tools:**
- `article-writer` - Generate long-form articles
- `seo-writer` - Generate SEO-optimized content
- `blog-writer` - Generate blog posts
- `ai-chat` - Chat with AI
- `code-gen` - Generate code
- `resume-builder` - Create resumes
- `email-writer` - Write professional emails
- `social-caption` - Create social media captions
- And 19+ more...

**Credit Costs:**
- Most tools: 5-15 credits
- Premium tools: 10-15 credits
- Basic tools: 1-5 credits

---

### Blog Management

#### GET /api/blog

Get published blog posts.

**Query Parameters:**
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Posts per page (default: 10)

**Response:**
```json
[
  {
    "id": "post-id",
    "title": "Post Title",
    "slug": "post-slug",
    "content": "Post content...",
    "image_url": "https://...",
    "published_at": "2024-07-01T00:00:00Z",
    "is_published": true
  }
]
```

#### POST /api/blog

Create a new blog post (admin only).

**Request:**
```json
{
  "title": "New Blog Post",
  "slug": "new-blog-post",
  "content": "Post content...",
  "imageUrl": "https://...",
  "userId": "admin-user-id"
}
```

**Response:**
```json
{
  "id": "post-id",
  "title": "New Blog Post",
  "slug": "new-blog-post",
  "content": "Post content...",
  "image_url": "https://...",
  "is_published": false,
  "created_at": "2024-07-01T00:00:00Z"
}
```

---

### Stripe Payments

#### POST /api/stripe/checkout

Create a checkout session.

**Request:**
```json
{
  "priceId": "price_1234567890",
  "userId": "user-id-here"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_1234567890"
}
```

#### POST /api/stripe/webhook

Stripe webhook handler (automatic).

**Handled Events:**
- `customer.subscription.updated`
- `customer.subscription.created`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 402 Payment Required
```json
{
  "error": "Insufficient credits"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to generate content"
}
```

---

## Rate Limiting

- Generation requests: 100 per hour per user
- Blog requests: 1000 per hour per IP
- Stripe requests: Handled by Stripe

---

## Authentication Methods

### Email/Password
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password"
});
```

### Google OAuth
```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "google"
});
```

### GitHub OAuth
```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "github"
});
```

---

## Database Queries

### Get User Profile
```typescript
const { data } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", userId)
  .single();
```

### Get User Credits
```typescript
const { data } = await supabase
  .from("profiles")
  .select("credits")
  .eq("id", userId)
  .single();
```

### Get User History
```typescript
const { data } = await supabase
  .from("history")
  .select("*")
  .eq("user_id", userId)
  .order("created_at", { ascending: false });
```

### Get User Subscription
```typescript
const { data } = await supabase
  .from("subscriptions")
  .select("*")
  .eq("user_id", userId)
  .single();
```

---

## Webhooks

### Stripe Webhook

Configure at: https://dashboard.stripe.com/webhooks

**URL:** `https://your-domain.com/api/stripe/webhook`

**Events:**
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

---

## Examples

### Generate an Article
```typescript
const response = await fetch("/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    tool: "article-writer",
    input: {
      topic: "AI in 2026",
      keyPoints: "innovation, ethics",
      language: "en",
      tone: "professional"
    },
    userId: "user-123"
  })
});

const { output } = await response.json();
console.log(output);
```

### Create a Blog Post
```typescript
const response = await fetch("/api/blog", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "My First Post",
    slug: "my-first-post",
    content: "Post content...",
    imageUrl: "https://...",
    userId: "admin-123"
  })
});

const post = await response.json();
console.log(post);
```

### Checkout
```typescript
const response = await fetch("/api/stripe/checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    priceId: "price_pro",
    userId: "user-123"
  })
});

const { sessionId } = await response.json();
// Redirect to Stripe checkout
```
