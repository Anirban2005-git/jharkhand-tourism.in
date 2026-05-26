import requests


def get_first_working(bases, path):
    for base in bases:
        try:
            url = f"{base}{path}"
            r = requests.get(url, timeout=5)
            if r.status_code == 200:
                return base, r
        except Exception:
            pass
    return None, None


def main():
    candidates = [
        "http://127.0.0.1:8001",
        "http://localhost:8001",
        "http://127.0.0.1:8000",
        "http://localhost:8000",
    ]

    base, res = get_first_working(candidates, "/attractions")
    if not base:
        print("❌ No backend responding on 8001/8000 for /attractions")
        return
    data = res.json()
    print(f"✅ API {base}/attractions OK - {len(data)} attractions")

    # destinations
    _, res2 = get_first_working([base], "/destinations")
    if res2 is not None:
        d = res2.json()
        print(f"✅ {base}/destinations OK - {len(d.get('destinations', []))} destinations")

    # frontend serving
    _, home = get_first_working([base], "/")
    if home is not None and "text/html" in home.headers.get("content-type", ""):
        print(f"✅ Frontend served at {base}/")
    _, web = get_first_working([base], "/web/")
    if web is not None and "text/html" in web.headers.get("content-type", ""):
        print(f"✅ Frontend served at {base}/web/")


if __name__ == "_main_":
    main()