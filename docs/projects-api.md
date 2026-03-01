# Projects API Documentation

## Overview

This project consists of:

- **Sanity CMS** (`apps/studio`) – content management
- **Next.js (App Router)** (`apps/web`) – frontend and API routes
- Sanity Content Lake  
  - `projectId: 69m6xw0w`  
  - `dataset: production`

The `/api/projects` endpoint provides paginated project data for frontend rendering.

---

## Content Model: `project`

Sanity document type:

```
_type: "project"
```

### Fields

| Field        | Type | Description |
|--------------|------|------------|
| `title` | Localized string `{ uk, it, en }` | Project title |
| `slug` | `slug.current` | Unique identifier |
| `description` | Localized Portable Text | Rich text content |
| `image` | Image asset | Project image |
| `image.alt` | Localized string `{ uk, it, en }` | Alt text for accessibility |

> Note: `description` is converted to plain text in the API using `pt::text()`.

---

## API Endpoint

### GET `/api/projects`

Returns a paginated list of projects sorted by creation date (newest first).

---

## Example Requests

```
GET /api/projects
GET /api/projects?lang=uk
GET /api/projects?lang=en&page=2&limit=6
```

---

## Query Parameters

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `lang` | `uk` \| `it` \| `en` | `it` | Content language |
| `page` | number | `1` | Page number (1-based) |
| `limit` | number | `6` | Items per page (max 50) |

---

## Language Fallback Strategy

If a field is missing for the selected language, fallback order is:

```
it → en → uk
```

This ensures content is always returned even if translations are incomplete.

---

## Response Format

```json
{
  "page": 1,
  "limit": 6,
  "total": 10,
  "items": [
    {
      "_id": "uuid",
      "slug": "project-slug",
      "createdAt": "2026-03-01T20:52:14Z",
      "title": "Project title",
      "description": "Plain text with \\n\\n paragraphs",
      "imageUrl": "https://cdn.sanity.io/...",
      "imageAlt": "Image alt text"
    }
  ]
}
```

---

## Rendering Description

`description` is returned as plain text.

Recommended React rendering:

```tsx
<p style={{ whiteSpace: "pre-line" }}>
  {description}
</p>
```

This preserves paragraph breaks from `\n\n`.

---

## File Locations

### Sanity Client
```
apps/web/src/lib/sanity.client.ts
```

### API Route
```
apps/web/app/api/projects/route.ts
```

### Sanity Schemas
```
apps/studio/schemaTypes/
```

---

## Architectural Notes

- API layer is implemented using Next.js App Router.
- Portable Text is converted server-side to plain text.
- Pagination is handled at the GROQ query level.
- Sorting is based on `_createdAt desc`.

---

## Possible Future Improvements

- Add `GET /api/projects/[slug]` endpoint
- Add caching or ISR revalidation
- Introduce separate dev/staging datasets
- Add filtering by category or tags
- Add OpenAPI schema documentation

---

## Security Notes

- API does not expose draft content.
- Sanity token is not exposed to the client.
- Image URLs are resolved via Sanity CDN.