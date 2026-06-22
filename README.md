# Shortify API

A production-ready URL shortening service built with Node.js, Express, PostgreSQL and Prisma.

## Features

- User Registration & Login
- JWT Authentication
- Protected Routes
- Ownership-based Authorization
- Custom URL Aliases
- URL Expiration
- Click Tracking
- URL Statistics
- Request Validation using Zod
- Prisma ORM + PostgreSQL

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma
- JWT
- Zod
- bcrypt

## API Endpoints

POST /auth/register
POST /auth/login
GET  /auth/me

POST /urls
GET  /urls
GET  /urls/:shortCode/stats
DELETE /:shortCode

GET  /:shortCode
