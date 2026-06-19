# Technical Design Document (TDD)

## 1. Implementation Specifications
* **Frontend State:** React Context API will be used for global state (Auth state, Task lists). Heavy state libraries like Redux are avoided to keep the MVP lightweight.
* **Routing:** React Router DOM will handle client-side routing, protecting dashboard routes with an Auth Guard.

## 2. Key Technical Constraints
* **Stateless Backend:** The server must not store session state in memory. All authentication state must be derived from the JWT provided in the `Authorization` header.
* **Security:** Passwords must never be stored in plain text. Use `bcrypt` with a minimum salt round of 10.
* **Responsive Design:** CSS Flexbox/Grid must be used to ensure the UI gracefully adapts from mobile (320px width) to desktop (1920px width).

## 3. Performance Requirements
* **Page Load:** The initial SPA load must complete in under 2.0 seconds on a standard 4G/Broadband network.
* **API Latency:** CRUD operations on tasks must return a response in under 500ms.
* **Database Queries:** Queries fetching a user's filtered tasks must execute in under 50ms.

## 4. Database Schema (Low-Level)
* **`users` table:** `id` (UUID), `email` (VARCHAR, UNIQUE), `password_hash` (VARCHAR), `created_at` (TIMESTAMP).
* **`tasks` table:** `id` (UUID), `user_id` (UUID, FK), `title` (VARCHAR 100), `category` (ENUM: 'PERSONAL', 'PROFESSIONAL'), `timeframe` (ENUM: 'DAILY', 'WEEKLY', 'MONTHLY'), `status` (ENUM: 'TODO', 'IN_PROGRESS', 'DONE'), `created_at` (TIMESTAMP), `updated_at` (TIMESTAMP).
