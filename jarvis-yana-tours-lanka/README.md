# JARVIS AI — Yana Tours Lanka

A free, static lead-research and customer follow-up dashboard.

## What it does
- Opens targeted searches for public conversations about Sri Lanka travel.
- Lets you manually save public post URLs and customer requirements.
- Scores intent as Hot / Warm / Early.
- Generates a contextual reply draft for human review.
- Tracks lead status (New / Approved / Contacted / Booked).
- Exports leads to CSV.
- Creates a tagged website link and WhatsApp enquiry link.

## Run locally
Open `index.html` in a modern browser. No build step, server, paid AI API or API key is required.

## Deploy with GitHub Pages
This project lives in `jarvis-yana-tours-lanka/` inside the repository.
1. In GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/ (root)` only if you move these files to the repository root. Otherwise use the included GitHub Actions workflow if configured, or publish this folder as the Pages artifact.
4. The direct static URL will be `https://malmawathe69-ui.github.io/tutuksrilankasafari/jarvis-yana-tours-lanka/` if the repository's Pages site is enabled and the repository is published under that account.

## Configure WhatsApp
Edit `app.js` and set `CONFIG.whatsappNumber` to your verified business number in international digits, without +, spaces or dashes. Example format: `9477XXXXXXX`. Do not use the example number.

## Data and privacy
Lead records are saved in this browser's localStorage. They are not synchronised between devices. Use **Export CSV** for backups. Do not enter sensitive personal information. Save only information relevant to a public travel enquiry and follow each platform's terms.

## Important limitations
This is a research assistant, not a private-data scraper or autonomous social-media bot. Search results depend on indexing and platform access. It does not know who privately searched Google, cannot guarantee every potential customer is found, and does not automatically post, comment, DM or send email. The operator must review each lead and approve any outreach.

## Analytics
The tagged link uses:
- `utm_source=jarvis`
- `utm_medium=organic`
- `utm_campaign=lead_research`

Use Google Analytics or another website analytics tool to measure visits. Dashboard click counts are not fabricated or inferred.
