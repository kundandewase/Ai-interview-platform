# AI Interview Platform

Full-stack project for coding practice and AI interview simulation.

## Features

- User signup and login
- Protected dashboard and coding pages
- Problem list and problem detail page with code editor
- Code execution via Judge0 API
- AI interview Q&A endpoint
- Interview mode with score, history, and leaderboard

## Project Structure

- client: React + Vite frontend
- server: Express + MongoDB backend

## Setup

### 1) Install dependencies

Run these commands in separate terminals:

```powershell
cd client
npm install
```

```powershell
cd server
npm install
```

### 2) Configure backend environment

Create a .env file in server folder using server/.env.example as reference.

Required values:

- PORT=5000
- JWT_SECRET=any_secure_text
- OPENAI_API_KEY=your_openai_key_optional
- OPENAI_MODEL=gpt-4.1-mini_optional
- OLLAMA_BASE_URL=http://127.0.0.1:11434_optional
- OLLAMA_MODEL=llama3.2:3b_optional

Notes:

- If OPENAI_API_KEY is missing, backend first tries local Ollama (free, no API key) and then fallback mode.
- MongoDB URL is currently hardcoded in server.js to local instance:
	mongodb://127.0.0.1:27017/ai-interview-platform

### 2.1) Enable real AI for free (Ollama local)

Install Ollama from https://ollama.com and run:

```powershell
ollama pull llama3.2:3b
ollama run llama3.2:3b
```

Then keep these variables in `server/.env`:

```env
OPENAI_API_KEY=
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=llama3.2:3b
```

### 3) Run the app

Backend:

```powershell
cd server
npm start
```

Frontend:

```powershell
cd client
npm run dev
```

Open app at http://localhost:5173

## API Routes

- POST /api/auth/signup
- POST /api/auth/login
- GET /api/problems
- GET /api/problems/:id
- POST /api/code/run
- POST /api/ai/ask
- POST /api/interview/save
- GET /api/interview/:userId
- GET /api/interview
- POST /api/submissions
- GET /api/submissions/:userId

## AI Route Behavior

- File: server/routes/aiRoutes.js
- Route: POST /api/ai/ask
- Uses OpenAI when OPENAI_API_KEY is configured.
- If key is missing, uses local Ollama model when available.
- Falls back to static interviewer responses if both are unavailable.
