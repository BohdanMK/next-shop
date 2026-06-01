# Next Shop

An online food ordering shop built with Next.js 16. Supports product browsing by category, cart management, and order checkout with delivery options.

## Tech Stack

- **Next.js 16** — App Router, server-side rendering
- **React 19** + **TypeScript**
- **TanStack Query** — server state management
- **Zustand** — client state (cart)
- **next-intl** — i18n (Ukrainian)
- **Tailwind CSS v4** + **shadcn/ui**
- **React Hook Form** + **Zod** — form validation

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:e2e` | Run E2E tests headless (Playwright) |
| `npm run test:e2e:ui` | Run E2E tests with Playwright UI |
| `npm run test:e2e:headed` | Run E2E tests in headed mode |
| `npm run test:e2e:report` | Open last Playwright HTML report |

## Testing

### Unit tests — Vitest

Tests live in `src/tests/`. Covers utilities, schema validation, and API helpers.

```bash
npm run test
```

### E2E tests — Playwright

Tests live in `src/tests/e2e/`. Requires the dev server to be running on port 3000.

```bash
# terminal 1
npm run dev

# terminal 2
npm run test:e2e
```

Or use Playwright UI mode for interactive debugging:

```bash
npm run test:e2e:ui
```

All `data-testid` selectors used in E2E tests are documented in [`src/tests/e2e/DATA_TESTIDS.md`](src/tests/e2e/DATA_TESTIDS.md).

## Before Going to Production

- **Error tracking** — integrate [Sentry](https://sentry.io) (`@sentry/nextjs`) to capture client and server errors in real time. Without it there is no visibility into what breaks for real users.
