# QUANTUMEDGR — MERN Job Portal (Intern Task)

A full‑stack job portal built with **React (Vite)**, **Node.js/Express**, and **MongoDB**. This repo follows the intern task requirements and includes Firebase for auth helpers and Lottie for animations.

> **Live Frontend:** [https://glowing-treacle-1c276f.netlify.app/](https://glowing-treacle-1c276f.netlify.app/)
>
> **Live Backend:** [https://lacsing.vercel.app/](https://lacsing.vercel.app/)
>
> **Figma Design:** [https://www.figma.com/design/LLrXn8vTjMHmuBjiyEiLs2/Job-Interview-Figma-Design?node-id=0-1](https://www.figma.com/design/LLrXn8vTjMHmuBjiyEiLs2/Job-Interview-Figma-Design?node-id=0-1)

---


## 🔹 Tech Stack & Tools

**Frontend:** React, Vite, TailwindCSS, DaisyUI, React Router DOM, Axios, React Hook Form, React Lottie, React Chart.js 2

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, CORS middleware

**Third-party Services:** Firebase Authentication, SweetAlert2

**Development Tools:** Vite, ESLint, Nodemon

**Deployment:** Netlify (Frontend), Vercel (Backend)

---

## 🔧 Frontend Setup

### Install Dependencies

```bash
cd client
npm install
```

### Environment Variables (`client/.env`)

```
VITE_API_URL=https://lacsing.vercel.app
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Start Development Server

```bash
npm run dev
```

---

## 🔧 Backend Setup

### Install Dependencies

```bash
cd server
npm install
```

### Environment Variables (`server/.env`)

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=https://glowing-treacle-1c276f.netlify.app
```

### Start Backend Server

```bash
npm run dev  # or npm start
```

### CORS Configuration

```js
import cors from 'cors';
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://glowing-treacle-1c276f.netlify.app'
  ],
  credentials: true
}));
```

---

## 🔧 React Router Setup

```jsx
import { createBrowserRouter } from 'react-router-dom';
import Root from './root';
import Home from '../Page/Home/Home';
import Login from '../Page/Authentication/Login';
import Register from '../Page/Authentication/Register';
import DashboardLayout from '../Page/Dashbord/DashbordLayout';
import MainDashbord from '../Page/Dashbord/MainDashbord';
import PrivateRouter from '../Page/Authentication/PrivateRoute';
import Error from '../Page/Cpmponents/Error&Loading/Error';
import ServicesAdd from '../Page/Cpmponents/Services/ServiceAdd';
import ManageServices from '../Page/Cpmponents/Services/ManageServices';
import BookingServices from '../Page/Cpmponents/Services/BookingServices';
import ServicesUpdate from '../Page/Cpmponents/Services/UpdateServices';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, 
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'dashboard',
        element: <PrivateRouter><DashboardLayout /></PrivateRouter>,
        children: [
          { index: true, element: <MainDashbord /> },
          { path: 'add-services', element: <ServicesAdd /> },
          { path: 'manage-services', element: <ManageServices /> },
          { path: 'booking-services', element: <BookingServices /> },
          { path: 'services/update/:id', element: <ServicesUpdate /> }
        ]
      }
    ]
  }
]);
```

---

## 🔧 Firebase Setup

```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
```

---

## 🎞️ Lottie Usage Example

```jsx
import Lottie from 'react-lottie';
import animationData from '../assets/lotties/animation.json';

const LottiePlayer = ({ loop = true, autoplay = true }) => {
  const options = { loop, autoplay, animationData, rendererSettings: { preserveAspectRatio: 'xMidYMid slice' } };
  return <Lottie options={options} height={200} width={200} />;
};

export default LottiePlayer;
```

---

## 🔐 API Endpoints (Backend)

**Auth:**

* POST `/api/auth/register`
* POST `/api/auth/login`

**Jobs (Protected, require JWT):**

* POST `/api/jobs` — create job
* GET `/api/jobs` — list user's jobs
* PUT `/api/jobs/:id` — update job if owner
* DELETE `/api/jobs/:id` — delete job if owner

---

## 🧪 Testing

* Use Postman/Insomnia to verify endpoints and JWT authentication.
* Ensure frontend calls `https://lacsing.vercel.app` instead of localhost in production.

---

## 📌 Notes

* Project Name: **QUANTUMEDGR**
* Clean, professional code structure with meaningful commits.
* CORS setup ensures Netlify frontend can access Vercel backend.
* JWT protects all job CRUD routes.

---

## 👤 Author

**MD Asif** — MERN Developer


* Contact: [asif81534@gmail.com](asif81534@gmail.com)
