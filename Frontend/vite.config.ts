import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// Set USE_JAVA_BACKEND=true in .env to proxy /api to the Java backend
const useJavaBackend = process.env.USE_JAVA_BACKEND === "true";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    // Use port 5173 when running with Java backend so they don't conflict
    port: useJavaBackend ? 5173 : 8080,
    fs: {
      allow: [".", "./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
    // Proxy /api calls to Java backend when enabled
    proxy: useJavaBackend
      ? {
          "/api": {
            target: "http://localhost:8080",
            changeOrigin: true,
          },
        }
      : undefined,
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), ...(useJavaBackend ? [] : [expressPlugin()])],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
