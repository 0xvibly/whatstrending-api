"""whatstrending.ai API - Python (requests) example. No API key needed.

Run: pip install requests && python examples/client.py
"""
import requests

BASE = "https://whatstrending.ai"


def get(path):
    r = requests.get(f"{BASE}{path}", timeout=15)
    r.raise_for_status()
    return r.json()


def main():
    news = get("/api/articles?limit=3")
    print("Latest AI news:")
    for a in news["data"]:
        print(f"  [{a['category']}] {a['title']} ({a['source']})")

    models = get("/api/models?limit=5")
    print("\nTop AI models:")
    for m in models["data"]:
        print(f"  #{m['rank']} {m['name']} - score {m['score']}, {m['pricing']}")


if __name__ == "__main__":
    main()
