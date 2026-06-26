# 🚀 Shortify API

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-5.x-000000?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql\&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?logo=jsonwebtokens)
![Swagger](https://img.shields.io/badge/API-Swagger-85EA2D?logo=swagger)

</p>

A production-ready **URL Shortener REST API** built with **Node.js**, **Express.js**, **PostgreSQL**, **Prisma ORM**, and **Docker**.

Shortify enables authenticated users to create, manage, and analyze shortened URLs with features like **JWT Authentication**, **Custom Aliases**, **QR Code Generation**, **Click Analytics**, **URL Expiration**, and **Swagger API Documentation**.

---

# 📑 Table of Contents

* Features
* Tech Stack
* Project Architecture
* API Endpoints
* Security
* Docker
* API Documentation
* Screenshots
* Getting Started
* Environment Variables
* License

---

# ✨ Features

## 🔐 Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Ownership-based Authorization

---

## 🔗 URL Management

* Create Short URLs
* Custom URL Aliases
* Update Existing URLs
* Delete URLs
* Paginated URL Listing

---

## 📊 Analytics

* Click Tracking
* Recent Visit History
* URL Statistics

---

## ⚡ Additional Features

* QR Code Generation
* URL Expiration
* Reserved Alias Protection
* Express Rate Limiting
* Request Validation using Zod
* Centralized Error Handling
* Swagger API Documentation
* Dockerized Deployment

---

# 🛠 Tech Stack

| Category         | Technology              |
| ---------------- | ----------------------- |
| Runtime          | Node.js                 |
| Framework        | Express.js              |
| Database         | PostgreSQL              |
| ORM              | Prisma ORM              |
| Authentication   | JWT                     |
| Validation       | Zod                     |
| Password Hashing | bcrypt                  |
| Documentation    | Swagger / OpenAPI       |
| Containerization | Docker & Docker Compose |

---

# 🏗 Project Architecture

```text
Client
   │
   ▼
Express API
   │
Controllers
   │
Services
   │
Prisma ORM
   │
PostgreSQL
```

---

# 📚 API Endpoints

## Authentication

| Method | Endpoint         | Description                    |
| ------ | ---------------- | ------------------------------ |
| POST   | `/auth/register` | Register a new user            |
| POST   | `/auth/login`    | Login and receive JWT          |
| GET    | `/auth/me`       | Get current authenticated user |

---

## URL Management

| Method | Endpoint                 | Description        |
| ------ | ------------------------ | ------------------ |
| POST   | `/urls`                  | Create a Short URL |
| GET    | `/urls`                  | Get all user URLs  |
| PATCH  | `/urls/:shortCode`       | Update URL         |
| DELETE | `/urls/:shortCode`       | Delete URL         |
| GET    | `/urls/:shortCode/stats` | URL Analytics      |
| GET    | `/urls/:shortCode/qr`    | Generate QR Code   |

---

## Redirect

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| GET    | `/:shortCode` | Redirect to Original URL |

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing using bcrypt
* Ownership-based Authorization
* Zod Request Validation
* Express Rate Limiting
* Reserved Alias Protection
* Centralized Error Handling

---

# 🐳 Docker

Run the complete application with Docker.

```bash
docker compose up
```

This starts:

* Express API
* PostgreSQL Database
* Docker Network
* Persistent Docker Volume

### Docker Containers

<img width="1917" height="1078" alt="image" src="https://github.com/user-attachments/assets/01d23a63-953a-4dba-895f-94d434ccd4c0" />

### Running Containers

<img width="1307" height="533" alt="image" src="https://github.com/user-attachments/assets/328c488b-8965-40f7-93ca-48de0a36b562" />

---

# 📖 API Documentation

Swagger UI is available at:

```text
http://localhost:3000/api-docs
```

Swagger provides:

* Interactive API Testing
* JWT Authentication Support
* Request & Response Schemas
* Endpoint Documentation

---

# 📸 Screenshots

## Swagger UI

<img width="1897" height="966" alt="image" src="https://github.com/user-attachments/assets/878d5abd-3ae4-4dd2-9d39-1bf53eccefd8" />
<img width="1892" height="968" alt="image" src="https://github.com/user-attachments/assets/ed478226-97f3-47c5-aec3-07a341c3474e" />

---

## Authentication

<img width="1233" height="966" alt="image" src="https://github.com/user-attachments/assets/9161fe8d-7aa0-49be-9e1b-306528e1025c" />

---



## QR Code Generation

<img width="1192" height="937" alt="image" src="https://github.com/user-attachments/assets/e7b4a5a5-765e-48fe-9f5c-27b52f0a1240" />

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/shivamm0913/shortify-api.git

cd shortify-api
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file.

```env
DATABASE_URL=

JWT_SECRET=

PORT=3000

BASE_URL=http://localhost:3000
```

---

## Run Database Migrations

```bash
npx prisma migrate deploy
```

---

## Start Development Server

```bash
npm run dev
```

---

## Start Production Server

```bash
npm start
```

---

# 📄 License

This project is developed for **learning**, **portfolio**, and **educational purposes**.
