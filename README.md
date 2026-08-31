# DeshYatra — Discover India Your Way

[![React 19](https://img.shields.io/badge/React-19.0-61dafb.svg?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> **A frontend-first, personalized Indian tourism discovery and smart trip-planning platform crafted for modern travelers exploring India's vast cultural, geographic, and sensory heritage.**

---

## 🌟 Overview & Novelty

India is unimaginably diverse — spanning high-altitude Himalayan passes, royal desert citadels, coastal backwaters, ancient river ghats, dense tiger sanctuaries, and living tribal root bridges. Yet most travel platforms rely on generic top-10 listicles or opaque ad-driven rankings.

**DeshYatra** solves this through a **transparent, deterministic 5-factor recommendation engine** running entirely client-side. Travelers answer an intuitive travel quiz or filter across multidimensional tags, receiving mathematical compatibility scores with clear, step-by-step match explanations.

---

## 🎯 Key Features

- **Interactive Discovery Quiz (`/discover`)**: 5-step guided questionnaire evaluating interests, budget, trip duration, travel style, and regional preference to generate tailored personas (e.g., *Himalayan Explorer*, *Heritage Connoisseur*, *Coastal Nomad*).
- **Multi-Factor Explore Hub (`/explore`)**: Filterable directory with search, geographic regions, states, budget tiers, pacing, travel companions, and synchronized URL query parameters.
- **Destination Deep-Dives (`/destinations/:id`)**: Rich destination dossiers complete with seasonal weather patterns, must-try regional cuisines, cultural heritage guides, travel tips, attraction highlights, and interactive photo galleries.
- **State & Cultural Explorer (`/states` & `/states/:id`)**: Comprehensive regional breakdown across Indian states and union territories detailing local arts, festivals, historical legacy, and top travel hubs.
- **Experiential Archetypes (`/experiences` & `/experiences/:id`)**: Thematic curation across 10 distinct travel archetypes (High Altitudes, Royal Heritage, Wildlife & Jungles, Spiritual Serenity, Coastal Escapes, Culinary Trails, Art & Architecture, and more).
- **Smart Day-by-Day Itinerary Planner (`/planner`)**: Drag-and-drop / reorderable activity organizer, automated budget estimation, pace customizer (Relaxed, Moderate, Packed), custom activity builder, and day notes.
- **Client-Side Persistence (`/favorites`)**: LocalStorage-backed bookmarking and custom itinerary manager with cross-component event broadcasting.
- **Responsive & Accessible UI**: Clean light-mode design with high-contrast typography, generous spacing, Lucide icons, and WCAG AA accessibility.

---

## 🧠 The 5-Factor Recommendation Model

Recommendations are computed using a normalized deterministic weighting algorithm ($0 \le \text{Score} \le 100$):

$$\text{Final Match Score} = \sum (W_i \times S_i)$$

| Dimension | Weight ($W_i$) | Evaluation Criteria |
| :--- | :---: | :--- |
| **Interests Alignment** | **35%** | Jaccard-style overlap between user-selected interest themes and destination feature tags (Mountains, Heritage, Wildlife, Beaches, Food, Spiritual, Culture, Adventure). |
| **Budget Compatibility** | **20%** | Proximity match across budget categories (Budget `<₹5,000`, Moderate `₹5,000–₹12,000`, Premium `₹12,000–₹20,000`, Luxury `₹20,000+`). |
| **Duration Feasibility** | **15%** | Pacing feasibility matching ideal duration against trip windows (Weekend `1–2d`, Short `3–4d`, Week `5–7d`, Extended `7d+`). |
| **Travel Style Synergy** | **15%** | Compatibility with travel group style (Solo, Couple, Family, Friends, Adventure, Relaxed). |
| **Regional Geography** | **15%** | Geographic match (North, South, East, West, Central, Northeast, or Pan-India open preference). |

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Storage**: Browser `localStorage` with defensive schema validation and event-driven cross-tab synchronization

---

## 🏗️ Architecture Overview

```
deshyatra/
├── src/
│   ├── components/
│   │   ├── destination/        # Destination detail, gallery, tips, food, weather
│   │   ├── discover/           # Step-by-step quiz, progress bar, personality results
│   │   ├── experiences/        # Archetype hero, cards, filter toolbar, destinations
│   │   ├── explore/            # Explore filters, destination grid, map integration
│   │   ├── home/               # Hero, quick search, featured cards, testimonials
│   │   ├── layout/             # Navbar, Footer, ScrollToTop, MainLayout
│   │   ├── planner/            # Day timeline, activity cards, budget summary, day notes
│   │   ├── states/             # State grid, state detail heroes, cultural tabs
│   │   └── ui/                 # Reusable buttons, badges, modals, inputs
│   ├── data/
│   │   ├── destinations.ts     # 40+ curated Indian destinations with deep metadata
│   │   ├── states.ts           # Indian states & UTs with cultural context
│   │   ├── experiences.ts      # 10 signature experience archetypes
│   │   └── index.ts            # Data export barrel
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ExplorePage.tsx
│   │   ├── DiscoverPage.tsx
│   │   ├── DestinationDetailPage.tsx
│   │   ├── StatesPage.tsx
│   │   ├── StateDetailPage.tsx
│   │   ├── ExperiencesPage.tsx
│   │   ├── ExperienceDetailPage.tsx
│   │   ├── PlannerPage.tsx
│   │   ├── FavoritesPage.tsx
│   │   ├── AboutPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces, enums, and models
│   ├── utils/
│   │   ├── recommendation.ts   # Canonical 5-factor scoring engine
│   │   └── storage.ts          # Defensive LocalStorage routines & event emitters
│   ├── App.tsx                 # Root router configuration
│   ├── main.tsx                # DOM root mount
│   └── index.css               # Global Tailwind CSS imports
├── index.html                  # HTML entry point with Open Graph metadata
├── metadata.json               # Platform manifest
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite bundler configuration
└── package.json                # Project dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/deshyatra.git
   cd deshyatra
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

### Type Checking & Linting

```bash
npm run lint
```

---

## 🗺️ Future Scope

- **Interactive Vector & Tile Maps**: Leaflet / Mapbox tile integration with custom topographic layers and cluster pins.
- **Offline PWA Support**: Service worker caching for offline access to saved itineraries and emergency travel guidelines.
- **Collaborative Trip Sharing**: Web Share API and exportable PDF travel vouchers for day-by-day itineraries.
- **Multilingual Support**: Hindi, Tamil, Bengali, Marathi, and Telugu localization for regional travelers.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
