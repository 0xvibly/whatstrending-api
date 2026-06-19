# whatstrending.ai API

**A free, no-auth REST API for real-time AI news, model rankings, and trending tools.**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
![Auth: none](https://img.shields.io/badge/auth-none-brightgreen)
![CORS: enabled](https://img.shields.io/badge/CORS-enabled-brightgreen)
![Format: JSON](https://img.shields.io/badge/format-JSON-orange)

No API key. No signup. Just hit the endpoints. Powered by [whatstrending.ai](https://whatstrending.ai).

```bash
curl "https://whatstrending.ai/api/articles?limit=3"
```

---

## What you get

- **AI news feed** — fresh, summarized, categorized AI/tech news, each linking back to the original source.
- **AI model leaderboard** — live rankings of frontier models with scores, pricing, and context windows.
- **Trending AI tools** — a curated, auto-updated list of notable AI tools.
- **Most-read** — what people are actually reading right now.

All read-only `GET` endpoints. No authentication, CORS enabled, JSON responses.

## Base URL

```
https://whatstrending.ai
```

## Authentication

None. Every endpoint below is public — no key, no header, no signup.

---

## Endpoints

### `GET /api/articles` — list AI news

| Param      | Type   | Default | Description                          |
|------------|--------|---------|--------------------------------------|
| `category` | string | —       | Filter by category (see below)       |
| `limit`    | number | 50      | Max items to return                  |
| `offset`   | number | 0       | Skip N items (pagination)            |

```bash
curl "https://whatstrending.ai/api/articles?category=Tools&limit=2"
```

```json
{
  "success": true,
  "data": [
    {
      "title": "OpenAI Snags Google AI Pioneer Noam Shazeer Ahead of IPO Push",
      "originalTitle": "OpenAI is bringing on some big guns in the lead-up to its IPO",
      "slug": "openai-is-bringing-on-some-big-guns-in-the-lead-up-to-its-ipo",
      "link": "https://techcrunch.com/2026/06/18/...",
      "source": "TechCrunch",
      "category": "Industry",
      "date": "Thu, 18 Jun 2026 19:59:22 +0000",
      "summary": "OpenAI is making two high-profile hires as it prepares for an IPO...",
      "sourceType": "full"
    }
  ]
}
```

**Categories** are dynamic and reflect current coverage — commonly `Industry`, `Tools`, `Research`, `Startups`, `Regulation`, `Models`.

### `GET /api/articles/{slug}` — single article

```bash
curl "https://whatstrending.ai/api/articles/openai-is-bringing-on-some-big-guns-in-the-lead-up-to-its-ipo"
```

Returns one article object in `{ "success": true, "data": { ... } }`. Returns `404` with `{ "success": false }` if the slug doesn't exist.

### `GET /api/models` — AI model leaderboard

| Param   | Type   | Default | Description          |
|---------|--------|---------|----------------------|
| `limit` | number | —       | Max models to return |

```bash
curl "https://whatstrending.ai/api/models?limit=1"
```

```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "name": "Claude Opus 4.6 (Thinking)",
      "provider": "Anthropic",
      "score": 1506,
      "pricing": "$5/$25",
      "context": "1M",
      "category": "Proprietary",
      "change": "0",
      "or": "anthropic/claude-opus-4.6"
    }
  ]
}
```

### `GET /api/most-read` — most-read articles

```bash
curl "https://whatstrending.ai/api/most-read"
```

```json
{ "success": true, "data": [ { "slug": "android-17-launches-with-...", "views": 10 } ] }
```

### `GET /api/awesome-data` — trending AI tools

```bash
curl "https://whatstrending.ai/api/awesome-data"
```

```json
{
  "generatedAt": "2026-06-19T10:05:13.386Z",
  "site": "https://whatstrending.ai",
  "tools": [
    { "name": "Cursor", "tagline": "The AI-first code editor", "description": "..." }
  ]
}
```

> Note: `/api/awesome-data` returns `{ generatedAt, site, tools }` directly (not the `{ success, data }` envelope used by the other endpoints).

---

## Response format

Most endpoints use a consistent envelope:

```json
{ "success": true,  "data": <payload> }
{ "success": false, "error": "Description" }
```

## CORS

All responses send `Access-Control-Allow-Origin: *`, so you can call the API directly from the browser.

## Fair use

There's no hard rate limit today, but please be reasonable — cache responses where you can and don't hammer it. The API is offered free; abuse spoils it for everyone.

## Data & attribution

News items are summarized by AI from publicly available sources; every item includes a `link` and `source` pointing to the original publication — follow those for the full story and credit. Model rankings and tool listings are aggregated and updated automatically. Free to use; a link back to [whatstrending.ai](https://whatstrending.ai) is appreciated.

## Examples

Runnable snippets live in [`examples/`](./examples) — `curl`, JavaScript (`fetch`), and Python (`requests`).

## License

[MIT](./LICENSE) — do whatever you want, no warranty.

---

Built by [whatstrending.ai](https://whatstrending.ai) · the pulse of AI, summarized.
