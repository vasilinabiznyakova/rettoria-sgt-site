# Rettoria SGT Website

Pro bono multilingual website for Rettoria SGT.  
Built as a monorepo using **Next.js (App Router)** and **Sanity CMS**.

---

## 🏗 Architecture

This project uses an npm workspaces monorepo structure:

```
rettoria-sgt-site/
│
├── apps/
│   ├── web/        # Next.js frontend (App Router + API routes)
│   └── studio/     # Sanity CMS Studio
│
├── docs/           # API documentation
├── scripts/        # Utility scripts (logging, etc.)
│
├── package.json    # Root workspace config
└── README.md
```

---

## 🛠 Tech Stack

- Next.js (App Router)
- Sanity CMS
- TypeScript
- npm Workspaces
- Prettier
- Concurrently (parallel dev processes)

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

---

### 2️⃣ Setup environment variables

Copy values from:

```
.env.example
```

Into:

```
apps/web/.env.local
```

(And configure Sanity variables if needed for Studio.)

---

### 3️⃣ Run development mode

Run both frontend and CMS in parallel:

```bash
npm run dev
```

This runs:

- `apps/web` on http://localhost:3000
- `apps/studio` on http://localhost:3333

Logs are timestamped and prefixed with:

```
[WEB]
[STUDIO]
```

You can also run them separately:

```bash
npm run dev:web
npm run dev:studio
```

---

## 🏗 Build

Build both applications:

```bash
npm run build
```

Or individually:

```bash
npm run build:web
npm run build:studio
```

---

## 🧹 Lint & Format

Lint both apps:

```bash
npm run lint
```

Format code:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

---

## 📡 API Documentation

Projects API documentation:

- Ukrainian: `docs/projects-api.uk.md`
- English: `docs/projects-api.md`

---

## 🌍 Multilingual Support

Supported languages:

- Ukrainian (`uk`)
- Italian (`it`)
- English (`en`)

Language fallback strategy is implemented at API level.

---

## 🔐 Security Notes

- Sanity tokens are not exposed to the client
- Draft content is not returned via API
- Images are delivered via Sanity CDN

---

## 📌 About

This project was developed as a pro bono initiative  
to support Rettoria SGT with a modern multilingual web presence.