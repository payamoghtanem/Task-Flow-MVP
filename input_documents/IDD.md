# Integration Design Document (IDD)

## 1. External Systems & APIs
For the MVP phase, external system dependencies are kept to an absolute minimum to ensure rapid deployment and fewer points of failure.
* **Database Hosting:** Supabase or AWS RDS will serve as the external managed PostgreSQL provider.
* **Frontend Hosting:** Vercel (integrates directly with GitHub for seamless CI/CD).
* **Backend Hosting:** Render or Heroku.

## 2. Authentication Mechanisms
* **Standard:** JSON Web Tokens (JWT).
* **Flow:**
    1. Client sends `POST /api/auth/login` with `{ email, password }`.
    2. Server verifies against the database, generates a JWT signed with a secret key, and returns the token.
    3. Client securely stores the token (HTTP-only cookie preferred, or LocalStorage).
    4. Client sends the token in the `Authorization: Bearer <token>` header for all subsequent protected requests.

## 3. Data Formats & Communication
* **Format:** All data exchanged between the frontend client and the backend REST API will be strictly in `application/json` format.
* **Standardized API Response Shell:**
    ```json
    {
      "success": true,
      "data": { ... },
      "error": null
    }
    ```
    In case of an error, `success` will be `false`, `data` will be `null`, and `error` will contain a descriptive message and HTTP error code (e.g., `"error": { "code": 404, "message": "Task not found" }`).
