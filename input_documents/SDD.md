# System Design Document (SDD)

## 1. Technical Architecture Overview
TaskFlow will employ a standard 3-Tier Client-Server Architecture:
* **Presentation Tier (Frontend):** A Single Page Application (SPA) providing a responsive, interactive UI.
* **Application Tier (Backend):** A RESTful API serving business logic, authentication, and data validation.
* **Data Tier (Database):** A relational database ensuring structured, ACID-compliant data storage.

## 2. Technology Stack Preferences
* **Frontend:** React.js (Ideal for reactive state management of tasks and seamless UI updates).
* **Backend:** Node.js with Express.js (Fast, asynchronous I/O, JavaScript across the stack).
* **Database:** PostgreSQL (Strict relationships and robust data integrity).
* **Infrastructure/Hosting:** Vercel for Frontend, Render/Heroku for Backend, Supabase/AWS RDS for PostgreSQL.

## 3. Scalability Needs
* **Horizontal Scaling:** Backend APIs must be stateless (using JWT) to allow horizontal scaling behind a load balancer as the user base grows.
* **Database Indexing:** Indexes are required on `user_id`, `timeframe`, and `category` columns to ensure rapid query resolution as the tasks table grows large.

## 4. Integration Points
* **Frontend-Backend:** JSON over HTTPS via RESTful API endpoints.
* **Backend-Database:** Connection pooling using a robust ORM like Prisma or Sequelize to map objects and manage migrations.
