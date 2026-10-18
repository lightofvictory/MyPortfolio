# Jayaprakash — Portfolio

A responsive React + TypeScript portfolio with SCSS, GSAP section reveals, and Lenis smooth scrolling. Animations respect reduced motion and clean up on unmount.

## Develop

```sh
npm install
npm run dev
```

## Verify and build

```sh
npm run lint
npm run build
```

Deploy the generated `dist` directory to Netlify. This workspace does not deploy to the existing Netlify account automatically.

## Content

- Main content: `src/App.tsx`
- Design and responsive styles: `src/styles.scss`
- Portrait: `public/images/jayaprakash.png`
- Printable resume: `public/resume.html` (open and choose Print / Save as PDF)

The real-estate preview is an explicitly labeled CSS illustration, not a captured project screenshot. Replace it with a genuine screenshot when available. No GitHub profile or source links were supplied, so none are fabricated. Resume experience claims are limited to the supplied information; review before use.

## Contact form email delivery

The contact form submits to Web3Forms without opening an email app. Create a Web3Forms access key for the Gmail inbox that should receive submissions at https://web3forms.com/.

Copy `.env.example` to `.env.local`, set `VITE_WEB3FORMS_ACCESS_KEY`, and restart `npm run dev`. Set the same variable in your hosting build environment before deploying. The inbox is determined by the Web3Forms key. No Gmail password or SMTP credentials are needed.

Without a configured key, submissions show a setup error and keep the visitor's message. The form includes a honeypot, loading and error states, and resets only after Web3Forms confirms success.
