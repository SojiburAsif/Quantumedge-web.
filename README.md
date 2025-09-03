# MERN Job Portal (Intern Task)

A full‑stack job portal built with **React/Next.js**, **Node.js/Express**, and **MongoDB**. Includes user authentication (JWT) and protected CRUD APIs for managing jobs.

> **Live Frontend:** [https://glowing-treacle-1c276f.netlify.app/](https://glowing-treacle-1c276f.netlify.app/)
>
> **Live Backend:** \<YOUR\_BACKEND\_BASE\_URL> (e.g., [https://your-api.onrender.com](https://your-api.onrender.com))
>
> **Figma Design:** [https://www.figma.com/design/LLrXn8vTjMHmuBjiyEiLs2/Job-Interview-Figma-Design?node-id=0-1](https://www.figma.com/design/LLrXn8vTjMHmuBjiyEiLs2/Job-Interview-Figma-Design?node-id=0-1)

---

## 📁 Monorepo Structure

```
.
├── client/           # React/Next.js app (frontend)
│   ├── src/
│   ├── package.json
│   └── .env (VITE_*/NEXT_PUBLIC_* vars)
├── server/           # Node.js/Express + MongoDB (backend)
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   └── app.js / index.js
│   ├── package.json
│   └── .env (server‑only vars)
└── README.md
```

---

## ✨ Features

### Frontend

* Pixel‑perfect implementation of **Login**, **Registration**, and **Job Listings** pages based on Figma.
* Optional responsive layout (mobile friendly if enabled).
* Auth UI integrated with backend APIs.

### Backend

* **Auth**: Register & Login with JWT issuance.
* **Jobs**: Full CRUD, protected by JWT; ownership checks for update/delete.
* Clean structure with controllers, middlewares, and models.

---

## 🧰 Tech Stack

* **Frontend**: React or Next.js, Axios/Fetch, React Router (if CRA/Vite), TailwindCSS (optional)
* **Backend**: Node.js, Express.js, Mongoose
* **Database**: MongoDB Atlas
* **Auth**: JSON Web Tokens (JWT) + HTTP‑only cookies (optional)
* **Deployment**: Netlify/Vercel (frontend), Render/Railway/Heroku (backend)

---

## 🚀 Getting Started

### Prerequisites

* Node.js >= 18
* MongoDB Atlas connection string
* Git

### 1) Clone the repo

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2) Backend setup (server/)

```bash
cd server
npm install
```

Create a **.env** file inside `server/`:

```
PORT=3000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=https://glowing-treacle-1c276f.netlify.app
COOKIE_SECURE=true
```

Start server:

```bash
npm run dev     # or: npm start
```

### 3) Frontend setup (client/)

```bash
cd ../client
npm install
```

Create **.env** in `client/`:

```
# If React + Vite
VITE_API_URL=<YOUR_BACKEND_BASE_URL>

# If Next.js
NEXT_PUBLIC_API_URL=<YOUR_BACKEND_BASE_URL>
```

Run the app:

```bash
npm run dev     # or: npm start / next dev
```

---

## 🔐 Authentication Flow

1. **Register** → `POST /api/auth/register`
2. **Login** → `POST /api/auth/login` → returns a JWT (and optionally sets an httpOnly cookie)
3. For protected routes, include the token in the `Authorization` header as `Bearer <token>` (or rely on httpOnly cookie if implemented that way).

---

## 📚 API Documentation

Base URL: `<YOUR_BACKEND_BASE_URL>`

### Auth Endpoints

#### `POST /api/auth/register`

Registers a new user.

* **Body**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Passw0rd!"
}
```

* **201 Response**

```json
{
  "message": "User registered successfully"
}
```

#### `POST /api/auth/login`

Logs in a user and returns a token.

* **Body**

```json
{
  "email": "john@example.com",
  "password": "Passw0rd!"
}
```

* **200 Response**

```json
{
  "token": "<JWT_TOKEN>",
  "user": { "_id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

### Job Endpoints (Protected)

All job routes require a valid JWT.

#### `POST /api/jobs`

Create a job posting.

* **Headers**: `Authorization: Bearer <JWT_TOKEN>`
* **Body**

```json
{
  "title": "Frontend Developer",
  "company": "Acme Inc",
  "location": "Remote",
  "type": "Full-time",
  "salary": 60000,
  "description": "We are hiring..."
}
```

* **201 Response**

```json
{
  "_id": "...",
  "title": "Frontend Developer",
  "company": "Acme Inc",
  "location": "Remote",
  "type": "Full-time",
  "salary": 60000,
  "description": "We are hiring...",
  "owner": "<USER_ID>",
  "createdAt": "..."
}
```

#### `GET /api/jobs`

List all jobs created by the logged‑in user.

* **Headers**: `Authorization: Bearer <JWT_TOKEN>`
* **200 Response**

```json
[
  { "_id": "...", "title": "...", "company": "..." }
]
```

#### `PUT /api/jobs/:id`

Update a job (only by its creator).

* **Headers**: `Authorization: Bearer <JWT_TOKEN>`
* **Body**: Any updatable fields, e.g. `{ "title": "Senior Frontend Developer" }`
* **200 Response**: Updated job doc

#### `DELETE /api/jobs/:id`

Delete a job (only by its creator).

* **Headers**: `Authorization: Bearer <JWT_TOKEN>`
* **200 Response**

```json
{ "message": "Job deleted" }
```

---

## 🧱 Data Models (example)

### User

```js
{
  _id: ObjectId,
  name: String,
  email: String, // unique
  password: String, // hashed
  createdAt: Date
}
```

### Job

```js
{
  _id: ObjectId,
  owner: ObjectId, // references User
  title: String,
  company: String,
  location: String,
  type: String, // e.g., Full-time, Part-time
  salary: Number,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🌐 CORS & Environment Notes

To allow the deployed frontend to call the backend, set CORS correctly in the server:

```js
const cors = require('cors');
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://glowing-treacle-1c276f.netlify.app'
  ],
  credentials: true
}));
```

> **Tip:** Avoid trailing slashes in origins. In production, point the frontend to the live `API_URL` via `.env` rather than hard‑coding `localhost`.

---

## 🧪 Testing

* Use **Postman** or **Insomnia**. Import a collection with all endpoints.
* Verify auth guard by calling `/api/jobs` without/with a token.

---

## 🛰️ Deployment

### Frontend (Netlify/Vercel)

* Set env var: `VITE_API_URL` or `NEXT_PUBLIC_API_URL` to your backend URL.
* Build command: `npm run build`
* Publish directory: `dist` (Vite) or `.next` (Next.js handled by Vercel).

### Backend (Render/Railway/Heroku)

* Add env vars from **server/.env** (PORT, MONGO\_URI, JWT\_SECRET, CLIENT\_URL, etc.).
* Start command: `node src/app.js` (or your entry file).

---

## 🔧 Scripts (examples)

**client/package.json**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**server/package.json**

```json
{
  "scripts": {
    "dev": "nodemon src/app.js",
    "start": "node src/app.js"
  }
}
```

---

## 📝 Commit Convention (suggested)

Use small, descriptive commits:

* `feat(auth): add login controller`
* `fix(cors): allow netlify origin`
* `refactor(api): extract auth middleware`
* `docs(readme): add api docs`

---

## 🧯 Troubleshooting

* **CORS error**: Ensure `Access-Control-Allow-Origin` includes your Netlify domain without trailing `/`.
* **Network Error / localhost**: Production frontend must call the **deployed** backend URL, not `http://localhost:*`.
* **401 Unauthorized**: Missing/expired token; check `Authorization: Bearer <token>`.
* **MongoDB connection failed**: Verify `MONGO_URI` and IP access list in Atlas.

---

## 📄 License

MIT (or add your preferred license)

---

## 👤 Author

**MD Asif** — MERN Developer

* Live Frontend: [https://glowing-treacle-1c276f.netlify.app/](https://glowing-treacle-1c276f.netlify.app/)
* Backend: \<YOUR\_BACKEND\_BASE\_URL>
* Contact: [your-email@example.com](mailto:your-email@example.com)
