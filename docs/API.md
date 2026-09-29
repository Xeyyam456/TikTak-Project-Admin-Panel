# API Reference

Endpoints the admin panel calls. Base URL: `VITE_API_BASE_URL` (see `.env.example`).
Client code: `src/services/*.ts`. Types: `src/types/`.

> Reconstructed from the frontend service layer and types — verify against the live backend before relying on details not exercised by the UI.

## 1. Conventions

**Envelope.** Most responses are `{ message, data, result }`. `axiosInstance.ts` unwraps this so services resolve to `data` directly. If the body has no `data` key (e.g. `GET /orders/admin/stats`), the raw body is returned.

**Paginated lists.** A response that paginates puts `pagination` as a *sibling* of `data`: `{ message, data, pagination, result }`. The client returns `{ data, pagination }` in that case.

```ts
pagination: { next: number | null, prev: number | null, current: number, total: number, totalPages: number }
```

**Auth.** Every request except login sends `Authorization: Bearer <access_token>`. On `401` the client calls `POST /auth/refresh` once (concurrent 401s share one refresh), retries the original request once, and logs out if the refresh fails. Login opts out of this (`skipAuthRetry`).

**Errors.** Backend error messages are in English and are *not* shown. The client maps the HTTP status to a fixed Azerbaijani message (`STATUS_MESSAGES` in `axiosInstance.ts`).

**URL quirk.** Category / Product / Campaign **create** use a *singular* path (`/admin/category`); **list / update / delete** use the plural (`/admin/categories/:id`). This is real backend behavior.

**Pagination support.** Only `GET /admin/products` honors `page` / `limit` / `search`. All other list endpoints ignore them and return the full list.

## 2. Auth

### `POST /auth/admin/login`
Body: `{ phone: string, password: string }`
Response: `{ tokens: { access_token, refresh_token }, profile: Profile }`

### `POST /auth/refresh`
Exchanges the stored refresh token for a new access token. Called automatically on `401`.

### `GET /admin/profile`
Response: `Profile`

```ts
Profile { id, full_name, phone, address: string|null, img_url: string|null, role: string, created_at }
```

## 3. Categories

| Method | Path | Body | Response |
|---|---|---|---|
| GET | `/admin/categories` | – | `CategoryApi[]` |
| POST | `/admin/category` | `CategoryPayload` | `CategoryApi` |
| PUT | `/admin/categories/:id` | `CategoryPayload` | `CategoryApi` |
| DELETE | `/admin/categories/:id` | – | `null` |

```ts
CategoryApi { id, name, img_url, description, created_at }
CategoryPayload { name, description, img_url }
```
Deleting a category still used by products fails with `400`/`422`.

## 4. Products

| Method | Path | Body / Query | Response |
|---|---|---|---|
| GET | `/admin/products` | `?page&limit&search` | `{ data: ProductApi[], pagination }` |
| POST | `/admin/product` | `ProductPayload` | `ProductApi` |
| PUT | `/admin/products/:id` | `ProductPayload` | `ProductApi` |
| DELETE | `/admin/products/:id` | – | `null` |

```ts
ProductApi { id, title, description, price: string, type: ProductType,
             img_url, category: { id, name } | null, created_at }
ProductPayload { title, description, price: string, type: ProductType, img_url, category_id: number }
ProductType = 'kg'|'gr'|'litre'|'ml'|'meter'|'cm'|'mm'|'piece'|'packet'|'box'
```
The list is returned newest-first. Deleting a product used by existing orders fails with `400`/`422`.

## 5. Campaigns

| Method | Path | Body | Response |
|---|---|---|---|
| GET | `/admin/campaigns` | – | `CampaignApi[]` |
| POST | `/admin/campaign` | `CampaignPayload` | `CampaignApi` |
| PUT | `/admin/campaigns/:id` | `CampaignPayload` | `CampaignApi` |
| DELETE | `/admin/campaigns/:id` | – | `null` |

```ts
CampaignApi { id, title, img_url, description, created_at }
CampaignPayload { title, description, img_url }
```

## 6. Users (read-only)

### `GET /admin/users`
Response: `UserApi[]`

```ts
UserApi { id, full_name, phone, address: string|null, img_url: string|null,
          role: 'ADMIN' | 'COMMERCE', created_at }
```

## 7. Upload

### `POST /upload`
`multipart/form-data` with a single `file` field.
Response: `{ url: string }` — use this as `img_url` in create/update payloads.

## 8. Orders

### 8.1 `GET /orders/admin`
Response: `OrderApi[]` (camelCase fields, unlike the other resources)

```ts
OrderApi { id, orderNumber, total: string, deliveryFee: string, paymentMethod,
           status: OrderStatus, note, address, phone, createdAt, updatedAt,
           user?: {...} | null, items?: OrderItemApi[] }
OrderItemApi { id, quantity, total_price: string, product?: { id, title, img_url,
               description, price, type, created_at, category: {id,name}|null } }
OrderStatus = 'PENDING'|'CONFIRMED'|'PREPARING'|'READY'|'DELIVERED'|'CANCELLED'
```
`user` and `items` are present on the list response but absent on the status-update response.

### 8.2 `GET /orders/admin/stats`
Response (no envelope, may omit counters such as `CANCELLED`):

```ts
{ TOTAL, DELIVERED, PENDING, PREPARING, CANCELLED, TOTAL_REVENUE }  // all numbers, any may be missing
```
The Orders page computes per-status counts from the order list itself and uses this endpoint only as a supplement.

### 8.3 `PUT /orders/admin/:id/status`
Body: `{ status: OrderStatus }`
Response: `OrderApi` (without `user`)

## 9. Status-code → message mapping

Handled centrally in `src/services/axiosInstance.ts` (`getErrorMessage`). Special cases:
- `401` on login → wrong phone/password; `401` elsewhere → session expired.
- `400`/`422` on `DELETE /admin/products/:id` and `DELETE /admin/categories/:id` → "still in use" messages.
