# Real Foods — Namkeen & Chips E-commerce Website

A production-oriented, full-stack e-commerce website for an Indian namkeen /
chips manufacturing business.

## Stack

- **Next.js 16 (App Router)** + TypeScript (strict)
- **Tailwind CSS v4** with a premium food-brand design system
- **shadcn/ui**-style components (Button, Card, Badge, Input, etc.)
- **PostgreSQL + Prisma** (schema prepared; DB not wired up yet)
- **Zod + React Hook Form** (checkout)
- Auth architecture prepared with Auth.js (not implemented yet)

## Status

This is **stage 1**: the storefront and admin UI are built against **mock
data**. Auth, payments, database reads/writes, and live order management are
intentionally deferred to later stages. Everything is structured so mock data
can be swapped for real Prisma queries without rewriting the UI.

## Supplied assets

Real business images are in `real-foods-product-assets/` and copied to
`/public/images`:

- `/images/products/murukku/murukku-pack.jpg` — Traditional Murukku
- `/images/products/achappam/achappam-pack.jpg` — Rose Achappam
- `/images/hero/murukku-lifestyle.jpg` — hero / lifestyle image

Product names, prices, weights, descriptions, ingredients and stock are
**pending business confirmation** — currently realistic placeholders, clearly
marked in the UI.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Production build         |
| `npm run lint`    | ESLint                   |
| `npx tsc --noEmit`| Type check               |

## Database

The Prisma schema in `prisma/schema.prisma` is validated. To start using it:

1. Set a real `DATABASE_URL` in `.env`.
2. `npx prisma migrate dev`
3. Replace the mock reads in `src/lib/data/` with Prisma queries.

## Project structure

- `src/app/` — customer routes + `/admin` dashboard
- `src/components/` — UI, product, cart, order, layout, admin components
- `src/lib/data/` — mock data layer (products, orders)
- `src/lib/auth/` — auth architecture placeholders
- `src/types/` — shared domain types
- `prisma/schema.prisma` — target database schema