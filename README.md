# UrbanThread BD — Backend API ⚙️

> RESTful API for UrbanThread BD — A streetwear e-commerce platform built for Bangladeshi fashion brands. Developed as a professional agency portfolio demo by **Oxivos Agency**.

---

## 🌐 Links

| | Link |
|---|---|
| ⚙️ **Live API** | [urbanthreadbd-backend.vercel.app](https://urbanthreadbd-backend.vercel.app/) |
| 🖥️ **Frontend** | [urbanthreadbd-fe293.web.app](https://urbanthreadbd-fe293.web.app/) |
| 📁 **Frontend Repo** | [github.com/NaeemMajumder/urbanthreadbd_client](https://github.com/NaeemMajumder/urbanthreadbd_client) |

---

## 🔐 Test Credentials

### 👑 Admin Account
| Field | Value |
|-------|-------|
| Phone | `+8801712345678` |
| Password | `rahim1234` |
| Role | `admin` |

### 👤 User Account
| Field | Value |
|-------|-------|
| Phone | `01433233232` |
| Password | `helloworld` |
| Role | `user` |

> ⚠️ Login identifier is **phone number**, not email.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | ODM (Object Data Modeling) |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |
| **dotenv** | Environment variables |
| **cors** | Cross-origin resource sharing |
| **Vercel** | Deployment |

---

## 📁 Project Structure

```
urbanthreadbd_server/
├── server.js                        ← Entry point
├── .env.example                     ← Environment template
├── package.json
│
└── src/
    ├── app.js                       ← Express setup
    │
    ├── config/
    │   ├── index.js                 ← Centralized env config
    │   └── db.js                   ← MongoDB connection
    │
    ├── api/
    │   ├── routes/
    │   │   ├── index.js             ← Root router (/api/v1)
    │   │   ├── auth.routes.js
    │   │   ├── user.routes.js
    │   │   ├── product.routes.js
    │   │   ├── category.routes.js
    │   │   ├── cart.routes.js
    │   │   ├── order.routes.js
    │   │   └── review.routes.js
    │   │
    │   ├── controllers/
    │   │   ├── auth.controller.js
    │   │   ├── user.controller.js
    │   │   ├── product.controller.js
    │   │   ├── category.controller.js
    │   │   ├── cart.controller.js
    │   │   ├── order.controller.js
    │   │   └── review.controller.js
    │   │
    │   └── middlewares/
    │       ├── authenticate.js      ← JWT verification
    │       ├── authorize.js         ← Role-based access
    │       └── errorHandler.js      ← Global error handler
    │
    ├── models/
    │   ├── User.model.js
    │   ├── Product.model.js
    │   ├── Category.model.js
    │   ├── Cart.model.js
    │   ├── Order.model.js
    │   ├── Review.model.js
    │   └── BlacklistedToken.model.js
    │
    ├── services/
    │   ├── auth.service.js
    │   ├── user.service.js
    │   ├── product.service.js
    │   ├── category.service.js
    │   ├── cart.service.js
    │   ├── order.service.js
    │   └── review.service.js
    │
    └── utils/
        ├── AppError.js              ← Custom error class
        └── asyncHandler.js          ← Async try/catch wrapper
```

---

## 🔗 API Endpoints

**Base URL:** `https://urbanthreadbd-backend.vercel.app/api/v1`

### 🔑 Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/auth/register` | Public | নতুন user register |
| `POST` | `/auth/login` | Public | Login, JWT token পাও |
| `POST` | `/auth/logout` | User | Logout, token blacklist |

### 👤 Users
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/users/me` | User | নিজের profile দেখো |
| `PATCH` | `/users/me` | User | Profile update করো |
| `GET` | `/users` | Admin | সব users দেখো |
| `GET` | `/users/:id` | Admin | একটা user দেখো |

### 📦 Products
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/products` | Public | সব products (filter/search/pagination) |
| `GET` | `/products/:id` | Public | একটা product |
| `POST` | `/products` | Admin | নতুন product বানাও |
| `PATCH` | `/products/:id` | Admin | Product update |
| `DELETE` | `/products/:id` | Admin | Product delete |

### 🗂️ Categories
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/categories` | Public | সব categories |
| `GET` | `/categories/:id` | Public | একটা category |
| `POST` | `/categories` | Admin | নতুন category বানাও |
| `PATCH` | `/categories/:id` | Admin | Category update |
| `DELETE` | `/categories/:id` | Admin | Category delete |

### 🛒 Cart
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/cart` | User | Cart দেখো |
| `POST` | `/cart` | User | Item add করো |
| `PATCH` | `/cart/:productId` | User | Quantity update করো |
| `DELETE` | `/cart/:productId` | User | Item remove করো |
| `DELETE` | `/cart` | User | Cart clear করো |

### 📋 Orders
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/orders` | User | Order করো |
| `GET` | `/orders/my-orders` | User | আমার orders |
| `GET` | `/orders` | Admin | সব orders |
| `PATCH` | `/orders/:id/status` | Admin | Order status update |

### ⭐ Reviews
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/reviews/:productId` | Public | Product এর reviews |
| `POST` | `/reviews/:productId` | User | Review দাও |
| `PATCH` | `/reviews/:id` | User | Review update |
| `DELETE` | `/reviews/:id` | User | Review delete |

---

## 🏗️ Architecture

```
Request
    ↓
server.js       → DB connect → app.listen()
    ↓
app.js          → CORS, JSON middleware
    ↓
routes/         → URL match করে controller এ পাঠায়
    ↓
middlewares/    → authenticate, authorize
    ↓
controllers/    → req/res handle → service কে দেয়
    ↓
services/       → Business logic → DB call
    ↓
models/         → MongoDB CRUD
    ↓
Response
```

### Design Patterns
- **MVC + Service Layer** — clean separation of concerns
- **JWT Authentication** — with token blacklisting on logout
- **Role-based Authorization** — `user` / `admin`
- **Global Error Handling** — centralized with custom `AppError`
- **Async Handler** — eliminates repetitive try/catch

---

## 📊 Database Schema

```
User
 ├── Cart     (userId ref)
 ├── Order    (userId ref)
 └── Review   (userId ref)

Category
 ├── Product  (category ObjectId ref)
 └── Category (parentCategory — self ref, sub-category support)

Product
 ├── Cart Items   (productId ref)
 ├── Order Items  (productId ref + snapshot)
 └── Review       (productId ref)
```

---

## 🚀 Run Locally

### Prerequisites
- Node.js `v18+`
- MongoDB (local or Atlas)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/NaeemMajumder/urbanthreadbd_server.git
cd urbanthreadbd_server

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your own values

# Run development server
npm run dev
```

### Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/urbanthread-bd
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
CORS_ORIGINS=http://localhost:3000
```

### Scripts

```bash
npm run dev    # Development (nodemon)
npm start      # Production
```

---

## 🔒 Authentication Flow

```
Register → bcrypt hash password → save user → return JWT token
Login    → verify password → return JWT token
Request  → Bearer token in header → authenticate middleware → req.user
Logout   → token added to BlacklistedToken collection
```

> Token blacklist expires automatically after 7 days (matches JWT expiry).

---

## ⚡ Key Features

- ✅ Phone number based authentication
- ✅ JWT token blacklisting on logout
- ✅ Role-based access control (user / admin)
- ✅ Product filter by category, size, color, price range
- ✅ Full-text search on product name
- ✅ Pagination on all list endpoints
- ✅ Cart with size & color combination support
- ✅ Order creates snapshot of product data
- ✅ Stock auto-decrements on order
- ✅ Cart auto-clears on order
- ✅ Review only allowed after product delivered
- ✅ Category supports parent/sub-category (self-reference)
- ✅ Auto slug generation for categories
- ✅ Global error handler (Mongoose, JWT, custom errors)

---

## 👨‍💻 Developer

**Naeem** — MERN Stack Developer of **Oxivos Agency**

> Specializing in e-commerce web solutions for Bangladeshi clothing & fashion businesses.

---

## 📄 License

This project is a portfolio demo built by **Oxivos Agency**. All rights reserved.