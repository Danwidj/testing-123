# 🌱 Sustainable Tourism Explorer: Eco-Friendly Visitor Experiences

A Progressive Web App (PWA) that nudges tourists toward sustainable, crowd-aware itineraries — built on a **Unified JavaScript Stack** (Node.js/Express backend + React/Vite PWA frontend) for fast iteration and easy mobile demoing via ngrok.

---

## 📌 Problem Statement

New international ports and a tourism Special Economic Zone (SEZ) are driving visitor growth, but over-tourism risks damaging mangroves, worsening traffic, and straining cultural sites. Visitors — many arriving from Singapore — lack integrated, sustainable itineraries or real-time eco-impact tools to help them spread out their visits and travel more responsibly.

---

## 💡 Solution

The app turns sustainable choices into a rewarding game loop:

- **Walk to earn vouchers** — physical movement (steps, completed routes) is converted into redeemable rewards.
- **Local-only redemption** — vouchers can only be spent on local businesses, directly promoting local tourism and shifting spend into the local economy.
- **"Pikmin" following bonus** — if other visitors follow the same low-impact route/path, everyone collects bonus points, encouraging convergence onto sustainable routes rather than scattered ad-hoc traffic.
- **Festivals** — limited-time events at specific locations to drive interest toward underused sites.
- **Red roads** — routes are color-coded on the map, with red indicating heavy traffic/congestion to steer visitors away in real time.

### Interfaces

- **Map** — shows points of interest and what can be collected at each, plus live crowd-density and traffic indicators.
- **Shop** — displays purchasable items and currently available vouchers.
- **Stats page** — step counter, estimated carbon footprint offset, and an achievement tracker.
- **Color-coded pitstops/landmarks** — visual crowd-density signal used to actively manage and disperse crowds.

---

## 🧭 User Journey

**Step 1 — Pre-Departure Decision at Accommodation**
The user opens the PWA from their hotel room to plan their morning outing. The map shows a central **History Museum** and a peripheral **Mangrove Boardwalk**, each with a live crowd indicator: the Mangrove is red (**"High Crowd Density (Peak Hours)"**), the Museum is green (**"Low Crowd Density (Quiet Window)"**). Lower crowds mean better rewards (steps-based). The user bypasses the congested mangrove and heads to the Museum first.

**Step 2 — Traveling and Exploring the Museum**
After visiting the Museum, the user reopens the app to check the afternoon schedule. The Mangrove marker has flipped from red to green now that morning tour buses have left. Tapping the Mangrove pop-up shows the site description, current quiet status, and an attached reward voucher for a nearby local eatery upon arrival.

**Step 3 — Route Selection and Green Transit**
Navigating from the Museum to the Mangrove, the user sees three routing options, color-coded and labeled by environmental impact (red = more crowded). A live carbon comparison ticker shows estimated grams of CO₂ saved by choosing the green bicycle path over a car. The user picks the green cycling route.

**Step 4 — Arrival and GPS Verification at the Mangrove**
The user cycles to the Mangrove entrance and opens the app to check in. The app requests location permission and uses background GPS tracking to detect when the user crosses the Mangrove's geofenced boundary. Once coordinates match the destination zone, a celebratory success screen plays — a blooming virtual flower animation — and issues a digital voucher for a local café down the road.

**Step 5 — Reward Redemption at the Local Eatery**
The user walks to the recommended local eatery and opens the "Wallet" tab, which shows the active discount voucher linked to the completed mangrove trip. They present the voucher's dynamic QR code to the cashier, who scans it to apply the discount — shifting tourist spend directly into the peripheral local economy.

---

## 🌟 Key Technical Features

- **Single-Port Architecture**: Express serves both API routes (`/api/...`) and compiled React static files on **Port 5050**, eliminating CORS issues.
- **Mobile-First PWA Support**: Out-of-the-box Web App Manifest (`manifest.json`) and Service Worker auto-updates via `vite-plugin-pwa`.
- **Instant Mobile Testing**: Easily test on physical iPhones or Android devices with a single `ngrok http 5050` tunnel.
- **Unified Build Scripts**: Single command (`npm run build`) to install, bundle frontend assets, and launch the server.

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
│   ├── vite.config.js       # Vite & PWA configuration (dev proxy to port 5050)
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
Build the frontend and start the single-port Express server on **`http://localhost:5050`**:

```bash
npm run build
```

---

### 3. Frontend Development Mode (Hot Reloading)
For rapid UI iteration with hot module replacement (HMR):

```bash
npm run dev
```
> *API requests to `/api/*` are automatically proxied to the Express backend on port 5050.*

---

### 4. Testing on Mobile Devices (ngrok)
To test the PWA on an iPhone or Android phone:

1. Start your unified server: `npm run build`
2. In a second terminal window, run:
   ```bash
   ngrok http 5050
   ```
3. Open the `https://...` link on your mobile phone and select **"Add to Home Screen"** to test as a native PWA!

---

### 5. Workflow Note: Solo vs. Sharing

Hot reload (`npm run dev`) is **local-only** — it's for solo iteration on your own machine, not for sharing with teammates. LAN IP sharing (`http://<your-ip>:5050`) is unreliable on venue/hackathon WiFi due to client isolation and iOS-specific restrictions (Local Network permission, Private Relay, Wi-Fi Assist) that can silently block one device while another works fine.

So the split is:
- **Just for me, while coding:** `npm run dev` (HMR, fast iteration, not shared)
- **To share with teammates or test on phones:** `npm run build` + `ngrok http 5050` (static build, works over the public internet regardless of local network restrictions)

---

## 🛠️ Project Tooling

### Git Sync Helper
Automate fetching, rebasing, formatting conventional commits, and pushing changes to remote:

```bash
./.agents/skills/git/scripts/git-sync
```
