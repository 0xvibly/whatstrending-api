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
- **AI model leaderboard** — live rankings ranked by real OpenRouter token volume, with live pricing and context windows.
- **Trending AI tools** — a curated, auto-updated list of notable AI tools.
- **Most-read** — what people are actually reading right now.

All read-only `GET` endpoints. No authentication, CORS enabled, JSON responses.

## Machine-readable pages (markdown mirrors)

Beyond JSON, key pages ship as clean `text/markdown` (CORS enabled, no key) — ideal for AI agents:

- [`/models.md`](https://whatstrending.ai/models.md) — the usage leaderboard as a markdown table.
- [`/news.md`](https://whatstrending.ai/news.md) — recent headlines with sources and links.
- [`/compare/{slug}.md`](https://whatstrending.ai/compare/chatgpt-vs-claude.md) — any comparison page as markdown.

Also new on the site: the [Daily AI Pulse](https://whatstrending.ai/pulse) briefing (top stories, model movers, rising repos, funding — archived per day) and [rising repos](https://whatstrending.ai/repos) with week-over-week star velocity from stored daily snapshots.

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
      "title": "The Atlantic created a searchable database of the music used to train AI",
      "originalTitle": "The Atlantic created a searchable database of the music used to train AI",
      "slug": "the-atlantic-created-a-searchable-database-of-the-music-used-to-train-ai",
      "link": "https://www.theverge.com/ai-artificial-intelligence/953183/the-atlantic-searchable-database-music-ai-training-data",
      "source": "The Verge",
      "category": "Tools",
      "date": "2026-06-20T14:46:48-04:00",
      "sourceType": "full",
      "summary": "Atlantic reporter Alex Reisner uncovered four datasets of music being used to train AI models and made them fully searchable for the public...",
      "coverage": 1,
      "trendScore": 1,
      "sources": ["The Verge"]
    }
  ]
}
```

Each item also carries `coverage` and `trendScore` (numbers indicating how widely the story is being reported and how fast it's trending) and `sources` (array of publication names covering the story). The `date` field is passed through from the source feed, so it may be ISO 8601 (`2026-06-20T14:46:48-04:00`) or RFC 2822 (`Sat, 20 Jun 2026 16:39:57 +0000`).

**Categories** are dynamic and reflect current coverage — commonly `Industry`, `Tools`, `Research`, `Startups`, `Regulation`, `Models`, `Open Source`.

### `GET /api/articles/{slug}` — single article

```bash
curl "https://whatstrending.ai/api/articles/openai-is-bringing-on-some-big-guns-in-the-lead-up-to-its-ipo"
```

Returns one article object in `{ "success": true, "data": { ... } }`. Returns `404` with `{ "success": false, "error": "Article not found" }` if the slug doesn't exist.

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
      "name": "DeepSeek V4 Flash",
      "provider": "DeepSeek",
      "score": 4676,
      "scoreDisplay": "4.68T",
      "tokens": 4676449991973,
      "requests": 362209743,
      "pricing": "$0.09/$0.18",
      "context": "1M",
      "category": "Open Source",
      "change": "0",
      "or": "deepseek/deepseek-v4-flash"
    }
  ]
}
```

The leaderboard is ranked by real OpenRouter usage. `tokens` is the trailing-window token volume routed to the model, `requests` is the request count, and `scoreDisplay` is the human-readable form of `score` (e.g. `"4.68T"`). `pricing` is `$in/$out` per million tokens and `or` is the OpenRouter model id.

### `GET /api/models/{id}` — single model

Look up one model by **id**. The `{id}` is the **name slugified** — lowercased with spaces replaced by hyphens (e.g. `DeepSeek V4 Flash` → `deepseek-v4-flash`). It is **not** the `or`/OpenRouter id; passing that (which contains a `/`) will not match.

```bash
curl "https://whatstrending.ai/api/models/deepseek-v4-flash"
```

```json
{
  "success": true,
  "data": {
    "rank": 1,
    "name": "DeepSeek V4 Flash",
    "provider": "DeepSeek",
    "score": 4676,
    "scoreDisplay": "4.68T",
    "tokens": 4676449991973,
    "requests": 362209743,
    "pricing": "$0.09/$0.18",
    "context": "1M",
    "category": "Open Source",
    "change": "0",
    "or": "deepseek/deepseek-v4-flash"
  }
}
```

Returns `404` with `{ "success": false, "error": "Model not found" }` if no model matches the slug.

### `GET /api/most-read` — most-read articles

```bash
curl "https://whatstrending.ai/api/most-read"
```

```json
{
  "success": true,
  "data": [
    { "slug": "laid-off-oracle-workers-tried-to-negotiate-better-severance-oracle-said-no", "views": 10 },
    { "slug": "my-yard-is-dying-so-i-made-an-app-for-that", "views": 10 }
  ]
}
```

Each entry is `{ slug, views }`, ordered by views. Use the `slug` with `GET /api/articles/{slug}` to fetch the full article.

### `GET /api/awesome-data` — trending AI tools, comparisons & models

```bash
curl "https://whatstrending.ai/api/awesome-data"
```

```json
{
  "generatedAt": "2026-06-21T01:46:39.887Z",
  "site": "https://whatstrending.ai",
  "tools": [
    {
      "name": "Cursor",
      "tagline": "The AI-first code editor",
      "description": "AI-powered code editor built on VS Code with deep integration for code generation, editing, and chat.",
      "url": "https://cursor.com",
      "category": "coding",
      "pricing": "freemium"
    }
  ],
  "comparisons": [
    { "a": "ChatGPT", "b": "Claude", "slug": "chatgpt-vs-claude" }
  ],
  "models": [
    {
      "rank": 1,
      "name": "DeepSeek V4 Flash",
      "provider": "DeepSeek",
      "score": 4676,
      "scoreDisplay": "4.68T",
      "tokens": 4676449991973,
      "requests": 362209743,
      "pricing": "$0.09/$0.18",
      "context": "1M",
      "category": "Open Source",
      "change": "0",
      "or": "deepseek/deepseek-v4-flash"
    }
  ]
}
```

This endpoint returns three collections:

- **`tools`** — curated AI tools, each with `name`, `tagline`, `description`, `url`, `category`, and `pricing` (e.g. `free`, `freemium`, `paid`).
- **`comparisons`** — head-to-head pairs, each `{ a, b, slug }`. The `slug` maps to a comparison page (e.g. `/compare/chatgpt-vs-claude`).
- **`models`** — the same model objects as `GET /api/models` (same 12-field schema).

> Note: `/api/awesome-data` returns `{ generatedAt, site, tools, comparisons, models }` directly (not the `{ success, data }` envelope used by the other endpoints).

---

## Response format

Most endpoints use a consistent envelope:

```json
{ "success": true,  "data": <payload> }
{ "success": false, "error": "Description" }
```

## CORS

All responses send `Access-Control-Allow-Origin: *`, so you can call the API directly from the browser.

## For AI agents / machine-readable

Beyond the JSON API, the site exposes static, machine-readable surfaces meant for LLMs, agents, and feed readers:

| Surface | Format | What it is |
|---------|--------|------------|
| [`/llms.txt`](https://whatstrending.ai/llms.txt) | text | LLM-friendly site summary and intent → page map |
| [`/news.md`](https://whatstrending.ai/news.md) | Markdown | Latest AI news, summarized, with source links |
| [`/models.md`](https://whatstrending.ai/models.md) | Markdown | Model leaderboard as a Markdown table |
| [`/feed.xml`](https://whatstrending.ai/feed.xml) | RSS 2.0 | News feed for RSS readers |
| [`/sitemap.xml`](https://whatstrending.ai/sitemap.xml) | XML | Full sitemap |

These are great if you want a quick, parse-free snapshot without hitting the JSON endpoints.

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
