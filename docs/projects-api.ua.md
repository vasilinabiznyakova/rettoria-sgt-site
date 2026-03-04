
# Документація Projects API

## Огляд

**Projects API** надає дані про проєкти для фронтенд‑застосунку.  
Контент зберігається у **Sanity CMS** і отримується через **Next.js API routes** з використанням GROQ‑запитів.

API підтримує:

- багатомовний контент
- пагінацію
- fallback для мов
- отримання проєкту за slug
- оптимізовану доставку зображень через Sanity CDN

API використовується для сторінок фронтенду:

/projects  
/projects/[slug]

---

# Архітектура системи

Застосунок використовує **headless CMS архітектуру**.

```
             ┌───────────────────────┐
             │       Sanity CMS       │
             │   (Content Lake)       │
             │                        │
             │  документи project     │
             │  локалізований контент │
             └──────────────┬────────┘
                            │ GROQ запит
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
             │        Frontend        │
             │       (Next.js)        │
             │                        │
             │ сторінка списку        │
             │ сторінка проєкту       │
             └────────────────────────┘
```

### Відповідальність шарів

| Шар | Відповідальність |
|----|------------------|
| Sanity CMS | Зберігання структурованого контенту |
| Next.js API | Отримання і трансформація контенту |
| Frontend | Відображення інтерфейсу |

---

# Конфігурація Sanity

Контент зберігається у **Sanity Content Lake**.

```
projectId: 69m6xw0w
dataset: production
```

Sanity надає:

- структуроване зберігання контенту
- хостинг медіафайлів
- CDN для швидкої доставки
- мову запитів GROQ

---

# Модель контенту

Тип документа Sanity:

```
_type: "project"
```

## Поля схеми

| Поле | Тип | Опис |
|-----|-----|------|
| title | Локалізований рядок `{uk,it,en}` | Назва проєкту |
| slug | `slug.current` | Унікальний ідентифікатор |
| description | Portable Text | Текст опису |
| image | Sanity image asset | Зображення проєкту |
| image.alt | Локалізований рядок `{uk,it,en}` | Alt‑текст зображення |

---

# Локалізація

Контент підтримує три мови:

- uk — українська
- it — італійська
- en — англійська

### Приклад структури

```
title: {
  uk: "Назва проєкту",
  it: "Titolo progetto",
  en: "Project title"
}
```

---

# Стратегія fallback для мов

Якщо контент відсутній для вибраної мови, використовується наступний порядок:

selected language → it → en → uk

Приклад реалізації:

```
coalesce(title[$lang], title.it, title.en, title.uk)
```

---

# API Endpoints

## Отримати список проєктів

### Endpoint

GET /api/projects

Повертає список проєктів з пагінацією, відсортований за датою створення.

---

## Query параметри

| Параметр | Тип | Значення за замовчуванням | Опис |
|----------|-----|--------------------------|------|
| lang | `uk | it | en` | `it` | Мова контенту |
| page | number | 1 | Номер сторінки |
| limit | number | 6 | Кількість елементів (макс. 50) |

---

## Приклади запитів

```
GET /api/projects
GET /api/projects?lang=uk
GET /api/projects?lang=en&page=2
GET /api/projects?page=1&limit=12
```

---

## Приклад відповіді

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

# Отримати проєкт за slug

### Endpoint

GET /api/projects/[slug]

Повертає один конкретний проєкт.

---

## Приклади запитів

```
GET /api/projects/youth-meetings
GET /api/projects/youth-meetings?lang=en
```

---

## Приклад відповіді

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

# Рендеринг опису

`description` повертається як **звичайний текст**.

Portable Text конвертується на сервері через:

```
pt::text()
```

Рекомендований рендеринг у React:

```
<p style={{ whiteSpace: "pre-line" }}>
  {description}
</p>
```

Це дозволяє зберегти розділення абзаців.

---

# GROQ запити

## Запит списку проєктів

```
*[_type == "project"]
  | order(_createdAt desc)
  [$start...$end]
```

## Запит одного проєкту

```
*[_type == "project" && slug.current == $slug][0]
```

---

# Розташування файлів

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

# Безпека

API дотримується наступних принципів безпеки:

- токени Sanity **не передаються на клієнт**
- чернетки (draft) **не повертаються API**
- доступний лише публічний контент
- зображення доставляються через **Sanity CDN**

---

# Продуктивність

- пагінація виконується всередині GROQ‑запиту
- зображення доставляються через CDN
- Portable Text конвертується на сервері

Можливі покращення:

- кешування відповідей API
- ISR / revalidation
- HTTP caching headers

---

# Можливі майбутні покращення

- фільтрація за категоріями або тегами
- пошук по проєктах
- OpenAPI / Swagger документація
- кешуючий шар
- інтеграція аналітики

---

# Приклад використання на фронтенді

Отримати список проєктів:

```
fetch("/api/projects?lang=it&page=1")
```

Отримати один проєкт:

```
fetch("/api/projects/youth-meetings?lang=en")
```

---

# Підсумок

Projects API забезпечує простий інтерфейс між **Sanity CMS** та **Next.js frontend**, що дозволяє:

- керувати контентом через CMS
- підтримувати кілька мов
- ефективно отримувати дані
- масштабувати рендеринг на фронтенді
