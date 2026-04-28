# ✈️ Lux Travel Planner

> A full-stack luxury travel planning application — VIT Pune, Information Technology, 2nd Year Major Project.

[![Tech Stack](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite%20%2B%20TypeScript-blue)](https://vitejs.dev/)
[![Backend](https://img.shields.io/badge/Backend-Java%2017%20%2B%20Javalin%20%2B%20MySQL-orange)](https://javalin.io/)
[![Styling](https://img.shields.io/badge/Styling-TailwindCSS%203%20%2B%20shadcn%2Fui-purple)](https://tailwindcss.com/)

---

## 📁 Project Structure

```
Lux Travel Planner/
│
├── Frontend/                    ← React SPA + Vite + Express (Fusion Starter)
│   ├── client/                  ← React components, pages, hooks, utils
│   │   ├── components/          ← Reusable UI components (shadcn/ui + custom)
│   │   ├── pages/               ← Route-level page components
│   │   ├── hooks/               ← Custom React hooks
│   │   └── lib/                 ← Utilities (cn, etc.)
│   ├── server/                  ← Node.js Express API (dev middleware)
│   │   └── routes/              ← Express route handlers
│   ├── shared/                  ← Types shared between client & server
│   ├── public/                  ← Static assets (images, favicon, robots.txt)
│   ├── vite.config.ts           ← Vite configuration (proxy + Express middleware)
│   ├── tailwind.config.ts       ← TailwindCSS theme configuration
│   ├── tsconfig.json            ← TypeScript configuration
│   ├── package.json             ← NPM dependencies and scripts
│   └── .env                     ← Frontend environment variables
│
├── Backend/                     ← Java REST API (Javalin + JDBC + MySQL)
│   ├── java-backend/
│   │   ├── src/main/java/com/luxtravel/
│   │   │   ├── Main.java        ← Entry point (starts Javalin server)
│   │   │   ├── config/          ← DatabaseConfig (HikariCP), ServerConfig
│   │   │   ├── models/          ← BaseModel, User, Destination, Trip, Booking, Itinerary
│   │   │   ├── interfaces/      ← Repository<T>, Searchable<T>, Exportable
│   │   │   ├── repositories/    ← JDBC data access layer (BaseRepository + 5 concrete)
│   │   │   ├── services/        ← Business logic layer (BaseService + 5 concrete)
│   │   │   ├── controllers/     ← HTTP handlers via Javalin (BaseController + 5 concrete)
│   │   │   ├── dto/             ← ApiResponse<T>, PaginatedResponse<T>
│   │   │   ├── exceptions/      ← AppException hierarchy
│   │   │   └── utils/           ← EnvUtil, JsonUtil, ValidationUtil
│   │   ├── src/main/resources/
│   │   │   ├── schema.sql       ← MySQL DDL (auto-runs on startup)
│   │   │   └── application.properties
│   │   └── pom.xml              ← Maven build (Java 17 + Javalin + HikariCP + MySQL)
│   └── .env                     ← Backend database/server configuration
│
├── Dataset/                     ← Static data assets
│   ├── images/                  ← Travel destination images
│   │   ├── indoneshia.webp
│   │   ├── japan_tokyo.webp
│   │   └── tokyo adventure.jpg
│   ├── sql/
│   │   └── schema.sql           ← MySQL schema reference copy
│   └── json/                    ← Future: destination data JSON files
│
├── Archive/                     ← Archived build artifacts (not committed)
│   ├── dist/                    ← Old production build output
│   └── .builder/                ← Builder.io temp files
│
├── .gitignore                   ← Git ignore rules
├── .env.backup                  ← Backup of original .env (DO NOT COMMIT)
└── README.md                    ← This file
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite 7, TailwindCSS 3, shadcn/ui, Radix UI |
| **Routing** | React Router 6 (SPA mode) |
| **State** | TanStack Query (React Query) |
| **Animation** | Framer Motion |
| **Node API** | Express 5 (dev middleware via Vite plugin) |
| **Java API** | Javalin 6 (embedded Jetty, no Spring Boot) |
| **Database** | MySQL 8 + HikariCP connection pool |
| **ORM** | Raw JDBC with PreparedStatement (Template Method pattern) |
| **Security** | BCrypt password hashing (jbcrypt) |
| **Build Tool** | Vite (frontend) + Maven with shade plugin (Java) |

---

## 🚀 Running the Project

### Prerequisites
- Node.js 18+ / npm or pnpm
- Java 17+
- Maven 3.6+
- MySQL 8.x

### Step 1 — Configure Environment

```bash
# Copy and edit Backend environment
cp Backend/.env Backend/.env.local
# Set your MySQL password:
# DB_PASSWORD=your_mysql_password
```

### Step 2 — Start Java Backend

```bash
cd Backend/java-backend

# Option A: Run pre-built JAR (if already compiled)
java -jar target/lux-travel-backend-1.0.jar

# Option B: Build and run via Maven
mvn clean package -DskipTests
java -jar target/lux-travel-backend-1.0.jar
```

> Java backend starts at: **http://localhost:8080**  
> Health check: `GET http://localhost:8080/api/health`

### Step 3 — Start Frontend

```bash
cd Frontend

# Install dependencies (first time only)
npm install
# or: pnpm install

# Start development server
npm run dev
```

> Frontend starts at: **http://localhost:5173**  
> All `/api/*` requests are proxied to the Java backend at port 8080.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server + DB health check |
| `GET` | `/api/destinations` | List destinations (paginated + search) |
| `POST` | `/api/destinations` | Create destination |
| `GET` | `/api/trips` | List trips (filter by userId, status) |
| `POST` | `/api/trips` | Create trip |
| `GET` | `/api/bookings` | List bookings (filter by tripId, status) |
| `POST` | `/api/bookings` | Create booking |
| `GET` | `/api/itinerary/:tripId` | Get itinerary for a trip |
| `POST` | `/api/users/register` | Register new user |
| `POST` | `/api/users/login` | Login (returns session token) |

---

## 🎓 OOP Concepts Used (Course Reference)

| Concept | Implementation |
|---------|---------------|
| **Abstraction** | `BaseModel`, `BaseRepository`, `BaseService`, `BaseController` |
| **Encapsulation** | Private fields + getters/setters in all model classes |
| **Inheritance** | All repos → `BaseRepository<T>`, all services → `BaseService<T,R>` |
| **Polymorphism** | `controllers.forEach(BaseController::registerRoutes)` |
| **Interfaces** | `Repository<T,ID>`, `Searchable<T>`, `Exportable` |
| **Generics** | `ApiResponse<T>`, `PaginatedResponse<T>`, `BaseService<T,R>` |
| **Exception Hierarchy** | `AppException` → `NotFoundException`, `ValidationException`, `DatabaseException` |

---

## 📦 Build for Production

```bash
# Frontend production build
cd Frontend
npm run build
# Output: Frontend/dist/spa/

# Java backend fat JAR
cd Backend/java-backend
mvn clean package -DskipTests
# Output: Backend/java-backend/target/lux-travel-backend-1.0.jar
```

---

*VIT Pune — Information Technology, 2nd Year Course Project, 2026*
