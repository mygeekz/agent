# Backend API Service

This directory contains the Node.js Express backend for the application. It provides a RESTful API for user authentication, task management, file uploads, and a mock AI agent interaction.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/) Server

---

## Setup and Installation

1.  **Navigate to the Backend Directory**
    ```bash
    cd backend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**
    -   Create a `.env` file by copying the example file:
        ```bash
        cp .env.example .env
        ```
    -   Open the `.env` file and fill in your specific configuration, especially for the database connection (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) and the JWT secret (`JWT_SECRET`).

4.  **Initialize the Database**
    -   Make sure your MySQL server is running.
    -   Create a database with the name you specified in your `.env` file (e.g., `api_db`).
        ```sql
        CREATE DATABASE api_db;
        ```
    -   Use the database and run the schema script provided in `init.sql` to create the necessary tables. You can do this via a MySQL client or command line.

---

## Running the Application

-   **For development (with auto-reloading):**
    ```bash
    npm run dev
    ```
    The server will start, typically on port 3001 (or as specified in your `.env` file), and automatically restart when you make changes to the code.

-   **For production:**
    ```bash
    npm start
    ```

---

## API Endpoints Overview

All endpoints are prefixed with `/api`. Protected routes require a `Bearer <token>` in the `Authorization` header.

-   **Auth**
    -   `POST /auth/register`: Register a new user.
    -   `POST /auth/login`: Log in and receive a JWT.

-   **Tasks (Protected)**
    -   `GET /tasks`: Get all tasks for the user.
    -   `POST /tasks`: Create a new task.
    -   `PUT /tasks/:id`: Update a task's status.
    -   `DELETE /tasks/:id`: Delete a task.

-   **Files (Protected)**
    -   `GET /files`: List the user's uploaded files.
    -   `POST /files`: Upload a file (use a `multipart/form-data` request with a field named `file`).

-   **Agent (Protected)**
    -   `POST /agent`: Send a JSON message to the mock agent.
---
