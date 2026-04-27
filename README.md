# ✈️ Dynamic Travel Planner

A premium, full-stack travel intelligence platform featuring a weighted recommendation engine and a cinematic, high-performance UI.

## 🌟 Key Features

- **Weighted Recommendation Engine**: Beyond simple filtering, our engine uses a strategy-pattern scoring logic to rank destinations based on theme, budget, and duration weights.
- **Cinematic Performance**: Buttery-smooth scrolling (60 FPS) powered by **Lenis + GSAP ScrollTrigger**, with GPU-accelerated transitions and lazy-viewport reveals.
- **Editorial Design**: A luxurious "boutique shop" aesthetic using warm tones, glassmorphism, and modern Jakarta Sans typography.
- **Robust Backend**: A structured Java 17 backend implementing Controller-Service-Repository architecture with JWT authentication.

## 🏗️ Project Structure

- **`frontend/`**: React 18 + Vite + Tailwind CSS + Framer Motion + GSAP.
- **`backend/`**: Java 17 + `com.sun.net.httpserver` + JWT + Strategy Pattern.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Java 17+
- Maven (optional, for building the backend JAR)

### 1. Backend Setup

The backend uses in-memory repositories by default for instant setup.

```bash
cd backend
# Build the project
mvn clean package

# Run the server
java -cp "out;lib/*" com.travelplanner.Main
```

The backend listens on `http://localhost:8080`.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## ⚡ Performance Optimizations

- **GPU Acceleration**: All major sections use `transform: translateZ(0)` to offload rendering to the GPU.
- **Scroll Syncing**: Lenis smooth scroll is synced with GSAP's tick for frame-perfect animations.
- **Lazy Execution**: Framer Motion animations use `viewport={{ once: true }}` to reduce background overhead.
- **Memoization**: Expensive UI components (like Destination Cards) are wrapped in `React.memo` to prevent redundant re-renders.

## 🔒 Authentication

The platform uses JWT-based authentication. Upon login, a secure token is stored in `localStorage` and attached to all subsequent API requests via an Axios interceptor.
