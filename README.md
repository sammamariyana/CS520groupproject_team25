# CampusNest

A student housing and roommate-finder platform built for UMass Amherst students. CampusNest allows students to browse and post off-campus housing listings, find compatible roommates, verify identity through social media trust badges, and use AI-powered tools for roommate matching and lease analysis.

---

## Team Members

| Sammam Raiyan Ariyana
| Shivansh Soni
| Paransha Tajwani
| Romaisa Fatima

---

## Features

1. **Student Authentication** — Register and log in with a `.edu` email address. JWT-based sessions with 7-day tokens.
2. **Housing Listings Board** — Browse, search, and filter listings by price, distance, bedrooms, and verified status. Post your own listing with a 4-step form.
3. **Social Media Trust Badges** — Connect Facebook, Instagram, and Snapchat accounts to earn verified badges on your profile.
4. **Roommate Finder** — Browse roommate profiles with lifestyle preferences (sleep schedule, cleanliness, noise level). Filter and message potential roommates.
5. **Saved Listings & Dashboard** — Bookmark listings and roommate profiles, add personal notes, and manage everything from a single dashboard.
6. **Reporting & Moderation** — Report suspicious listings or profiles with categorized reasons. Track report status from the dashboard.
7. **AI Roommate Matching** — Complete a lifestyle questionnaire and get scored compatibility matches from the existing roommate pool.
8. **AI Lease Review** — Upload a lease PDF for plain-English analysis: key terms, red-flag clauses, and actionable recommendations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **View** | React 19, React Router DOM v7, Tailwind CSS v3, Framer Motion |
| **Controller** | Express.js v5, JWT (`jsonwebtoken`), `bcryptjs`, `multer` |
| **Model** | Flat JSON file (`data.json`) via Node.js `fs` module |
| **Auth** | JSON Web Tokens stored in `localStorage` |
| **Testing** | Jest, Supertest |

---

## Architecture

The backend follows the **MVC (Model-View-Controller)** pattern:

```
backend/
├── models/           ← Data access — one file per entity
│   ├── User.js
│   ├── Listing.js
│   ├── RoommateProfile.js
│   ├── Saved.js
│   └── Report.js
├── controllers/      ← Business logic — one file per feature area
│   ├── authController.js
│   ├── listingsController.js
│   ├── roommatesController.js
│   ├── savedController.js
│   ├── reportsController.js
│   └── aiController.js
├── routes/           ← URL mapping only (thin layer)
│   ├── auth.js
│   ├── listings.js
│   ├── roommates.js
│   ├── saved.js
│   ├── reports.js
│   └── ai.js
├── middleware/
│   └── auth.js       ← JWT verification middleware
├── db.js             ← I/O utility (read/write data.json)
├── server.js         ← Express entry point
└── seed.js           ← Populates data.json with demo data
```

The React frontend serves as the **View** layer, communicating with the backend via a `fetch`-based `api.js` service that automatically attaches JWT tokens to requests.

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### 1. Clone the repository

```bash
git clone https://github.com/sammamariyana/CS520groupproject_team25.git
cd CS520groupproject_team25
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
PORT=3001
JWT_SECRET=your_secret_key_here
```

Seed the database (creates `data.json` with demo listings and users):

```bash
npm run seed
```

Start the backend server:

```bash
npm start
# → CampusNest server running on port 3001
```

**Demo login credentials:** `shivanshsoni@umass.edu` / `password123`

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## API Endpoints

All protected routes (`🔒`) require the header `Authorization: Bearer <token>`.

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | — | Register with `.edu` email |
| POST | `/login` | — | Login, returns JWT |
| GET | `/me` | 🔒 | Get current user |
| PATCH | `/me` | 🔒 | Update name / phone / avatar |
| PATCH | `/social` | 🔒 | Connect / disconnect social account |

### Listings — `/api/listings`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | — | Browse all listings (supports `?search=`, `?maxPrice=`, `?beds=`, `?available=`) |
| GET | `/mine` | 🔒 | Get current user's listings |
| GET | `/:id` | — | Get single listing |
| POST | `/` | 🔒 | Create a listing |
| DELETE | `/:id` | 🔒 | Delete own listing |

### Roommates — `/api/roommates`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | — | Browse all profiles (with joined user info) |
| GET | `/me` | 🔒 | Get current user's profile |
| POST | `/` | 🔒 | Create or update profile |

### Saved — `/api/saved`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/listings` | 🔒 | Get saved listings |
| POST | `/listings` | 🔒 | Save a listing |
| PATCH | `/listings/:listingId/note` | 🔒 | Update note |
| DELETE | `/listings/:listingId` | 🔒 | Unsave a listing |
| GET | `/roommates` | 🔒 | Get saved roommates |
| POST | `/roommates` | 🔒 | Save a roommate |
| PATCH | `/roommates/:roommateId/note` | 🔒 | Update note |
| DELETE | `/roommates/:roommateId` | 🔒 | Unsave a roommate |

### Reports — `/api/reports`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | 🔒 | Submit a report |
| GET | `/mine` | 🔒 | Get current user's reports |

### AI — `/api/ai`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/match` | 🔒 | Submit questionnaire, get scored matches |
| POST | `/lease-review` | 🔒 | Upload PDF, get lease analysis |

---

## Running Tests

```bash
cd tests
npm install
npm test
```

To run only unit or integration tests:

```bash
npm run test:unit
npm run test:integration
```

### Test coverage

| Suite | Tests | Description |
|---|---|---|
| `unit/listings.test.js` | 5 | GET /api/listings — response shape and query filters |
| `unit/roommates.test.js` | 4 | GET /api/roommates — response shape and joined fields |
| `unit/auth.test.js` | 7 | Register and login — success, validation, and rejection cases |
| `unit/browseFilter.test.js` | 9 | Price range, bedroom count, and verified-only filter logic |
| `unit/dashboard.test.js` | 7 | Remove listing, remove roommate, update note logic |
| `integration/connection.test.js` | 5 | Server reachability and CORS headers |
| `integration/authFlow.test.js` | 5 | Full register → login → protected route flow |

---

## Project Structure

```
CS520groupproject_team25/
├── backend/        ← Express.js MVC API
├── frontend/       ← React + Tailwind CSS SPA
└── tests/          ← Jest + Supertest test suite
```
