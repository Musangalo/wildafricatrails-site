# Wild Africa Trails — website

Static website for **wildafricatrails.com**. Plain HTML, CSS and JavaScript — no build step,
no framework, no server. Layout based on the free [Tourly](https://github.com/codewithsadee/tourly)
template by codewithsadee, rebranded and rewritten for Wild Africa Trails.

```
index.html               the whole site
favicon.svg              browser tab icon
robots.txt               lets search engines crawl the site
sitemap.xml              page list for Google Search Console
assets/css/style.css     styles (brand colours are at the top, in :root)
assets/js/script.js      menu, sticky header, WhatsApp enquiry form
assets/images/           logos and photos
```

## 1. Fill in the placeholders — do this before sharing the link

Open `index.html` and search for `[`. Every placeholder looks like `[YOUR PHONE NUMBER]`.

| Placeholder | Where | What to put |
|---|---|---|
| `[YOUR EMAIL]` | footer, schema | Business email |
| `[YOUR STREET ADDRESS]` | footer, schema | Office address |
| `[YOUR PRICE]` | each tour card | Starting price, e.g. `$850` |
| `[YOUR FACEBOOK URL]`, `[YOUR INSTAGRAM URL]`, `[YOUR TRIPADVISOR URL]` | header, schema | Full profile links |
| `[WRITE 3-4 SENTENCES HERE]` | About section | Company story |
| `[DESCRIBE THIS PHOTO]` | gallery `alt` text | What each photo shows — this is read by Google and screen readers |

Already filled in: the phone number **+256 704 048 018** (calls) and WhatsApp **256704048018**,
used in the header, the footer, every "Enquire" button and `WHATSAPP_NUMBER` in `assets/js/script.js`.
If the number ever changes, update it in both `index.html` and `script.js`.

## 2. Replace the photos

**The photos currently in `assets/images/` are stock images from the template. They are not
Uganda and not this company's trips.** Replace them with real photos before launch, keeping the
same file names so nothing else needs changing:

| File | Should show |
|---|---|
| `hero-gorilla.jpg` | Big background image at the top (wide, ~1920px) |
| `dest-bwindi.jpg` | Bwindi forest / gorillas |
| `dest-murchison.jpg` | Murchison Falls |
| `dest-queen-elizabeth.jpg` | Queen Elizabeth NP |
| `tour-gorilla-trek.jpg` | Gorilla trekking tour |
| `tour-murchison.jpg` | Murchison safari tour |
| `tour-nile-rafting.jpg` | Rafting at Jinja |
| `gallery-1 … gallery-5.jpg` | Photos from real trips |
| `social-preview.jpg` | 1200×630 — the picture shown when the link is shared on WhatsApp |

Resize photos to about 1600px wide and save at ~80% quality, so the site stays fast on phone data.

## 3. Run it locally

No build needed. Either open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## 4. Deploy on Cloudflare Pages

The earlier failed build was a **Workers** project (`npx wrangler deploy`). A static site needs a
**Pages** project instead:

1. Push this folder to the GitHub repo, `main` branch.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Choose the repo and set:
   - Framework preset: **None**
   - Build command: *(empty)*
   - Build output directory: `/`
4. Deploy, then open the project's **Custom domains** tab and add `wildafricatrails.com`
   and `www.wildafricatrails.com`. Cloudflare creates the DNS records and SSL certificate itself.

## 5. SEO checklist

Already done in the code:

- Page title and meta description aimed at "gorilla trekking" and "Uganda safari" searches
- Canonical URL, Open Graph and Twitter card tags for link previews
- `TravelAgency` structured data (fill in the phone, email and address placeholders)
- `robots.txt` and `sitemap.xml`
- Lazy-loaded images and descriptive `alt` text

Still to do, in order of impact:

1. **Google Business Profile** — the single biggest win for "safari company near me" searches.
2. **Google Search Console** — verify with a TXT record in Cloudflare DNS, submit the sitemap.
3. **A page per tour** (`/gorilla-trekking-bwindi/`, `/murchison-falls-safari/` …), each with its own
   title, description, photos and price. Google ranks pages, not sites. Add each new page to `sitemap.xml`.
4. **Listings and reviews** — TripAdvisor, SafariBookings, and the AUTO (Association of Uganda Tour
   Operators) directory.
5. **Redirect the old domain** (safiriadventures.com) to this site if it can be recovered.
