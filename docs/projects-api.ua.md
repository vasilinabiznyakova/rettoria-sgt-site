# Документація Projects API

## Огляд

Проєкт складається з:

- **Sanity CMS** (`apps/studio`) — система управління контентом
- **Next.js (App Router)** (`apps/web`) — фронтенд та API-маршрути
- Sanity Content Lake  
  - `projectId: 69m6xw0w`  
  - `dataset: production`

Endpoint `/api/projects` надає пагінований список проєктів для відображення на фронтенді.

---

## Модель даних: `project`

Тип документа в Sanity:

```
_type: "project"
```

### Поля

| Поле | Тип | Опис |
|------|-----|------|
| `title` | Локалізований рядок `{ uk, it, en }` | Назва проєкту |
| `slug` | `slug.current` | Унікальний ідентифікатор |
| `description` | Локалізований Portable Text | Rich-text контент |
| `image` | Зображення | Основне зображення |
| `image.alt` | Локалізований рядок `{ uk, it, en }` | Alt-текст для доступності |

> У відповіді API поле `description` конвертується у звичайний текст за допомогою `pt::text()`.

---

## API Endpoint

### GET `/api/projects`

Повертає список проєктів із пагінацією, відсортований за датою створення (новіші — першими).

---

## Приклади запитів

```
GET /api/projects
GET /api/projects?lang=uk
GET /api/projects?lang=en&page=2&limit=6
```

---

## Query-параметри

| Параметр | Тип | За замовчуванням | Опис |
|-----------|------|------------------|------|
| `lang` | `uk` \| `it` \| `en` | `it` | Мова контенту |
| `page` | number | `1` | Номер сторінки (нумерація з 1) |
| `limit` | number | `6` | Кількість елементів на сторінці (макс. 50) |

---

## Стратегія fallback мов

Якщо значення для вибраної мови відсутнє, використовується наступний порядок fallback:

```
it → en → uk
```

Це гарантує повернення контенту навіть за відсутності повного перекладу.

---

## Формат відповіді

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
      "title": "Назва проєкту",
      "description": "Звичайний текст з \\n\\n абзацами",
      "imageUrl": "https://cdn.sanity.io/...",
      "imageAlt": "Alt текст зображення"
    }
  ]
}
```

---

## Рендеринг поля `description`

`description` повертається як звичайний текст.

Рекомендований спосіб рендерингу в React:

```tsx
<p style={{ whiteSpace: "pre-line" }}>
  {description}
</p>
```

Це дозволяє зберегти розбиття на абзаци (`\n\n`).

---

## Розташування файлів

### Sanity Client
```
apps/web/src/lib/sanity.client.ts
```

### API Route
```
apps/web/app/api/projects/route.ts
```

### Схеми Sanity
```
apps/studio/schemaTypes/
```

---

## Архітектурні примітки

- API реалізований через Next.js App Router.
- Конвертація Portable Text у plain text виконується на сервері.
- Пагінація реалізована на рівні GROQ-запиту.
- Сортування здійснюється за `_createdAt desc`.

---

## Можливі покращення

- Додати endpoint `GET /api/projects/[slug]`
- Додати кешування або ISR revalidation
- Розділити `dev` та `production` datasets
- Додати фільтрацію за категоріями або тегами
- Описати API у форматі OpenAPI / Swagger

---

## Безпека

- Draft-контент не експортується через API.
- Sanity token не передається на клієнт.
- Зображення віддаються через Sanity CDN.