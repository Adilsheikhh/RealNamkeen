# Real Foods — Namkeen & Chips E-commerce Website

A production-oriented, full-stack e-commerce website for an Indian namkeen /
chips manufacturing business.

## Stack

- **Next.js 16 (App Router)** + TypeScript (strict)
- **Tailwind CSS v4** with a premium food-brand design system
- **shadcn/ui**-style components (Button, Card, Badge, Input, etc.)
- **PostgreSQL + Prisma** (wired up; migrations + seed included)
- **Auth.js (v5 beta)** — email/password login + registration
- **Zod + React Hook Form** (checkout, auth)
- Cart persists in `localStorage`; orders are stored in the database

## Status

**Live backend (Phase 2) is wired up.** The storefront reads products and
categories from PostgreSQL via Prisma. Registration, login (Auth.js credentials
provider), checkout order creation, order tracking, customer order history and
admin order/customer/product views all read/write the real database. The
inventory, offers, messages, reports and settings admin screens remain sample
UI.

## Supplied assets

Real business images (18 product photos, 1000×1000) are in
`/public/images/products/` and used on product cards and detail pages:

| # | Product | Size | Price |
|---|---------|------|-------|
| 1 | Palak Murukku | 200g | ₹85 |
| 2 | Rice Murukku | 250g | ₹70 |
| 3 | Garlic Murukku | 200g | ₹65 |
| 4 | Small Murukku | 23 Nos | ₹47 |
| 5 | Chakli Chips | 200g | ₹100 |
| 6 | Ragi Murukku | 200g | ₹65 |
| 7 | Butter Murukku | 200g | ₹65 |
| 8 | Papad Vada (Tomato) | 200g | ₹65 |
| 9 | Masala Murukku | 250g | ₹70 |
| 10 | Ring Murukku | 250g | ₹70 |
| 11 | Murukku | 20 Nos | ₹70 |
| 12 | Big Murukku | 23 Nos | ₹95 |
| 13 | Tomato Murukku | 200g | ₹60 |
| 14 | Polo | 200g | ₹60 |
| 15 | Papad Vada | 200g | ₹65 |
| 16 | Papad Masala | 200g | ₹65 |
| 17 | Achappam | 12 Nos | ₹75 |
| 18 | Small Achappam | 27 Nos | ₹75 |

Hero/lifestyle imagery uses the earlier supplied `murukku-lifestyle.jpg`.
Product descriptions and stock levels are placeholders pending confirmation.

The brand logo (supplied PNG) is used in the header, footer and favicon.

## Getting started

**Prerequisites:** Node 20+, a running PostgreSQL database.

```bash
npm install

# 1. Configure the connection string
cp .env.example .env   # or edit .env directly

# 2. Create/migrate the schema and seed products + admin user
npx prisma migrate dev
npm run db:seed

# 3. Run the app
npm run dev
```

Open http://localhost:3000.

> A local Postgres can be started with Docker:
> `docker run -d --name real-foods-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=real_foods -p 5432:5432 postgres:16-alpine`

### Seed credentials

The seed creates an **admin** account:

| Role | Email | Password |
| ---- | ----- | -------- |
| Admin | `admin@realfoods.in` | `Realfoods@123` |

Change the password after first login (update `prisma/seed.ts` first for
repeatable seeding). New storefront registrations are created with the
`CUSTOMER` role.

## Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start development server             |
| `npm run build`    | Production build                     |
| `npm run lint`     | ESLint                               |
| `npx tsc --noEmit` | Type check                           |
| `npm run db:seed`  | Seed products, categories, admin     |
| `npx prisma studio`| Browse the database in the browser   |

## Database

- `prisma/schema.prisma` — models: User, Address, Category, Product,
  ProductImage, ProductVariant, Cart/CartItem, Order/OrderItem, Payment,
  Message, Offer, Inventory, Review.
- Migrations live in `prisma/migrations/` (apply with `npx prisma migrate dev`).
- `prisma/seed.ts` upserts the catalogue from `src/lib/data/products.ts` (the
  single source of truth for the 18 products) and creates the admin user.
- Server components read via `src/lib/db/` (products, orders); `src/auth.ts`
  handles credentials + JWT sessions.

## Project structure

- `src/app/` — customer routes, `/admin` dashboard, `api/auth`
- `src/app/actions/` — server actions (register, checkout, order lookup/status)
- `src/components/` — UI, product, cart, order, auth, layout, admin components
- `src/lib/data/` — catalogue snapshot (also used to seed the DB, and by the
  client cart for instant line rendering)
- `src/lib/db/` — Prisma-backed async data access
- `src/lib/auth/` — session helpers (`getCurrentUser`, `requireRole`)
- `src/auth.ts` — Auth.js configuration
- `src/types/` — shared domain types
- `prisma/schema.prisma` — database schema