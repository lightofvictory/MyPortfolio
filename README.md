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

## Project structure

```text
src/
  App.tsx                 Application entry component
  main.tsx                React bootstrap
  pages/portfolio/        Portfolio page and section composition
  components/             Section and layout components, with local SCSS
  hooks/                  State, browser events, forms, and animation lifecycles
  content/                Portfolio content, lists, navigation, and content types
  shared/
    components/           Components reused across sections
    services/             Shared browser preferences and audio service
    technologyLogos.ts    Technology logo configuration
  services/               Contact submission API
  utils/                  Pure carousel and DOM layout helpers
  styles/                 Global CSS and SCSS
  assets/                 Imported portrait images
```

The page imports content and passes it through typed props to the sections. Section components
render the UI; hooks manage interactions and clean up event listeners, timers, requests, and
animations. The shared preferences service keeps theme and sound settings synchronized.

- Edit portfolio data in `src/content/`.
- Add or reorder sections in `src/pages/portfolio/PortfolioPage.tsx`.
- Keep a section's styles beside its component; use `src/styles/` for global styles.
- Put reusable UI in `src/shared/components/`, stateful behavior in `src/hooks/`, and pure
  calculations in `src/utils/`.
- Imported portraits live in `src/assets/`; public images keep their existing URLs.
- Printable resume: `public/resume.html` (open and choose Print / Save as PDF).

The real-estate preview is an explicitly labeled CSS illustration, not a captured project screenshot. Replace it with a genuine screenshot when available. No GitHub profile or source links were supplied, so none are fabricated. Resume experience claims are limited to the supplied information; review before use.

## Contact form email delivery

The contact form submits to Web3Forms without opening an email app. Create a Web3Forms access key for the Gmail inbox that should receive submissions at https://web3forms.com/.

Copy `.env.example` to `.env.local`, set `VITE_WEB3FORMS_ACCESS_KEY`, and restart `npm run dev`. Set the same variable in your hosting build environment before deploying. The inbox is determined by the Web3Forms key. No Gmail password or SMTP credentials are needed.

Without a configured key, submissions show a setup error and keep the visitor's message. The form includes a honeypot, loading and error states, and resets only after Web3Forms confirms success.

## Contact message limit

Each sender email can send five successful messages per one-hour window, starting with the
first successful send. The sixth attempt is blocked and displays a dismissible toast with the
live countdown in minutes and seconds. The countdown toast stays visible until dismissed and
shows when the allowance resets. Failed requests do not count, and the message stays in the form when blocked.
Email matching ignores capitalization and surrounding spaces. Limits are stored in localStorage
and submissions are serialized across tabs in browsers supporting Web Locks. If storage is
unavailable, the limit lasts for the current page session.

This is a browser-side limit, not a server-enforced quota: another browser/device, cleared
storage, or direct Web3Forms requests can bypass it. A shared backend is required to enforce
five messages per email across all devices.

Verify the limit without sending real emails:

```sh
node --experimental-strip-types --test tests/contactLimit.test.mjs
```
