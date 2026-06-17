# CareerOs API Reference

Base URL: `http://localhost:5000/api`

All protected routes require:
```
Authorization: Bearer <accessToken>
```

---

## Auth `/api/auth`

### POST `/auth/register`
**Body**
```json
{
  "email": "user@example.com",
  "password": "minlength8",
  "firstName": "John",
  "lastName": "Doe"
}
```
**Response** `201` — `{ user, accessToken, refreshToken }`

---

### POST `/auth/login`
**Body**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
**Response** `200` — `{ user, accessToken, refreshToken }`

---

### POST `/auth/refresh`
**Body**
```json
{
  "refreshToken": "..."
}
```
**Response** `200` — `{ accessToken }`

---

### POST `/auth/logout`
**Body**
```json
{
  "refreshToken": "..."
}
```
**Response** `204`

---

## Users `/api/users` — Protected

### GET `/users/me`
Returns the authenticated user's profile.

**Response** `200` — user object (no password)

---

### PATCH `/users/me`
**Body** (all optional)
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "max 500 chars",
  "phone": "+1234567890",
  "location": "New York",
  "linkedinUrl": "https://linkedin.com/in/...",
  "portfolioUrl": "https://mysite.com"
}
```
**Response** `200` — updated user object

---

### POST `/users/me/avatar`
**Content-Type** `multipart/form-data`

| Field | Type | Required |
|---|---|---|
| `avatar` | image file | Yes |

**Response** `200` — updated user object with `avatarUrl`

---

### POST `/users/me/resume`
**Content-Type** `multipart/form-data`

| Field | Type | Required |
|---|---|---|
| `resume` | PDF file | Yes |

**Response** `200` — updated user object with `resumeUrl`

---

### DELETE `/users/me`
Permanently deletes the authenticated user's account.

**Response** `204`

---

## Companies `/api/companies` — Protected

### GET `/companies`
Returns paginated list of all companies.

**Query params** (optional)
| Param | Type | Default |
|---|---|---|
| `page` | number | `1` |
| `limit` | number | `10` |

**Response** `200` — `{ companies, total, page, totalPages }`

---

### POST `/companies`
**Body**
```json
{
  "name": "Acme Inc",
  "website": "https://acme.com",
  "location": "San Francisco",
  "industry": "Software"
}
```
**Response** `201` — created company object

---

### GET `/companies/:id`
**Response** `200` — company with active jobs included

---

### PATCH `/companies/:id`
**Body** (all optional)
```json
{
  "name": "Acme Inc",
  "website": "https://acme.com",
  "location": "Remote",
  "industry": "SaaS"
}
```
**Response** `200` — updated company object

---

### DELETE `/companies/:id`
**Response** `204`

---

## Applications `/api/applications` — Protected

### GET `/applications`
**Query params** (all optional)
| Param | Type | Description |
|---|---|---|
| `stage` | enum | Filter by stage (see stages below) |
| `companyId` | string | Filter by company |
| `search` | string | Search by job title |

**Stages:** `WISHLIST` `SAVED` `APPLIED` `HR_SCREENING` `TECHNICAL_ROUND` `ASSIGNMENT` `MANAGER_ROUND` `FINAL_ROUND` `OFFER` `ACCEPTED` `REJECTED` `WITHDRAWN`

**Response** `200` — array of applications

---

### POST `/applications`
**Body**
```json
{
  "jobTitle": "Senior Engineer",
  "companyId": "cuid...",
  "jobUrl": "https://...",
  "stage": "WISHLIST",
  "salaryMin": 80000,
  "salaryMax": 120000,
  "currency": "USD",
  "location": "Remote",
  "isRemote": true,
  "description": "Job description notes",
  "source": "LinkedIn",
  "appliedAt": "2026-06-18T00:00:00.000Z"
}
```
**Required:** `jobTitle`, `companyId`

**Response** `201` — created application

---

### GET `/applications/:id`
**Response** `200` — single application with company and job details

---

### PATCH `/applications/:id`
**Body** — same shape as POST, all fields optional

**Response** `200` — updated application

---

### PATCH `/applications/:id/stage`
**Body**
```json
{
  "stage": "TECHNICAL_ROUND"
}
```
**Response** `200` — updated application

---

### DELETE `/applications/:id`
**Response** `204`
