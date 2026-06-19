-- Migration: 001_init_schema.sql
-- Description: Create users and tasks tables with PostgreSQL ENUM types and required indexes
-- Author: data-engineer (09)
-- Standards: coding-standard v1.0 | LESSON-SPRINT-0-002: all timestamps MUST be TIMESTAMPTZ (UTC)
-- Idempotent: yes — uses IF NOT EXISTS and exception-safe DO blocks for ENUM types
-- Reversible: yes — see migrate:down section

-- migrate:up

-- ENUM: task category (BR-002 — category field: PERSONAL | PROFESSIONAL)
DO $$ BEGIN
  CREATE TYPE task_category AS ENUM ('PERSONAL', 'PROFESSIONAL');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ENUM: task timeframe (BR-002 — timeframe field: DAILY | WEEKLY | MONTHLY)
DO $$ BEGIN
  CREATE TYPE task_timeframe AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ENUM: task status (BR-003 — status field: TODO | IN_PROGRESS | DONE)
DO $$ BEGIN
  CREATE TYPE task_status AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Table: users
-- Purpose: Authenticated user accounts — stores email + bcrypt-hashed password only (data minimization: GDPR Art. 5(1)(c))
-- PII: email is PII — never log or expose in API error responses
CREATE TABLE IF NOT EXISTS users (
  id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  CONSTRAINT users_email_unique UNIQUE (email)
);

-- Table: tasks
-- Purpose: User-owned task records with category, timeframe, and status tracking
-- Ownership: user_id FK enforces data isolation — tasks are never shared between users
CREATE TABLE IF NOT EXISTS tasks (
  id         UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID           NOT NULL,
  title      VARCHAR(100)   NOT NULL,
  category   task_category  NOT NULL,
  timeframe  task_timeframe NOT NULL,
  status     task_status    NOT NULL DEFAULT 'TODO',
  created_at TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  CONSTRAINT tasks_title_nonempty CHECK (LENGTH(TRIM(title)) > 0),
  CONSTRAINT tasks_user_fk FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Indexes (per SDD.md requirements and TDD.md schema spec)
CREATE INDEX IF NOT EXISTS idx_tasks_user_id  ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_timeframe ON tasks(timeframe);
CREATE INDEX IF NOT EXISTS idx_tasks_category  ON tasks(category);
-- Composite index for the most common query pattern: user's tasks filtered by timeframe
CREATE INDEX IF NOT EXISTS idx_tasks_user_timeframe ON tasks(user_id, timeframe);
-- Composite index for user's tasks filtered by category
CREATE INDEX IF NOT EXISTS idx_tasks_user_category ON tasks(user_id, category);

-- migrate:down

DROP INDEX IF EXISTS idx_tasks_user_category;
DROP INDEX IF EXISTS idx_tasks_user_timeframe;
DROP INDEX IF EXISTS idx_tasks_category;
DROP INDEX IF EXISTS idx_tasks_timeframe;
DROP INDEX IF EXISTS idx_tasks_user_id;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS task_status;
DROP TYPE IF EXISTS task_timeframe;
DROP TYPE IF EXISTS task_category;
