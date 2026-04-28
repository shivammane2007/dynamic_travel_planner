import { useState, useEffect, useCallback } from "react";

export interface FavoritePackage {
  id: string;
  title: string;
  destination: string;
  description: string;
  image: string;
  price: number;
  duration: number;
  rating: number;
  reviews: number;
}

const STORAGE_KEY = "lux_favorites";

function loadFavorites(): FavoritePackage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites: FavoritePackage[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // silently fail if storage is unavailable
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritePackage[]>(loadFavorites);

  // Keep multiple tabs in sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setFavorites(loadFavorites());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const addFavorite = useCallback((pkg: FavoritePackage) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === pkg.id)) return prev;
      const next = [pkg, ...prev];
      saveFavorites(next);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f.id !== id);
      saveFavorites(next);
      return next;
    });
  }, []);

  const toggleFavorite = useCallback(
    (pkg: FavoritePackage) => {
      if (isFavorite(pkg.id)) {
        removeFavorite(pkg.id);
        return false; // removed
      } else {
        addFavorite(pkg);
        return true; // added
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  return { favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite };
}
