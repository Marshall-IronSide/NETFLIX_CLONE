# Copilot instructions for the Netflix clone workspace

This repository contains a full-stack Netflix-style app with:
- A React + Vite frontend in the frontend folder
- An Express + Mongoose backend in the backend folder

## Project conventions
- Keep frontend changes focused on the existing React component structure under frontend/src.
- Keep backend changes focused on server logic, routes, and models under backend.
- Prefer small, reusable UI components and follow the current folder organization.
- Use environment variables for configuration and secrets.
- Avoid introducing heavy dependencies unless the project already uses them.

## When implementing features
- Update the relevant page or component in the frontend when changing UI behavior.
- Update backend routes or models when changing API or persistence behavior.
- Keep the app consistent with the existing styling and structure.
- Verify changes with the available build/lint commands when possible.

## Verification
- Frontend: run npm run build from the frontend folder.
- Backend: validate server changes with a quick local run or syntax check when appropriate.
