# Business Requirements Document (BRD)

## BR-001: User Authentication
**Priority**: HIGH
**Description**: Users must be able to register and log in securely.
**Acceptance**: System supports email/password registration. Passwords must be hashed with bcrypt.
**Source**: Business Case §2

## BR-002: Task Creation
**Priority**: HIGH
**Description**: Users must be able to create tasks with specific categorization and timeframes.
**Acceptance**: Task creation form requires Title, Category (Personal/Professional), and Timeframe (Daily/Weekly/Monthly).
**Source**: Business Case §2

## BR-003: Task Management and Updates
**Priority**: HIGH
**Description**: Users must be able to manage the lifecycle of their existing tasks.
**Acceptance**: Users can update the status (To-Do, In Progress, Done) of a task, edit its text, or delete it permanently.
**Source**: Business Case §2

## BR-004: Time-Horizon Dashboards
**Priority**: MEDIUM
**Description**: The application must visually separate tasks based on their due horizon.
**Acceptance**: The system provides distinct Daily, Weekly, and Monthly view tabs or dashboards.
**Source**: Business Case §2

## BR-005: Context Filtering
**Priority**: MEDIUM
**Description**: Users must be able to filter their views to see only relevant tasks for their current context.
**Acceptance**: The UI must include a toggle or filter to show strictly 'Personal' tasks, 'Professional' tasks, or 'All'.
**Source**: Business Case §2
