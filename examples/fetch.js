// whatstrending.ai API — JavaScript (fetch) example. No API key needed.
// Run: node examples/fetch.js   (Node 18+ has global fetch)

const BASE = "https://whatstrending.ai";

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
  return res.json();
}

async function main() {
  const news = await get("/api/articles?limit=3");
  console.log("Latest AI news:");
  for (const a of news.data) console.log(`  [${a.category}] ${a.title} (${a.source})`);

  const models = await get("/api/models?limit=5");
  console.log("\nTop AI models:");
  for (const m of models.data) console.log(`  #${m.rank} ${m.name} — score ${m.score}, ${m.pricing}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
