#!/usr/bin/env python3
"""
Twitter/X API helper using OAuth 1.0a
Usage:
  python3 twitter-api.py tweet "Hello world"
  python3 twitter-api.py reply <tweet_id> "Reply text"
  python3 twitter-api.py like <tweet_id>
  python3 twitter-api.py retweet <tweet_id>
  python3 twitter-api.py delete <tweet_id>
  python3 twitter-api.py bio "New bio text"
  python3 twitter-api.py dm <user_id> "Message text"
  python3 twitter-api.py dm-conv <conversation_id> "Message text"
"""

import sys, time, hashlib, hmac, urllib.parse, secrets, base64, http.client, json

# Credentials
AK = "qx7UevJ9Ik8VcGTU9wHlgynna"
AKS = "Sr6poxYJESoYctndEufjjtjXgXUGz1urinA8K8ADw0yLtcoDt6"
AT = "2013700835654672388-HUnMlIBkv1KiSKSSjFU3m68gffRHl1"
ATS = "pYBAUzVjP4wWesaymDq4EQ3ddlcHqq7LRGoXTeZHJOJVP"

def oauth_sign(method, url, extra_params=None):
    ts = str(int(time.time()))
    nonce = secrets.token_hex(16)
    oauth = {
        "oauth_consumer_key": AK, "oauth_nonce": nonce,
        "oauth_signature_method": "HMAC-SHA1", "oauth_timestamp": ts,
        "oauth_token": AT, "oauth_version": "1.0"
    }
    all_p = {**oauth, **(extra_params or {})}
    ps = "&".join(f"{urllib.parse.quote(k, safe='')}={urllib.parse.quote(str(v), safe='')}" for k, v in sorted(all_p.items()))
    bs = f"{method}&{urllib.parse.quote(url, safe='')}&{urllib.parse.quote(ps, safe='')}"
    sk = f"{urllib.parse.quote(AKS, safe='')}&{urllib.parse.quote(ATS, safe='')}"
    sig = base64.b64encode(hmac.new(sk.encode(), bs.encode(), hashlib.sha1).digest()).decode()
    oauth["oauth_signature"] = sig
    return "OAuth " + ", ".join(f'{k}="{urllib.parse.quote(v, safe="")}"' for k, v in oauth.items())

def api_call(method, path, body=None, content_type="application/json", host="api.twitter.com", form_params=None):
    auth = oauth_sign(method, f"https://{host}{path}", form_params)
    conn = http.client.HTTPSConnection(host)
    headers = {"Authorization": auth, "Content-Type": content_type}
    b = json.dumps(body) if body and content_type == "application/json" else body
    conn.request(method, path, body=b, headers=headers)
    r = conn.getresponse()
    data = json.loads(r.read().decode())
    return r.status, data

def tweet(text, reply_to=None):
    body = {"text": text}
    if reply_to:
        body["reply"] = {"in_reply_to_tweet_id": reply_to}
    status, data = api_call("POST", "/2/tweets", body)
    if "data" in data:
        tid = data["data"]["id"]
        print(f"✅ https://x.com/AxiomBot/status/{tid}")
    else:
        print(f"❌ {data}")

def like(tweet_id):
    status, data = api_call("POST", f"/2/users/2013700835654672388/likes", {"tweet_id": tweet_id})
    print("✅ Liked" if data.get("data", {}).get("liked") else f"❌ {data}")

def retweet(tweet_id):
    status, data = api_call("POST", f"/2/users/2013700835654672388/retweets", {"tweet_id": tweet_id})
    print("✅ Retweeted" if data.get("data", {}).get("retweeted") else f"❌ {data}")

def delete(tweet_id):
    status, data = api_call("DELETE", f"/2/tweets/{tweet_id}")
    print("✅ Deleted" if data.get("data", {}).get("deleted") else f"❌ {data}")

def bio(text):
    form = urllib.parse.urlencode({"description": text}, quote_via=urllib.parse.quote)
    auth = oauth_sign("POST", "https://api.twitter.com/1.1/account/update_profile.json", {"description": text})
    conn = http.client.HTTPSConnection("api.twitter.com")
    conn.request("POST", "/1.1/account/update_profile.json", body=form, headers={
        "Authorization": auth, "Content-Type": "application/x-www-form-urlencoded"
    })
    r = conn.getresponse()
    data = json.loads(r.read().decode())
    print(f"✅ Bio: {data.get('description', data)}")

def dm(recipient_id, text):
    """Send a DM using Twitter API v2"""
    # v2 DM endpoint
    body = {
        "text": text,
        "participant_ids": [recipient_id]
    }
    status, data = api_call("POST", "/2/dm_conversations", body)
    if status == 201 or "data" in data:
        print(f"✅ DM sent to {recipient_id}")
        if "data" in data:
            print(f"   Conversation: {data['data'].get('dm_conversation_id', 'unknown')}")
    elif status == 403:
        print(f"❌ DM failed (403): No permission. Need elevated API access or user doesn't allow DMs.")
        print(f"   Details: {data}")
    else:
        print(f"❌ DM failed ({status}): {data}")

def dm_to_conversation(conversation_id, text):
    """Send a DM to existing conversation"""
    body = {"text": text}
    status, data = api_call("POST", f"/2/dm_conversations/{conversation_id}/messages", body)
    if status == 201 or "data" in data:
        print(f"✅ DM sent to conversation {conversation_id}")
    else:
        print(f"❌ DM failed ({status}): {data}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    
    cmd = sys.argv[1]
    if cmd == "tweet":
        tweet(sys.argv[2])
    elif cmd == "reply":
        tweet(sys.argv[3], reply_to=sys.argv[2])
    elif cmd == "like":
        like(sys.argv[2])
    elif cmd == "retweet":
        retweet(sys.argv[2])
    elif cmd == "delete":
        delete(sys.argv[2])
    elif cmd == "bio":
        bio(sys.argv[2])
    elif cmd == "dm":
        dm(sys.argv[2], sys.argv[3])
    elif cmd == "dm-conv":
        dm_to_conversation(sys.argv[2], sys.argv[3])
    else:
        print(f"Unknown command: {cmd}")
        print(__doc__)
