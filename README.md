# XOM3 Documentation

Official documentation site for **XOM3 (Xtension of Me)** - the AI automation platform that extends your capabilities.

## Live Site

- Production: [https://xom3.org](https://xom3.org)

## Pages

- **Home** (`/`) - Landing page with platform overview
- **Getting Started** (`/getting-started`) - Setup guide and core concepts
- **Features** (`/features`) - Platform capabilities and integrations
- **API Reference** (`/api-reference`) - Complete REST API documentation
- **Pricing** (`/pricing`) - Plan comparison and pricing details
- **FAQ** (`/faq`) - Frequently asked questions

## Tech Stack

- Pure HTML, CSS, JavaScript (no framework)
- Inter font from Google Fonts
- Deployed on Vercel

## Brand Guidelines

- **Primary Color (Cyan):** `#00D9FF`
- **Secondary Color (Purple):** `#7C3AED`
- **Dark Background:** `#050508`, `#0a0a0f`
- **Font:** Inter

## Local Development

```bash
# Install dependencies (optional, for local server)
npm install

# Start local server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deployment

The site auto-deploys to Vercel on push to `main` branch.

### Manual Deploy

```bash
vercel --prod
```

## DNS Configuration (Hostinger)

| Type  | Name | Value                   |
|-------|------|-------------------------|
| A     | @    | 76.76.21.21            |
| CNAME | www  | cname.vercel-dns.com   |

## License

MIT
