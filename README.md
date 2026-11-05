# 🔑 Node MySQL Authentication API

**A secure authentication and account management REST API built with Node.js, TypeScript and MySQL.**

## ✨ Features

- User registration with **email verification**
- Login with **JWT** access tokens and **refresh tokens** (stored in cookies)
- Revoke tokens
- **Forgot / reset password** flow by email
- **Role-based access control** (Admin / User)
- Account CRUD for admins
- Request validation and centralized error handling
- Interactive **Swagger** API docs at `/api-docs`

## 🛠️ Tech Stack

Node.js · Express · TypeScript · MySQL · Sequelize · JWT · Nodemailer · Swagger

## 📡 API Endpoints

All routes are under `/accounts`.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/authenticate` | Log in |
| POST | `/refresh-token` | Get a new JWT using the refresh token |
| POST | `/revoke-token` | Revoke a refresh token |
| POST | `/register` | Register a new account |
| POST | `/verify-email` | Verify email address |
| POST | `/forgot-password` | Send a password reset email |
| POST | `/validate-reset-token` | Check a reset token |
| POST | `/reset-password` | Set a new password |
| GET | `/` | List accounts (admin) |
| GET | `/:id` | Get an account |
| POST | `/` | Create an account (admin) |
| PUT | `/:id` | Update an account |
| DELETE | `/:id` | Delete an account |

## 🚀 Getting Started

**Requirements:** Node.js 18+, MySQL

```bash
git clone https://github.com/alonsolemuel/node-mysql-api.git
cd node-mysql-api
npm install
```

Copy `.env.example` to `.env` and fill in your database details and JWT secret, then:

```bash
npm run start:dev
```

The API runs on http://localhost:4000 and the docs are at http://localhost:4000/api-docs
