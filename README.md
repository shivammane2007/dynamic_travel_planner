<div align="center">

# ✈️ LUX TRAVEL PLANNER

### *A Full-Stack Luxury Travel Planning Application*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

> **VIT Pune — Information Technology | 2nd Year Major Course Project**
> Demonstrating core OOP concepts: Abstraction · Encapsulation · Inheritance · Polymorphism · Interfaces

---

[🚀 Live Demo](#running-the-project) · [📖 API Docs](#-api-endpoints) · [🎓 OOP Concepts](#-oop-concepts-course-reference) · [📁 Structure](#-project-structure)

</div>

---

## 📌 About The Project

**Lux Travel Planner** is a production-grade full-stack web application that allows users to browse luxury travel packages, view detailed itineraries, customize trips, and complete bookings — all through a premium, responsive UI.

The backend is built in **pure Java** without Spring Boot, using the **Javalin** HTTP framework and **HikariCP** connection pooling, showcasing manual implementation of OOP design patterns.

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🏝️ **Package Browsing** | Browse curated luxury travel packages with rich details |
| 📋 **Package Details** | View full itinerary, highlights, inclusions, and reviews |
| 📅 **Book Now Flow** | Complete booking form with validation and confirmation |
| 🎨 **Customize Trip** | Customize days, hotel class, flight class, activities with live price updates |
| 📝 **Travel Blog** | Read travel guides and destination stories |
| 👤 **Admin Dashboard** | Manage packages, bookings, and content |
| 📱 **Fully Responsive** | Works on mobile, tablet, and desktop |

---

## 🏗️ Project Structure

```
Lux Travel Planner/
│
├── 📁 Frontend/                      ← React SPA (Vite + TypeScript)
│   ├── client/
│   │   ├── components/               ← Reusable UI components
│   │   │   ├── ui/                   ← shadcn/ui component library (40+ components)
│   │   │   ├── Header.tsx            ← Navigation with mobile menu
│   │   │   ├── Footer.tsx            ← Site footer with links
│   │   │   ├── PackageCard.tsx       ← Travel package card
│   │   │   ├── BlogCard.tsx          ← Blog post card
│   │   │   ├── DestinationCard.tsx   ← Destination showcase card
│   │   │   └── CustomizeTripModal.tsx← Trip customizer with live pricing
│   │   ├── pages/
│   │   │   ├── Home.tsx              ← Landing page with hero, packages, testimonials
│   │   │   ├── Packages.tsx          ← Packages listing with filters
│   │   │   ├── PackageDetail.tsx     ← Detailed package view + booking sidebar
│   │   │   ├── BookingPage.tsx       ← Full booking form with validation
│   │   │   ├── Blog.tsx              ← Travel guides listing
│   │   │   ├── BlogDetail.tsx        ← Individual blog post
│   │   │   ├── About.tsx             ← About the company
│   │   │   ├── Contact.tsx           ← Contact form
│   │   │   ├── AdminDashboard.tsx    ← Admin panel
│   │   │   └── NotFound.tsx          ← 404 page
│   │   ├── hooks/                    ← Custom React hooks
│   │   ├── lib/                      ← Utility functions (cn, etc.)
│   │   ├── App.tsx                   ← Router setup (React Router 6 SPA)
│   │   └── global.css                ← TailwindCSS + custom CSS variables
│   ├── server/                       ← Express.js (Vite dev middleware)
│   │   ├── index.ts                  ← Express server setup
│   │   └── routes/                   ← API route handlers
│   ├── shared/
│   │   └── api.ts                    ← Shared TypeScript interfaces
│   ├── public/                       ← Static assets (images, favicon)
│   ├── vite.config.ts                ← Vite + proxy config
│   ├── tailwind.config.ts            ← TailwindCSS theme
│   ├── tsconfig.json                 ← TypeScript configuration
│   └── package.json                  ← NPM dependencies
│
├── 📁 Backend/                       ← Java REST API (No Spring Boot)
│   └── java-backend/
│       ├── src/main/java/com/luxtravel/
│       │   ├── Main.java             ← Entry point — wires Javalin + all controllers
│       │   ├── config/
│       │   │   └── DatabaseConfig.java← HikariCP connection pool setup
│       │   ├── models/               ← Entity classes (OOP: Encapsulation)
│       │   │   ├── BaseModel.java    ← Abstract base (id, createdAt, updatedAt)
│       │   │   ├── User.java
│       │   │   ├── Destination.java  ← Implements Exportable
│       │   │   ├── Trip.java         ← Implements Exportable
│       │   │   ├── Booking.java
│       │   │   └── Itinerary.java
│       │   ├── interfaces/           ← OOP: Interface Abstraction
│       │   │   ├── Repository.java   ← Generic CRUD contract
│       │   │   ├── Searchable.java   ← Search + filter contract
│       │   │   └── Exportable.java   ← CSV + JSON export contract
│       │   ├── repositories/         ← JDBC data layer (OOP: Inheritance)
│       │   │   ├── BaseRepository.java← Abstract template (PreparedStatement)
│       │   │   ├── UserRepository.java
│       │   │   ├── DestinationRepository.java ← Implements Searchable
│       │   │   ├── TripRepository.java
│       │   │   ├── BookingRepository.java
│       │   │   └── ItineraryRepository.java
│       │   ├── services/             ← Business logic (OOP: Inheritance + Polymorphism)
│       │   │   ├── BaseService.java  ← Abstract with hook methods
│       │   │   ├── UserService.java  ← BCrypt password hashing
│       │   │   ├── DestinationService.java
│       │   │   ├── TripService.java
│       │   │   ├── BookingService.java
│       │   │   └── ItineraryService.java
│       │   ├── controllers/          ← HTTP handlers (OOP: Polymorphism)
│       │   │   ├── BaseController.java← Abstract registerRoutes()
│       │   │   ├── UserController.java
│       │   │   ├── DestinationController.java
│       │   │   ├── TripController.java
│       │   │   ├── BookingController.java
│       │   │   └── ItineraryController.java
│       │   ├── dto/
│       │   │   ├── ApiResponse.java  ← Generic response wrapper ApiResponse<T>
│       │   │   └── PaginatedResponse.java
│       │   ├── exceptions/           ← Exception hierarchy (OOP: Inheritance)
│       │   │   ├── AppException.java ← Base runtime exception
│       │   │   ├── NotFoundException.java
│       │   │   ├── ValidationException.java
│       │   │   └── DatabaseException.java
│       │   └── utils/
│       │       ├── EnvUtil.java      ← .env loader (dotenv-java)
│       │       ├── JsonUtil.java     ← Gson serializer with LocalDate adapters
│       │       └── ValidationUtil.java← Email + null validation helpers
│       ├── src/main/resources/
│       │   ├── schema.sql            ← MySQL DDL (auto-runs on startup)
│       │   └── application.properties
│       └── pom.xml                   ← Maven build (shade plugin → fat JAR)
│
├── 📁 Dataset/                       ← Static data assets
│   ├── images/                       ← Travel destination images
│   ├── sql/schema.sql                ← MySQL schema reference
│   └── json/                         ← Future: destination data
│
├── .gitignore
├── .gitattributes                    ← LF line ending normalization
├── AGENTS.md                         ← Coding conventions & rules
└── README.md                         ← This file
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI framework |
| TypeScript | 5.9 | Type safety |
| Vite | 7.1 | Build tool + dev server |
| TailwindCSS | 3.4 | Utility-first styling |
| shadcn/ui + Radix UI | Latest | Accessible component library |
| React Router | 6.30 | Client-side SPA routing |
| TanStack Query | 5.84 | Server state management |
| Framer Motion | 12.x | Animations |
| Lucide React | 0.539 | Icon library |
| Sonner | 1.7 | Toast notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17 (LTS) | Core language |
| Javalin | 6.3 | Lightweight HTTP server (embedded Jetty) |
| HikariCP | 5.1 | JDBC connection pooling |
| MySQL Connector/J | 8.3 | MySQL JDBC driver |
| Gson | 2.10 | JSON serialization |
| jBCrypt | 0.4 | Password hashing |
| dotenv-java | 3.0 | `.env` file loading |
| SLF4J + Simple | 2.0 | Logging |
| Maven + Shade Plugin | 3.x | Build + fat JAR packaging |

### Database
| Technology | Purpose |
|------------|---------|
| MySQL 8.x | Relational database |
| HikariCP | Connection pool (up to 10 connections) |

---

## 🚀 Running the Project

### Prerequisites

| Requirement | Version |
|------------|---------|
| Node.js | 18+ |
| npm or pnpm | Latest |
| Java JDK | 17+ |
| Maven | 3.6+ |
| MySQL | 8.x |

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/shivammane2007/dynamic_travel_planner.git
cd dynamic_travel_planner
```

---

### Step 2 — Setup Database

```sql
-- In MySQL client or Workbench:
CREATE DATABASE lux_travel;
-- The schema will auto-initialize on first Java backend run
```

---

### Step 3 — Configure Backend Environment

```bash
# Create Backend/.env
cp Backend/.env.example Backend/.env    # or create manually
```

Edit `Backend/.env`:
```env
JAVA_PORT=8080
DB_HOST=localhost
DB_PORT=3306
DB_NAME=lux_travel
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_POOL_SIZE=10
CORS_ORIGIN=http://localhost:5173
```

---

### Step 4 — Build & Run Java Backend

```bash
cd Backend/java-backend

# Build the fat JAR
mvn clean package -DskipTests

# Run the server
java -jar target/lux-travel-backend-1.0.jar
```

> ✅ Java backend starts at: **`http://localhost:8080`**
> Health check: `GET http://localhost:8080/api/health`

---

### Step 5 — Configure & Run Frontend

```bash
cd Frontend

# Install dependencies
npm install

# Create Frontend/.env
echo "USE_JAVA_BACKEND=true" > .env
echo "CORS_ORIGIN=http://localhost:5173" >> .env

# Start dev server
npm run dev
```

> ✅ Frontend starts at: **`http://localhost:5173`**
> All `/api/*` requests are automatically proxied to Java backend at port 8080.

---

### Step 6 — Build for Production

```bash
# Frontend build
cd Frontend
npm run build
# → Output: Frontend/dist/spa/

# Java fat JAR (already built above)
# → Output: Backend/java-backend/target/lux-travel-backend-1.0.jar
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/health` | Server + DB health check | Public |
| `POST` | `/api/users/register` | Register new user | Public |
| `POST` | `/api/users/login` | Login (BCrypt verification) | Public |
| `GET` | `/api/users` | List all users | Admin |
| `GET` | `/api/destinations` | List destinations (paginated + search) | Public |
| `POST` | `/api/destinations` | Create destination | Admin |
| `GET` | `/api/destinations/:id` | Get destination by ID | Public |
| `PUT` | `/api/destinations/:id` | Update destination | Admin |
| `DELETE` | `/api/destinations/:id` | Delete destination | Admin |
| `GET` | `/api/trips` | List trips (filter by userId, status) | Auth |
| `POST` | `/api/trips` | Create new trip | Auth |
| `GET` | `/api/trips/:id` | Get trip by ID | Auth |
| `GET` | `/api/bookings` | List bookings | Auth |
| `POST` | `/api/bookings` | Create booking | Auth |
| `GET` | `/api/itinerary/:tripId` | Get itinerary for a trip | Auth |
| `POST` | `/api/itinerary/:tripId` | Add itinerary item | Auth |

### Sample Response Format

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

---

## 🎓 OOP Concepts (Course Reference)

This project was built to demonstrate all four pillars of Object-Oriented Programming:

### 1. 🔒 Encapsulation
All model classes use **private fields with public getters/setters**:
```java
// models/User.java
public class User extends BaseModel {
    private String name;      // private
    private String email;     // private
    private String password;  // private — BCrypt hashed

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
```

### 2. 🏗️ Abstraction
Abstract base classes define structure without implementation:
```java
// repositories/BaseRepository.java
public abstract class BaseRepository<T> {
    protected abstract T mapRow(ResultSet rs) throws SQLException;
    protected abstract String getTableName();
    // Concrete JDBC template methods provided
}
```

### 3. 🧬 Inheritance
Every layer uses inheritance from a common base:
```
BaseModel         ← User, Destination, Trip, Booking, Itinerary
BaseRepository<T> ← UserRepository, DestinationRepository, TripRepository...
BaseService<T,R>  ← UserService, DestinationService, TripService...
BaseController    ← UserController, DestinationController, TripController...
AppException      ← NotFoundException, ValidationException, DatabaseException
```

### 4. 🔄 Polymorphism
Controllers are dispatched polymorphically at startup:
```java
// Main.java
List<BaseController> controllers = List.of(
    new UserController(userService),
    new DestinationController(destinationService),
    new TripController(tripService),
    new BookingController(bookingService),
    new ItineraryController(itineraryService)
);
// Polymorphic method dispatch
controllers.forEach(c -> c.registerRoutes(app));
```

### 5. 📐 Interfaces
Generic contracts enforced across the system:
```java
// interfaces/Repository.java
public interface Repository<T, ID> {
    T findById(ID id) throws NotFoundException;
    List<T> findAll();
    T save(T entity);
    T update(T entity);
    void delete(ID id);
}

// interfaces/Searchable.java
public interface Searchable<T> {
    List<T> search(String query);
    List<T> filter(Map<String, String> filters);
}

// interfaces/Exportable.java
public interface Exportable {
    String toCsv();
    String toJson();
}
```

### 6. 🧮 Generics
Type-safe wrappers for API responses:
```java
ApiResponse<User> response = ApiResponse.success(user, "User created");
PaginatedResponse<Destination> paged = new PaginatedResponse<>(items, total, page, size);
```

---

## 📁 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, featured packages, destinations, testimonials |
| `/packages` | Packages | Browse all travel packages |
| `/package/:id` | Package Detail | Full details + Book Now + Customize Trip |
| `/booking/:id` | Booking | Complete booking form with validation |
| `/blog` | Blog | Travel guides and stories |
| `/blog/:slug` | Blog Detail | Individual blog post |
| `/about` | About | Company story and team |
| `/contact` | Contact | Contact form |
| `/admin` | Admin Dashboard | Manage packages, bookings, content |

---

## 👨‍💻 Author

**Shivam Mane**
- GitHub: [@shivammane2007](https://github.com/shivammane2007)
- Institution: VIT Pune — Information Technology, 2nd Year

---

## 📄 License

This project is created for educational purposes as part of a university course project.

---

<div align="center">

Made with ❤️ using React + Java | VIT Pune 2026

</div>
