# E-Commerce Client

A modern e-commerce storefront built with **React 19**, **Vite 8**, **Ant Design 6**, and **Tailwind CSS 4**. Features Firebase authentication, a full shopping experience (browse → cart → checkout), user profiles, and a dedicated admin panel.

---

## Tech Stack

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| Framework      | React 19 (with React Compiler)      |
| Build Tool     | Vite 8                              |
| UI Library     | Ant Design 6                        |
| Styling        | Tailwind CSS 4                      |
| Auth           | Firebase Authentication             |
| HTTP Client    | Axios                               |
| Routing        | React Router DOM 7                  |
| Deployment     | Vercel (SPA rewrite configured)     |

---

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (or equivalent package manager)
- A **Firebase** project with Authentication enabled
- The [server](../server) running (or a deployed backend URL)

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable                             | Description                                |
| ------------------------------------ | ------------------------------------------ |
| `VITE_BACKEND_URL`                   | Backend API base URL (e.g. `http://localhost:3000/api/v1`) |
| `VITE_FIREBASE_API_KEY`              | Firebase API key                           |
| `VITE_FIREBASE_AUTH_DOMAIN`          | Firebase Auth domain                       |
| `VITE_FIREBASE_PROJECT_ID`          | Firebase project ID                        |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket                    |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID               |
| `VITE_FIREBASE_APP_ID`              | Firebase app ID                            |

### 3. Start development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## Available Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start Vite dev server with HMR       |
| `npm run build`     | Build production bundle to `dist/`   |
| `npm run preview`   | Preview the production build locally |
| `npm run lint`      | Run ESLint across the project        |

---

## Project Structure

```
client/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, icons, and media
│   ├── components/          # Reusable UI components
│   ├── config/
│   │   └── firebase.js      # Firebase SDK initialization
│   ├── context/
│   │   ├── authContext.jsx   # Authentication state provider
│   │   └── cartContext.jsx   # Shopping cart state provider
│   ├── layout/              # Page layout wrappers (Main, Admin)
│   ├── pages/
│   │   ├── Admin/           # Admin panel pages
│   │   │   ├── AdminDashboard
│   │   │   ├── AdminOrders
│   │   │   ├── AdminProducts
│   │   │   ├── AdminAddProduct
│   │   │   ├── AdminEditProduct
│   │   │   ├── AdminCategories
│   │   │   ├── AdminPayments
│   │   │   └── AdminUsers
│   │   ├── Auth/            # Login, SignUp, Forgot/Reset Password
│   │   ├── CheckOut/        # Checkout flow
│   │   ├── Home/            # Landing / home page
│   │   ├── ProductDetail/   # Single product view
│   │   ├── Products/        # Product listing & catalog
│   │   └── Profile/         # User profile
│   ├── services/            # API service modules (Axios)
│   │   ├── axios.js         # Axios instance & interceptors
│   │   ├── adminService.js
│   │   ├── authService.js
│   │   ├── orderService.js
│   │   ├── paymentService.js
│   │   ├── productService.js
│   │   ├── reviewService.js
│   │   └── userService.js
│   ├── theme/               # Ant Design theme customization
│   ├── App.jsx              # Root component
│   ├── Routes.jsx           # All route definitions
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── .env.example             # Environment variable template
├── vercel.json              # Vercel SPA rewrite config
├── vite.config.js           # Vite + React + Tailwind config
└── package.json
```

---

## Key Features

- **Storefront** — Home page, product catalog with collection routes, and product detail pages
- **Authentication** — Firebase-backed login, signup, forgot password, and reset password flows
- **Shopping Cart** — Context-based cart management with checkout
- **User Profile** — View and manage account details and order history
- **Admin Panel** — Protected dashboard with management for:
  - Orders
  - Products (CRUD)
  - Categories
  - Payments
  - Users
- **Role-Based Access** — Separate route guards for authenticated users and admin users

---

## Deployment

The project includes a `vercel.json` configured for SPA routing. To deploy:

1. Push the `client/` directory to a Git repository.
2. Import the repo in [Vercel](https://vercel.com).
3. Set the **Root Directory** to `client`.
4. Add all `VITE_*` environment variables in the Vercel dashboard.
5. Deploy.

---

## Related

- [Server README](../server/README.md) — Backend API documentation
