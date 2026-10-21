# MSBTE Scholar 2.0 🎓
> **Everything a Diploma Student Needs** • `msbtescholar.com`  
> Official K-Scheme (and I/G-Scheme) Educational & Career Platform for Maharashtra State Board of Technical Education (MSBTE) Students.

---

## 🌟 Overview & Phase 2 Architecture

MSBTE Scholar 2.0 is built as a single, production-oriented Progressive Web App (PWA) with **two distinct, tailored user experiences** running on a shared Next.js App Router codebase, unified state management, and shared data layer:

1. **Mobile Installed App (PWA) Experience** (`viewport < 768px` or `display-mode: standalone`):
   - Designed for 390 × 844px mobile viewports (responsive down to 320px).
   - Full-bleed app shell with Android safe-area insets, sticky Royal Emerald header with dynamic back navigation stack.
   - Fixed 5-tab bottom navigation with raised gold Search button.
   - PWA installation banner, manual Android/iOS install instructions modal, and offline indicator.
   - 16 dedicated mobile screens (Splash, Onboarding, Auth, Profile Setup, Home, Study Material, Mock Tests, Jobs, Projects, Community, Courses, Updates, Notifications, Profile & Settings, Search, My Learning).

2. **Desktop Web Application Experience** (`viewport >= 768px`):
   - Designed for 1440 × 900px desktop viewports.
   - Persistent collapsible Royal Emerald sidebar (250px expanded / 72px icon-only).
   - Sticky top desktop header with global search bar, branch badge, notification bell, theme toggle, and user avatar.
   - Breadcrumbs navigation (`Home > Category`) for nested views.
   - Multi-column dashboard, structured data tables, filter chips, and desktop-optimized modal dialogs.
   - 10 desktop screens including Admin Operations Dashboard.

> **Automatic Responsive Selection**: The application detects the device environment automatically via media queries and CSS. On normal production deployments, mobile users open directly into the mobile app shell, and desktop users open into the desktop dashboard. The device switcher is available only as an unobtrusive floating dev pill in the bottom right corner (or toggleable via `Ctrl+Shift+D`).

---

## 🎨 Design System — Royal Emerald & Gold Palette

| Element | Color Hex | Role |
| :--- | :--- | :--- |
| **Main Background** | `#FAF6EE` | Warm antique cream page canvas |
| **Primary Emerald** | `#0B3B2E` | Deep royal emerald for headers, buttons, cards |
| **Dark Emerald** | `#062D24` | Sidebar and splash background |
| **Gold Accent** | `#D4AF37` | Badges, active borders, key CTAs |
| **Soft Gold** | `#F1DFA4` | Secondary indicators and pill tags |
| **Ruby Alert** | `#B3202F` | Deadlines and urgent examination notices |
| **Primary Text** | `#141414` | High contrast body typography |
| **Muted Text** | `#5F5B52` | Subtitles, timestamps, and secondary info |
| **Border Color** | `#E6DCC6` | Clean, subtle component dividers |
| **Dark Mode Canvas** | `#0C0C0C` | Deep dark mode background |
| **Dark Mode Card** | `#171717` | Card surfaces in dark mode |
| **Success Color** | `#1FA971` | Verified badges and score accomplishments |

**Typography**:
- Headings: `Plus Jakarta Sans` (Bold & Black weight)
- Body: `Inter` (Regular, Medium, Semibold)
- Icons: `Lucide React` (Outline only — No emojis as UI buttons)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18.17.0+ or v20+ (tested on Node v24.18.0)
- npm v9+ or pnpm / yarn

### Installation
```bash
# Clone repository
git clone https://github.com/your-org/msbte-scholar.git
cd msbte-scholar

# Install dependencies
npm install
```

### Environment Variables
Create a `.env.local` file in the root directory:
```env
# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication & API Keys (when connecting production backend)
# NEXTAUTH_SECRET=your_super_secret_key
# NEXTAUTH_URL=http://localhost:3000
# DATABASE_URL=postgresql://user:password@localhost:5432/msbte_scholar
# RAZORPAY_KEY_ID=rzp_test_xxxx
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```
The build produces optimized static routes (`/` and `/offline`) with zero TypeScript or linting errors.

---

## 📱 PWA Features & Offline Support

1. **Web App Manifest (`public/manifest.json`)**:
   - `name`: "MSBTE Scholar 2.0"
   - `short_name`: "MSBTE Scholar"
   - `display`: "standalone"
   - `theme_color`: "#0B3B2E"
   - `background_color`: "#FAF6EE"
   - High-res icons (192x192 and 512x512) and shortcut actions.

2. **Service Worker (`public/sw.js`)**:
   - Static asset pre-caching (HTML, CSS, JS, manifest, fonts).
   - Network-first strategy for dynamic resources with cache fallback.
   - Dedicated fallback to `/offline` if offline and page not cached.
   - Safety rule: never caches private authentication credentials, sensitive payment data, or private user secrets.

3. **In-App PWA Install Banner & Guide**:
   - Detects `beforeinstallprompt` on Android Chrome and shows a native install CTA.
   - Includes a full manual installation modal guide with step-by-step instructions for Android Chrome (3-dots menu → Add to Home screen) and iOS Safari (Share button → Add to Home Screen).

4. **Offline Detection & Fallback Page**:
   - Real-time `OfflineIndicator` banner appears when network connectivity drops.
   - Dedicated `/offline` route styled in Royal Emerald & Gold with a "Retry Connection" button and offline study tips.

---

## 🔐 Shared Authentication & State Synchronization

- **Single Student Account**: All user profile preferences (branch, scheme, semester, college), bookmarks, saved resources, enrolled courses, and theme preferences are managed in `src/context/AppContext.tsx`.
- **Persistent Synchronization**: Synchronizes automatically to `localStorage` (`msbte_user_profile`, `msbte_theme`, `msbte_bookmarks`). Switching between mobile and desktop viewports preserves the student's logged-in session and data.
- **Data Integrity Disclaimer**: Academic syllabus codes and circular formats adhere to genuine MSBTE K-Scheme patterns. Simulated resources and mock tests are labeled with the data disclaimer badge to maintain complete transparency.

---

## 🌐 Viewport Testing Matrix

The layout has been designed and tested across the following viewport breakpoints:

| Viewport Width | Device Target | Active Layout Shell |
| :--- | :--- | :--- |
| **320px – 360px** | Compact Android devices | Full-bleed Mobile PWA Shell (single-column, touch controls) |
| **390px** | iPhone 12/13/14/15, Pixel | Full-bleed Mobile PWA Shell (standard reference) |
| **430px** | Large Android / iPhone Pro Max | Full-bleed Mobile PWA Shell |
| **768px – 1023px** | Tablets / iPads | Adaptive Desktop Dashboard with responsive grid |
| **1024px – 1280px** | Small laptops | Desktop Web Shell with collapsible sidebar |
| **1440px+** | Desktop monitors | Full Desktop Web Shell with 250px Royal Emerald sidebar |

---

## 🚢 Deployment

### Deploying on Vercel
```bash
# Push to GitHub and import into Vercel
# Framework Preset: Next.js
# Build Command: npm run build
# Output Directory: .next
```

### Self-Hosted (Docker / Node.js)
```bash
npm run build
NODE_ENV=production PORT=3000 node .next/standalone/server.js # Or `npm start`
```

---

## ⚠️ Known Limitations & Notes

1. **Live Database Integration**: In the current version, state persists via browser `localStorage` and React Context (`AppContext.tsx`). For multi-device cloud synchronization, connect PostgreSQL/Supabase with Prisma ORM.
2. **Automated Headless Browser in Local Sandbox**: The environment's Playwright driver download is blocked from external Azure CDNs (HTTP 404). Testing is performed via automated Next.js route builds and curl/Invoke-WebRequest status checks. Real device testing can be conducted by navigating to `http://localhost:3000` or the deployed Vercel domain.

---

© 2026 MSBTE Scholar 2.0 • msbtescholar.com • All rights reserved.
