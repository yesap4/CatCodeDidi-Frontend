# CatCodeDidi Frontend

A modern React frontend for the CatCodeDidi experience, built with Vite and designed around an AI-inspired interface with animated visuals, glassmorphism styling, and interactive input components.

## Overview

This project provides the user-facing interface for the application, including:

- a floating header/navigation section
- animated particle background effects
- an AI wave hero section
- a text input area for user interaction
- sleek, futuristic styling using React and Tailwind-inspired utility classes

## Tech Stack

- React 19
- Vite 8
- JavaScript
- Tailwind CSS
- Framer Motion / Motion
- Lucide React

## Features

- Responsive single-page app layout
- Animated background particles and motion effects
- Clean component-based structure
- Fast local development via Vite
- Ready for further AI/chat feature integration

## Project Structure

```bash
frontend/
├── public/
├── src/
│   ├── App.jsx
│   ├── Components/
│   │   ├── Header/
│   │   ├── Interaction Section/
│   │   └── ui/
│   ├── assets/
│   ├── lib/
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── pnpm-lock.yaml
└── README.md
```

## Prerequisites

Make sure you have the following installed:

- Node.js 18+
- pnpm (recommended) or npm

## Installation

```bash
cd frontend
pnpm install
```

If you prefer npm:

```bash
cd frontend
npm install
```

## Run Locally

Start the development server:

```bash
pnpm dev
```

Then open the local URL shown in the terminal, typically:

```bash
http://localhost:5173
```

## Production Build

Create a production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Linting

```bash
pnpm lint
```

## Notes

- The app uses a custom alias configuration for the `src` path.
- This frontend is structured to be extended with backend/API integrations, chat flows, or AI assistant logic.
- The current UI is a polished landing/interaction interface and can be expanded into a full product experience.

## License

This project is currently unlicensed unless explicitly stated otherwise.
