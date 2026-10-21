# Iqra City School website

## Run locally

1. Install Node.js (LTS).
2. In the project folder, run `npm install`.
3. Start the development server with `npm run dev`.
4. Create a production build with `npm run build`; preview it with `npm run preview`.

## Deploy to Vercel

Import this project into Vercel and use the detected Vite defaults (`npm run build`, output directory `dist`). The included `vercel.json` rewrites client-side routes so direct visits to pages such as `/academics` work after deployment. Add a custom domain in the Vercel project’s **Settings → Domains** after confirming that the domain is available and configuring its DNS records.

## School information and assets

- Edit the bilingual school details, contact fields, example announcements and gallery in `src/data.js`.
- The supplied official logo is stored at `public/images/iqra-city-logo.jpg` and is displayed at its original proportions without cropping or recoloring.
- Replace the illustrative Unsplash photos with school-approved images when available. The current photos do not depict Iqra City School.
- Replace sample announcements and confirm all placeholder statements before publishing.
- The contact form validates entries and prepares a message in WhatsApp or the visitor’s email app. The visitor must review and send it there; the website does not store messages or confirm delivery.
- The configured WhatsApp number, phone number, Mogadishu location and Facebook link were provided for the site. `info@iqracityschool.com` is a suggested email address and must be verified and configured before relying on email delivery.
