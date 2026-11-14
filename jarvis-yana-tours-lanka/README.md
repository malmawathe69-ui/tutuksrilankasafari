# JARVIS AI — Yana Tours Lanka

A free, semi-automatic lead research and customer follow-up dashboard for Yana Tours Lanka.

## Current features
- Opens targeted public-web searches for people discussing Sri Lanka travel plans.
- Lets you manually save a public post URL, customer requirement, country and travel date.
- Labels leads Hot / Warm / Early based on the operator's selected intent.
- Drafts a personalised first response for human review.
- Tracks New / Approved / Contacted / Booked.
- Exports leads to CSV.
- Creates a tagged link to the official Yana Tours Lanka website and a WhatsApp enquiry link.

## Run locally
Open `index.html` in a modern browser. No build step, paid AI API or API key is required.

## Publish on GitHub Pages
1. Open the repository **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Open the **Actions** tab and run **Deploy Yana Tours Lanka JARVIS dashboard** (or push a change inside this folder).
4. After the workflow succeeds, open the Pages URL shown in **Settings → Pages**.

The workflow publishes **only this JARVIS folder**. It does not publish or replace the yellow Tuk Tuk Sri Lanka website files. The GitHub Pages URL still contains the existing repository name because the project currently lives inside that repository. For a completely clean URL, create a separate public repository named `yana-tours-lanka-jarvis` and move this folder's files to its root, or configure a custom subdomain after creating a separate repository.

## Business configuration
- Website: https://www.yanatourslanka.com/
- WhatsApp: configured in `app.js` as `94756360424`.
- Keep the WhatsApp number in international digits with no plus sign or spaces.

## Data and privacy
Leads are stored in this browser's localStorage. They do not synchronise between devices or users. Export CSV regularly for backup. Do not enter sensitive personal information.

## What semi-automatic means
This is a free research and lead-management assistant, not an autonomous AI crawler. It opens searches of publicly accessible/indexed content. You must inspect the post, decide whether it is a genuine travel enquiry, and approve any reply. It does not access private groups, reveal private searchers, scrape private data, or automatically comment, DM, email or post. Platform access and search indexing vary.

## Analytics
The website link includes UTM tags:
- `utm_source=jarvis`
- `utm_medium=organic`
- `utm_campaign=lead_research`

Connect Google Analytics to the business website to measure actual visits and enquiries. JARVIS does not invent website traffic or booking numbers.
