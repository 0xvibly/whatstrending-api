#!/usr/bin/env bash
# whatstrending.ai API — curl examples. No API key needed.
set -euo pipefail
BASE="https://whatstrending.ai"

echo "# Latest 3 AI news articles"
curl -s "$BASE/api/articles?limit=3" | jq '.data[] | {title, source, category}'

echo "# Filter by category"
curl -s "$BASE/api/articles?category=Tools&limit=3" | jq '.data[].title'

echo "# Top 5 ranked AI models"
curl -s "$BASE/api/models?limit=5" | jq '.data[] | {rank, name, score, pricing}'

echo "# Most-read right now"
curl -s "$BASE/api/most-read" | jq '.data[:5]'

echo "# Trending AI tools"
curl -s "$BASE/api/awesome-data" | jq '.tools[:5] | .[].name'
