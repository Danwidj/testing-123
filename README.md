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

- **Map** *(core)* — shows points of interest and what can be collected at each, plus crowd-density and traffic indicators.
- **Wallet** *(core)* — active/earned vouchers with a scannable QR code for redemption.
- **Stats page** *(stretch)* — step counter, estimated carbon footprint offset, and an achievement tracker.
- **Shop** *(stretch)* — purchasable items and currently available vouchers, separate from the Wallet.
- **Color-coded pitstops/landmarks** — visual crowd-density signal used to actively manage and disperse crowds.

### Demo Scope (Hackathon MVP)

Everything is faked/mocked for the demo — no real backend sensing or multiplayer infrastructure. This keeps the build achievable in the time available while telling the same story:

| Feature | Demo approach |
|---|---|
| Crowd density / red roads | Hardcoded time-of-day lookup table, not live sensor data |
| Geofence check-in | **Foreground** "Check In" button using `navigator.geolocation.getCurrentPosition()` — **not** background GPS tracking (unreliable/unsupported for PWAs on iOS Safari) |
| "Pikmin" following bonus | Static copy (e.g. "12 other travelers took this route today +50 pts") — no real multi-user path tracking |
| CO₂ savings ticker | Hardcoded estimate per route/mode, not a live routing API |
| Voucher QR redemption | Real QR generation/scan, but pointing at mock voucher data |
| Festivals, Shop, Stats | Out of scope for the demo — mentioned in the pitch as roadmap/future work |

---

## 🧭 User Journey

**Step 1 — Pre-Departure Decision at Accommodation**
The user opens the PWA from their hotel room to plan their morning outing. The map shows a central **History Museum** and a peripheral **Mangrove Boardwalk**, each with a live crowd indicator: the Mangrove is red (**"High Crowd Density (Peak Hours)"**), the Museum is green (**"Low Crowd Density (Quiet Window)"**). Lower crowds mean better rewards (steps-based). The user bypasses the congested mangrove and heads to the Museum first.

**Step 2 — Traveling and Exploring the Museum**
After visiting the Museum, the user reopens the app to check the afternoon schedule. The Mangrove marker has flipped from red to green now that morning tour buses have left. Tapping the Mangrove pop-up shows the site description, current quiet status, and an attached reward voucher for a nearby local eatery upon arrival.

**Step 3 — Route Selection and Green Transit**
Navigating from the Museum to the Mangrove, the user sees three routing options, color-coded and labeled by environmental impact (red = more crowded). A live carbon comparison ticker shows estimated grams of CO₂ saved by choosing the green bicycle path over a car. The user picks the green cycling route.

**Step 4 — Arrival and GPS Verification at the Mangrove**
The user cycles to the Mangrove entrance and opens the app to check in, tapping a **"Check In"** button. The app requests location permission and reads the device's current coordinates (foreground only — no background tracking) to confirm the user is within the Mangrove's geofenced boundary. Once coordinates match the destination zone, a celebratory success screen plays — a blooming virtual flower animation — and issues a digital voucher for a local café down the road.

**Step 5 — Reward Redemption at the Local Eatery**
The user walks to the recommended local eatery and opens the "Wallet" tab, which shows the active discount voucher linked to the completed mangrove trip. They present the voucher's dynamic QR code to the cashier, who scans it to apply the discount — shifting tourist spend directly into the peripheral local economy.

---

## 🌟 Key Technical Features

- **Single-Port Architecture**: Express serves both API routes (`/api/...`) and compiled React static files on **Port 5050**, eliminating CORS issues.
- **Mobile-First PWA Support**: Out-of-the-box Web App Manifest (`manifest.json`) and Service Worker auto-updates via `vite-plugin-pwa`.
- **Instant Mobile Testing**: Easily test on physical iPhones or Android devices with a single `ngrok http 5050` tunnel.
- **Unified Build Scripts**: Single command (`npm run build`) to install, bundle frontend assets, and launch the server.
- **Map & routing, fully open-source**: [Leaflet](https://react-leaflet.js.org/) + [OpenStreetMap](https://www.openstreetmap.org/) tiles — no API key, no billing account, no Google Cloud setup. (We looked at Google Maps Platform first; ruled it out since it needs a billing account even for free-tier usage and offers no branding benefit here.)
- **Client-side QR codes**: [`qrcode.react`](https://www.npmjs.com/package/qrcode.react) renders voucher QR codes with zero network calls.
- **Geolocation check-in**: native `navigator.geolocation` (no library, no key) — foreground-only by design, since background GPS isn't reliably supported for PWAs on iOS Safari.

---

## 📂 Repository Structure

```text
testing-123/
├── package.json             # Root orchestrator (Express dependencies & build scripts)
├── server.js                # Express backend (API routes + static PWA server)
├── .gitignore                # Excludes node_modules, dist, .env, and .DS_Store
│
├── frontend/                # React Vite PWA Application
│   ├── package.json         # React & Vite dependencies (leaflet, react-leaflet, qrcode.react)
│   ├── vite.config.js       # Vite & PWA configuration (dev proxy to port 5050)
│   ├── index.html           # Main HTML mounting point
│   ├── public/              # Static PWA assets (manifest.json, icons)
│   └── src/
│       ├── main.jsx         # React mounting (imports Leaflet CSS)
│       ├── App.jsx          # Tab switching (Map / Wallet) + shared voucher state
│       ├── index.css        # App shell, map/wallet/nav-bar styling
│       ├── components/
│       │   ├── MapView.jsx  # Leaflet map, POI markers, route picker, Check-In button
│       │   ├── Wallet.jsx   # Voucher list with QR codes
│       │   └── NavBar.jsx   # Bottom tab bar
│       ├── data/
│       │   ├── pois.js      # Museum/Mangrove coordinates + hardcoded crowd lookup
│       │   ├── routes.js    # Hardcoded route polylines + CO₂/distance estimates
│       │   └── vouchers.js  # Initial mock voucher(s)
│       └── utils/
│           └── geo.js       # Haversine distance for the geofence check-in
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
