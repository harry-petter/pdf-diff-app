# PDF Diff App

A monorepo application to compare two PDF files and show their text differences. Built with React (frontend) and Node.js/Express (backend).

## Features
- Upload two PDF files and see a highlighted text diff
- Simple, modern UI
- Fast backend processing using pdf-parse and diff

## Project Structure
```
apps/
  frontend/   # React + Vite frontend
  backend/    # Node.js/Express backend (TypeScript)
```

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm

### Install dependencies
From the project root:
```sh
npm install
cd apps/frontend && npm install
cd ../backend && npm install
```

### Run both frontend and backend concurrently
From the project root:
```sh
npm run dev
```
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Usage
1. Open the frontend in your browser.
2. Upload two PDF files.
3. Click "Compare" to see the text diff highlighted.

## Customization
- To change ports, edit the scripts or server configs in `apps/frontend` and `apps/backend`.
- For visual PDF diffing, further enhancements are possible (see Issues/TODO).

## License
MIT