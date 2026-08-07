# Tiktak | Admin API Endpoints

Split from API_ENDPOINTS.md (admin scope only).

# Tiktak | E-commerce Api's | Stage 3-4 Final

Auto-generated from Postman collection.

# API BASE URL

`https://api.sarkhanrahimli.dev/api/tiktak`

# API HEADER for All request

`headers:{
"Autharzation":`Bearer ${your_access_token}`,
"Content-Type":"application/json"
}`

# Admin

## Auth

#### login

`POST {{BASE_URL}}/api/tiktak/auth/admin/login`

**Request body:**

```json
{
  "phone": "+994105554422",
  "password": "Admin1234"
}
```

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": {
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTQxMDU1NTQ0MjIiLCJzdWIiOjIsImlhdCI6MTc0OTcyMTcyNywiZXhwIjoxNzQ5NzY0OTI3fQ.MZwaJo0_2I3xQ5u_TFZZw3CBeFSG0VSrWnBzSsI6bjs",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTQxMDU1NTQ0MjIiLCJzdWIiOjIsImlhdCI6MTc0OTcyMTcyNywiZXhwIjoxNzQ5ODA4MTI3fQ.uXytzai0SrpA6RH_kM32JolZO7B3aQjJOHFum2Oo9a0"
    },
    "profile": {
      "id": 2,
      "full_name": "Tiktak Admin",
      "phone": "+994105554422",
      "address": null,
      "img_url": null,
      "role": "ADMIN",
      "created_at": "2025-06-12T05:44:27.813Z"
    }
  },
  "result": true
}
```

## Profile

#### profile

`GET {{BASE_URL}}/api/tiktak/admin/profile`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": {
    "id": 2,
    "full_name": "Tiktak Admin",
    "phone": "+994105554422",
    "address": null,
    "img_url": null,
    "role": "ADMIN",
    "created_at": "2025-06-12T05:44:27.813Z"
  },
  "result": true
}
```

## Users

#### list

`GET {{BASE_URL}}/api/tiktak/admin/users`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": [
    {
      "id": 3,
      "full_name": "John Doe",
      "phone": "+994516667766",
      "address": null,
      "img_url": null,
      "role": "COMMERCE",
      "password": "$2b$10$kh8thM3wx1FaiBPLkAivBu17usbcvgaDhlBPpO2D2gteGo0ZvgP/m",
      "created_at": "2025-06-12T05:47:24.588Z"
    }
  ],
  "result": true
}
```

## Category

#### create

`POST {{BASE_URL}}/api/tiktak/admin/category`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "name": "Category-1",
  "description": "Lorem",
  "img_url": "" /* OPTIONALY */
}
```

**Response (201 Created):**

```json
{
  "message": "Ok",
  "data": {
    "name": "Category-1",
    "img_url": "",
    "description": "Lorem",
    "id": 11,
    "created_at": "2025-06-12T06:09:47.830Z"
  },
  "result": true
}
```

#### update

`PUT {{BASE_URL}}/api/tiktak/admin/categories/11`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "name": "Category-1",
  "description": "Lorem dsadas",
  "img_url": "" /* OPTIONALY */
}
```

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": {
    "id": "11",
    "name": "Category-1",
    "description": "Lorem dsadas",
    "img_url": ""
  },
  "result": true
}
```

#### remove

`DELETE {{BASE_URL}}/api/tiktak/admin/categories/11`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "message": "Successfully removed",
  "data": null,
  "result": true
}
```

#### list

`GET {{BASE_URL}}/api/tiktak/admin/categories`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": [
    {
      "id": 1,
      "name": "Elektronika",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
      "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 2,
      "name": "Moda",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/moda.jpg",
      "description": "En yeni kolleksiyalar, aksesuarlari ve kisisel bakim mehsullari.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 3,
      "name": "Ev ve Bahce",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/ev_bahce.jpg",
      "description": "Ev dekorasyon, mebel, bahce aksesuarlari ve daha fazlasi.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 4,
      "name": "Spor ve Aciq Hava",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/spor.jpg",
      "description": "Idman ekipmanlari, aciq hava feliyyetleri ve fitness mehsullari.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 5,
      "name": "Kitab ve Kancalariya",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/kitab.jpg",
      "description": "Kitablar, tedris materiallari ve ofis kancalariyasi.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 6,
      "name": "Oyuncaq ve Usaq",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/oyuncaq.jpg",
      "description": "Usaq oyuncaqlari, gelisim oyunlari ve ana-baba mehsullari.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 7,
      "name": "Avtomobil",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/avtomobil.jpg",
      "description": "Avto aksesuarlari, ehtiyat hisseleri ve avtomobil bakim mehsullari.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 8,
      "name": "Saglamliq ve Guzuluk",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/saglamliq.jpg",
      "description": "Kosmetika, parfumlar, saglamliq mehsullari ve vitamin takviyeleri.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 9,
      "name": "Mutfaq ve Yemek",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/mutfaq.jpg",
      "description": "Mutfaq avadanliqlari, yemek hazirlanmasi ve qida mehsullari.",
      "created_at": "2025-06-12T05:37:56.753Z"
    },
    {
      "id": 10,
      "name": "Hediyyeler",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/hediyye.jpg",
      "description": "Xususi gunler ucun hediyyeler, suvenirler ve dekorativ esyalar.",
      "created_at": "2025-06-12T05:37:56.753Z"
    }
  ],
  "result": true
}
```

## Products

#### create

`POST {{BASE_URL}}/api/tiktak/admin/product`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "title": "Producty-3 Icki",
  "description": "Lorem ipsum",
  "price": "8.90",
  "type": "litre" /* Please check button. this is ENUM ProductMeasure*/,
  "img_url": "" /* OPTIONALY */,
  "category_id": 1
}

// export enum ProductMeasure {
//   KG = 'kg',
//   GR = 'gr',
//   LITRE = 'litre',
//   ML = 'ml',
//   METER = 'meter',
//   CM = 'cm',
//   MM = 'mm',
//   PIECE = 'piece',
//   PACKET = 'packet',
//   BOX = 'box',
// }
```

**Response (201 Created):**

```json
{
  "message": "Ok",
  "data": {
    "id": 1,
    "title": "Producty-1",
    "img_url": "",
    "description": "Lorem ipsum",
    "price": "12.90",
    "type": "kg",
    "created_at": "2025-06-12T06:38:08.292Z",
    "category": {
      "id": 1,
      "name": "Elektronika",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
      "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
      "created_at": "2025-06-12T05:37:56.753Z"
    }
  },
  "result": true
}
```

#### update

`PUT {{BASE_URL}}/api/tiktak/admin/products/2`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "title": "Producty-2 Icki",
  "description": "Lorem ipsumdsda",
  "price": "12.90",
  "type": "litre" /* Please check button. this is ENUM ProductMeasure*/,
  "img_url": "" /* OPTIONALY */,
  "category_id": 1
}

// export enum ProductMeasure {
//   KG = 'kg',
//   GR = 'gr',
//   LITRE = 'litre',
//   ML = 'ml',
//   METER = 'meter',
//   CM = 'cm',
//   MM = 'mm',
//   PIECE = 'piece',
//   PACKET = 'packet',
//   BOX = 'box',
// }
```

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": {
    "id": 2,
    "title": "Producty-2 Icki",
    "img_url": "",
    "description": "Lorem ipsumdsda",
    "price": "12.90",
    "type": "litre",
    "created_at": "2025-06-12T06:46:25.117Z",
    "category": {
      "id": 1,
      "name": "Elektronika",
      "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
      "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
      "created_at": "2025-06-12T05:37:56.753Z"
    }
  },
  "result": true
}
```

#### remove

`DELETE {{BASE_URL}}/api/tiktak/admin/products/2`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "message": "Successfully removed",
  "data": null,
  "result": true
}
```

#### list

`GET {{BASE_URL}}/api/tiktak/admin/products`

- Auth: bearer

- Query params:

  - `limit` (disabled)
  - `page` (disabled)
  - `search` — product title and desc, price (disabled)

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": [
    {
      "id": 3,
      "title": "Producty-2 Icki",
      "img_url": "",
      "description": "Lorem ipsum",
      "price": "12.90",
      "type": "litre",
      "created_at": "2025-06-12T06:49:09.440Z",
      "category": {
        "id": 1,
        "name": "Elektronika"
      }
    },
    {
      "id": 1,
      "title": "Producty-1",
      "img_url": "",
      "description": "Lorem ipsum",
      "price": "12.90",
      "type": "kg",
      "created_at": "2025-06-12T06:38:08.292Z",
      "category": {
        "id": 1,
        "name": "Elektronika"
      }
    }
  ],
  "pagination": {
    "next": null,
    "prev": null,
    "current": 1,
    "total": 2,
    "totalPages": 1
  },
  "result": true
}
```

## Campaign

#### create

`POST {{BASE_URL}}/api/tiktak/admin/campaign`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "title": "Campaign-1",
  "description": "Lorem",
  "img_url": "" /* OPTIONALY */
}
```

**Response (201 Created):**

```json
{
  "message": "Ok",
  "data": {
    "title": "Campaign-1",
    "description": "Lorem",
    "img_url": "",
    "id": 9,
    "created_at": "2025-06-12T06:19:04.262Z"
  },
  "result": true
}
```

#### update

`PUT {{BASE_URL}}/api/tiktak/admin/campaigns/9`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "title": "Campaign-1",
  "description": "Lorem dsda",
  "img_url": "" /* OPTIONALY */
}
```

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": {
    "id": "9",
    "title": "Campaign-1",
    "description": "Lorem dsda",
    "img_url": ""
  },
  "result": true
}
```

#### remove

`DELETE {{BASE_URL}}/api/tiktak/admin/campaigns/9`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "message": "Successfully removed",
  "data": null,
  "result": true
}
```

#### list

`GET {{BASE_URL}}/api/tiktak/admin/campaigns`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": [
    {
      "id": 3,
      "title": "Tiktak yenilik",
      "description": null,
      "img_url": null,
      "created_at": "2025-06-12T05:40:42.843Z"
    },
    {
      "id": 4,
      "title": "Yaz kampanyasi",
      "description": null,
      "img_url": null,
      "created_at": "2025-06-12T05:40:42.843Z"
    },
    {
      "id": 5,
      "title": "Yilbasi kampanyasi",
      "description": null,
      "img_url": null,
      "created_at": "2025-06-12T05:40:42.843Z"
    },
    {
      "id": 6,
      "title": "Teknoloji Festivali",
      "description": null,
      "img_url": null,
      "created_at": "2025-06-12T05:40:42.843Z"
    },
    {
      "id": 7,
      "title": "Moda Heftesi",
      "description": null,
      "img_url": null,
      "created_at": "2025-06-12T05:40:42.843Z"
    }
  ],
  "result": true
}
```

## Orders

#### list

`GET {{BASE_URL}}/api/tiktak/orders/admin`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "basket_id": 1,
  "payment": "CARD" /* Enum CASH CARD */,
  "note": "Lorem ipsum"
}
```

**Response (200 OK):**

```json
{
  "message": "Ok",
  "data": [
    {
      "id": 1,
      "orderNumber": "ORD-20250613-630",
      "total": "18.89",
      "deliveryFee": "0.00",
      "paymentMethod": "CARD",
      "status": "PENDING",
      "note": "Lorem ipsum",
      "address": "Aga Neymatulla",
      "phone": "+994103193897",
      "createdAt": "2025-06-13T07:35:41.867Z",
      "updatedAt": "2025-06-13T07:35:41.867Z",
      "user": {
        "id": 3,
        "full_name": "John Doe",
        "img_url": "https://avatars.githubusercontent.com/u/61918721?v=4?s=400"
      },
      "items": [
        {
          "id": 1,
          "quantity": 1,
          "total_price": "12.90",
          "product": {
            "id": 5,
            "title": "Producty-2 Icki",
            "img_url": "",
            "description": "Lorem ipsum",
            "price": "12.90",
            "type": "litre",
            "created_at": "2025-06-13T04:54:05.529Z",
            "category": {
              "id": 1,
              "name": "Elektronika",
              "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
              "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
              "created_at": "2025-06-12T05:37:56.753Z"
            }
          }
        }
      ]
    }
  ],
  "result": true
}
```

#### stats

`GET {{BASE_URL}}/api/tiktak/orders/admin`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "basket_id": 1,
  "payment": "CARD" /* Enum CASH CARD */,
  "note": "Lorem ipsum"
}
```

**Response (200 OK):**

```json
{
  "TOTAL": 1,
  "DELIVERED": 0,
  "PENDING": 0,
  "PREPARING": 1,
  "TOTAL_REVENUE": 0
}
```

#### update status

`PUT {{BASE_URL}}/api/tiktak/orders/admin/1/status`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "status": "PREPARING"
}

// export enum OrderStatus {
//   PENDING = 'PENDING',
//   CONFIRMED = 'CONFIRMED',
//   PREPARING = 'PREPARING',
//   READY = 'READY',
//   DELIVERED = 'DELIVERED',
//   CANCELLED = 'CANCELLED',
// }
```

**Response (200 OK):**

```json
{
  "message": "Order created successfully",
  "data": {
    "id": 1,
    "orderNumber": "ORD-20250613-630",
    "total": "18.89",
    "deliveryFee": "0.00",
    "paymentMethod": "CARD",
    "status": "PREPARING",
    "note": "Lorem ipsum",
    "address": "Aga Neymatulla",
    "phone": "+994103193897",
    "createdAt": "2025-06-13T07:35:41.867Z",
    "updatedAt": "2025-06-13T08:28:33.583Z",
    "items": [
      {
        "id": 1,
        "quantity": 1,
        "total_price": "12.90",
        "product": {
          "id": 5,
          "title": "Producty-2 Icki",
          "img_url": "",
          "description": "Lorem ipsum",
          "price": "12.90",
          "type": "litre",
          "created_at": "2025-06-13T04:54:05.529Z",
          "category": {
            "id": 1,
            "name": "Elektronika",
            "img_url": "https://www.tiktak.az/cdn-cgi/image/width=600,height=400,quality=80,format=auto/https://www.tiktak.az/media/catalog/category/elektronika.jpg",
            "description": "Smartfonlar, laptoplar, televizorlar ve daha fazlasi.",
            "created_at": "2025-06-12T05:37:56.753Z"
          }
        }
      }
    ]
  },
  "result": true
}
```

#### stats

`GET {{BASE_URL}}/api/tiktak/orders/admin`

- Auth: bearer

- Headers:
  - `Accept-Language: {{LANG}}`

**Request body:**

```json
{
  "basket_id": 1,
  "payment": "CARD" /* Enum CASH CARD */,
  "note": "Lorem ipsum"
}
```

**Response (200 OK):**

```json
{
  "TOTAL": 1,
  "DELIVERED": 0,
  "PENDING": 0,
  "PREPARING": 1,
  "TOTAL_REVENUE": 0
}
```
