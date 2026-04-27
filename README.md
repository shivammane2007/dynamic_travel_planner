# Dynamic Travel Planner

Full-stack scaffold based on the supplied master prompt.

## Structure

- `frontend/`: React + Vite + Tailwind + Framer Motion
- `backend/`: Java 17 + `HttpServer` + JWT + strategy-pattern recommendation engine

## Current Backend Note

The backend follows the requested controller/service/repository/strategy structure and exposes the requested routes, but the repository implementations are currently seeded in-memory so the app can function without a MySQL instance during scaffolding. `DatabaseConfig` is in place for a later JDBC-backed repository swap.

## Frontend Commands

```bash
cd frontend
npm install
npm run dev
```

## Backend Commands

Install Maven first, then run:

```bash
cd backend
mvn package
java -jar target/dynamic-travel-planner-backend-1.0.0-jar-with-dependencies.jar
```

The backend listens on `http://localhost:8080`.
The frontend expects the API at `http://localhost:8080/api`.
