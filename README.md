# 🚀 Hackathon Unified JS PWA App

A high-velocity, single-port Progressive Web App (PWA) starter built with a **Unified JavaScript Stack** (Node.js/Express backend + React/Vite PWA frontend). Designed specifically for rapid 16-hour hackathon development and seamless mobile testing.

---

## 🌟 Key Features

- **Single-Port Architecture**: Express serves both API routes (`/api/...`) and compiled React static files on **Port 5000**, eliminating CORS issues.
- **Mobile-First PWA Support**: Out-of-the-box Web App Manifest (`manifest.json`) and Service Worker auto-updates via `vite-plugin-pwa`.
- **Instant Mobile Testing**: Easily test on physical iPhones or Android devices with a single `ngrok http 5000` tunnel.
- **Unified Build Scripts**: Single command (`npm run quick-build`) to install, bundle frontend assets, and launch the server.

---

## 📂 Repository Structure

```text
testing-123/
├── package.json             # Root orchestrator (Express dependencies & build scripts)
├── server.js                # Express backend (API routes + static PWA server)
├── .gitignore               # Excludes node_modules, dist, .env, and .DS_Store
│
├── frontend/                # React Vite PWA Application
│   ├── package.json         # React & Vite dependencies
│   ├── vite.config.js       # Vite & PWA configuration (dev proxy to port 5000)
│   ├── index.html           # Main HTML mounting point
│   ├── public/              # Static PWA assets (manifest.json, icons)
│   └── src/                 # React UI Code
│       ├── main.jsx         # React mounting
        ├── App.jsx          # Main application component & layout
        └── index.css        # Base styling
│
└── .agents/skills/          # Custom Agent Skills (Git formatting, Plan writing, etc.)
    └── git/scripts/git-sync # Automated Git sync tool
```

---

## ⏱️ Quick Start Guide

### 1. Initial Setup
Install the root and frontend dependencies:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..
```

---

### 2. Running the Unified Server (Production / Testing Mode)
Build the frontend and start the single-port Express server on **`http://localhost:5000`**:

```bash
npm run quick-build
```

---

### 3. Frontend Development Mode (Hot Reloading)
For rapid UI iteration with hot module replacement (HMR):

```bash
npm run dev-frontend
```
> *API requests to `/api/*` are automatically proxied to the Express backend on port 5000.*

---

### 4. Testing on Mobile Devices (ngrok)
To test the PWA on an iPhone or Android phone:

1. Start your unified server: `npm run quick-build`
2. In a second terminal window, run:
   ```bash
   ngrok http 5000
   ```
3. Open the `https://...` link on your mobile phone and select **"Add to Home Screen"** to test as a native PWA!

---

## 🛠️ Project Tooling

### Git Sync Helper
Automate fetching, rebasing, formatting conventional commits, and pushing changes to remote:

```bash
./.agents/skills/git/scripts/git-sync
```
