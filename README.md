# Netflix Clone

Full-stack Netflix-style demo app with a React + Vite frontend and an Express + Mongoose backend.

**Tech stack**: React, Vite, React Router, Tailwind-style tooling, Express, Mongoose, MongoDB.

**Contents**
- `frontend/` — Vite + React app (UI, routes, components)
- `backend/` — Express API and Mongoose models

Getting started
---------------

Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm
- MongoDB connection string (Atlas or local)

Backend setup
1. Open a terminal and install dependencies:

```bash
cd backend
npm install
```

2. Create a `.env` file (copy from `.env.example` if present) and set at least:

```
MONGO_URI=your-mongodb-uri
PORT=5000
```

3. Start the server:

```bash
# simple run
node server.js

# or with nodemon if installed
npx nodemon server.js
```

Frontend setup
1. Install dependencies and start dev server:

```bash
cd frontend
npm install
npm run dev
```

2. Build for production:

```bash
npm run build
```

API examples
- Signup (POST /api/signup):

```bash
curl -X POST http://localhost:5000/api/signup \
	-H "Content-Type: application/json" \
	-d '{"username":"bob","email":"bob@example.com","password":"secret"}'
```

Troubleshooting
- If you see the error about a missing JSON body, ensure the client sends the `Content-Type: application/json` header and a valid JSON payload (Postman: Body → raw → JSON).
- Backend logs appear in the terminal running `server.js` and will include request headers when the JSON body is missing.

Repository notes
- The backend `.env` is ignored (see `backend/.gitignore`). Add a `backend/.env.example` with placeholder keys if you want to share required env names without secrets.

Contributing
- Keep changes small and focused.
- Run the frontend build (`frontend/npm run build`) and a quick backend syntax check when modifying the server.

If you'd like, I can:
- add a `backend/.env.example`,
- run and verify the server + a test request from this environment, or
- add per-field validation and clearer API error responses.
