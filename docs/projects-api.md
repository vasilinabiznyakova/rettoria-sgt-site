
# Projects API Documentation

## Overview

The **Projects API** provides project content for the frontend application.
Content is stored in **Sanity CMS** and retrieved via **Next.js API routes** using GROQ queries.

The API supports:

- multilingual content
- pagination
- language fallback
- project lookup by slug
- optimized image delivery via Sanity CDN

The API is designed to serve frontend pages such as:

/projects  
/projects/[slug]

---

# System Architecture

The application uses a **headless CMS architecture**.

```
             ┌───────────────────────┐
             │       Sanity CMS       │
             │  (Content Lake)        │
             │                        │
             │ project documents      │
             │ localized content      │
             └──────────────┬────────┘
                            │ GROQ Query
                            │
                            ▼
             ┌────────────────────────┐
             │      Next.js API       │
             │   (App Router routes)  │
             │                        │
             │ /api/projects          │
             │ /api/projects/[slug]   │
             └──────────────┬─────────┘
                            │ JSON API
                            │
                            ▼
             ┌────────────────────────┐
             │       Frontend         │
             │      (Next.js)         │
             │                        │
             │ project listing page   │
             │ project detail page    │
             └────────────────────────┘
```

### Responsibilities

| Layer | Responsibility |
|------|---------------|
| Sanity CMS | Stores structured project content |
| Next.js API | Fetches and transforms content |
| Frontend | Renders UI |

---

# Sanity Configuration

Content is stored in **Sanity Content Lake**.

```
projectId: 69m6xw0w
dataset: production
```

Sanity provides:

- structured content storage
- asset hosting
- CDN delivery
- GROQ query language

---

# Content Model

Sanity document type:

```
_type: "project"
```

## Schema Fields

| Field | Type | Description |
|------|------|-------------|
| title | Localized string `{uk,it,en}` | Project title |
| slug | `slug.current` | Unique project identifier |
| description | Portable Text | Rich text content |
| image | Sanity image asset | Project image |
| image.alt | Localized string `{uk,it,en}` | Alt text for accessibility |

---

# Localization

Content supports three languages:

- uk — Ukrainian
- it — Italian
- en — English

### Example Structure

```
title: {
  uk: "Назва проєкту",
  it: "Titolo progetto",
  en: "Project title"
}
```

---

# Language Fallback Strategy

If content is missing for a selected language, fallback order is:

selected language → it → en → uk

Implementation example:

```
coalesce(title[$lang], title.it, title.en, title.uk)
```

---

# API Endpoints

## Get Projects List

### Endpoint

GET /api/projects

Returns a paginated list of projects sorted by creation date.

---

## Query Parameters

| Parameter | Type | Default | Description |
|----------|------|--------|-------------|
| lang | `uk | it | en` | `it` | Content language |
| page | number | 1 | Page number |
| limit | number | 6 | Items per page (max 50) |

---

## Example Requests

```
GET /api/projects
GET /api/projects?lang=uk
GET /api/projects?lang=en&page=2
GET /api/projects?page=1&limit=12
```

---

## Response Example

```json
{
  "page": 1,
  "limit": 6,
  "total": 12,
  "items": [
    {
      "_id": "project-id",
      "slug": "youth-meetings",
      "createdAt": "2026-03-01T20:52:14Z",
      "title": "Youth Meetings",
      "description": "Plain text description...",
      "imageUrl": "https://cdn.sanity.io/images/...",
      "imageAlt": "Youth meeting photo"
    }
  ]
}
```

---

# Get Project by Slug

### Endpoint

GET /api/projects/[slug]

Returns a single project.

---

## Example Requests

```
GET /api/projects/youth-meetings
GET /api/projects/youth-meetings?lang=en
```

---

## Response Example

```json
{
  "_id": "project-id",
  "slug": "youth-meetings",
  "createdAt": "2026-03-01T20:52:14Z",
  "title": "Youth Meetings",
  "description": "Full project description",
  "imageUrl": "https://cdn.sanity.io/images/...",
  "imageAlt": "Community youth meeting"
}
```

---

# Description Rendering

`description` is returned as **plain text**.

Portable Text is converted server-side using:

```
pt::text()
```

Recommended React rendering:

```
<p style={{ whiteSpace: "pre-line" }}>
  {description}
</p>
```

This preserves paragraph breaks from `\n\n`.

---

# GROQ Queries

## Project List Query

```
*[_type == "project"]
  | order(_createdAt desc)
  [$start...$end]
```

## Single Project Query

```
*[_type == "project" && slug.current == $slug][0]
```

---

# File Locations

## Sanity Client

```
apps/web/src/lib/sanity/client.ts
```

## API Routes

```
apps/web/app/api/projects/route.ts
apps/web/app/api/projects/[slug]/route.ts
```

## Sanity Schemas

```
apps/studio/schemaTypes/
```

---

# Security Considerations

The API follows these security practices:

- Sanity API tokens are **not exposed to the client**
- Draft content is **not returned**
- Only public content is accessible
- Images are served via **Sanity CDN**

---

# Performance Considerations

- Pagination is executed inside the GROQ query
- Images are delivered via CDN
- Portable Text is converted server-side

Possible improvements:

- add response caching
- implement ISR revalidation
- add API-level caching headers

---

# Possible Future Improvements

- filtering by category or tag
- project search
- OpenAPI / Swagger documentation
- caching layer
- analytics integration

---

# Example Frontend Usage

Fetch projects list:

```
fetch("/api/projects?lang=it&page=1")
```

Fetch single project:

```
fetch("/api/projects/youth-meetings?lang=en")
```

---

# Summary

The Projects API provides a lightweight interface between **Sanity CMS** and the **Next.js frontend**, enabling:

- structured content management
- multilingual support
- efficient data retrieval
- scalable frontend rendering
