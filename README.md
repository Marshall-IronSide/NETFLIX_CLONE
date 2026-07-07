# Netflix Clone

A full-stack Netflix-style demo app built with a React + Vite frontend and an Express + Mongoose backend. The app includes authentication, movie browsing pages, and AI-powered recommendations.

## Features
- Responsive Netflix-inspired landing experience
- Sign up, sign in, and session-based authentication with cookies
- Movie cards and detail pages
- AI recommendation endpoint powered by Google Gemini

## Tech Stack
- Frontend: React, Vite, React Router, Zustand, React Hot Toast
- Backend: Express, Mongoose, JWT, bcrypt, cookie-parser, CORS
- Database: MongoDB

## Project Structure
- frontend/ — Vite + React application and UI components
- backend/ — Express API, MongoDB models, and server logic

## Prerequisites
- Node.js 18+
- npm
- A MongoDB instance (local or Atlas)

## Backend Setup
1. Install dependencies:

```bash
cd backend
npm install
```

2. Create a .env file in the backend folder with values such as:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
CLIENT_URL=http://localhost:5173
GOOGLE_GENAI_API_KEY=your-google-api-key
```

3. Start the backend:

```bash
npm run dev
```

## Frontend Setup
1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser at:

```text
http://localhost:5173
```

4. Build for production:

```bash
npm run build
```

## API Overview
- POST /api/signup — create a new user
- POST /api/login — authenticate a user
- GET /api/fetch-user — fetch the current authenticated user
- POST /api/logout — clear the auth cookie
- POST /api/ai/recommend — proxy an AI recommendation request

Example signup request:

```bash
curl -X POST http://localhost:5000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"bob","email":"bob@example.com","password":"secret"}'
```

## Notes
- The AI recommendation endpoint is optional; it will return an error until GOOGLE_GENAI_API_KEY is configured.
- Keep changes focused and follow the existing frontend/backend structure.
- Run the frontend build after UI changes and verify backend startup after server changes.
