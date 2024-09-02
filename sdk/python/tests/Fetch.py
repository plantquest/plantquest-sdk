
import json

def fetch(url, config):
    parts = url.split("/")
    # print('parts: ', parts)
    entname = None
    entid = None

    try:
        # TODO: PARTS DEPEND ON THE SWAGGERS: add logic
        # A utility for url parsing is needed
        entname = parts[1]
        entid = parts[2]
    except IndexError:
        pass

    data = json.loads(config.get("body") or "{}")
    method = config.get("method") or "GET"

    req = {
        "url": url,
        "parts": parts,
        "entname": entname,
        "entid": entid,
        "method": method,
        "data": data,
    }

    json_data = None
    if "GET" == method:
        if None != entid:
            json_data = {"id": entid, "title": "T01"}
        else:
            json_data = {
                "name": entname,
                "list": [{"id": "n01", "title": "N01"}, {"id": "n02", "title": "N02"}],
            }
    elif "PUT" == method or "POST" == method:
        if None != entid:
            json_data = { "id": entid, "title": data.get('title') }
        else:
            json_data = { "id": "n03", "title": data.get('title') or "T03" }

    return {"req": req, "status": 200, "json": json_data}
