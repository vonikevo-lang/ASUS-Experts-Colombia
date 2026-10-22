"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface DemoUser {
  nombre: string;
  tienda: string;
  ciudad: string;
  puntos: number;
}

export const DEFAULT_DEMO_USER: DemoUser = {
  nombre: "Laura M.",
  tienda: "Alkosto Av. 68",
  ciudad: "Bogotá",
  puntos: 1240,
};

export const LEVEL_STEP = 500;

export function levelFor(puntos: number) {
  return Math.floor(puntos / LEVEL_STEP) + 1;
}

export function levelProgress(puntos: number) {
  return ((puntos % LEVEL_STEP) / LEVEL_STEP) * 100;
}

interface QuizResult {
  score: number;
  total: number;
}

interface DemoState {
  loggedIn: boolean;
  user: DemoUser;
  completedModules: string[];
  quizResults: Record<string, QuizResult>;
}

const DEFAULT_STATE: DemoState = {
  loggedIn: false,
  user: DEFAULT_DEMO_USER,
  completedModules: [],
  quizResults: {},
};

const STORAGE_KEY = "asus-experts-demo-state";

interface DemoUserContextValue {
  state: DemoState;
  hydrated: boolean;
  login: () => void;
  logout: () => void;
  addPoints: (amount: number) => void;
  markModuleCompleted: (slug: string) => void;
  recordQuizResult: (slug: string, score: number, total: number) => void;
}

const DemoUserContext = createContext<DemoUserContextValue | null>(null);

export function DemoUserProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Lectura única de localStorage tras el montaje: evita el desajuste de
    // hidratación que daría leerlo durante el render (SSR no tiene acceso).
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setState({ ...DEFAULT_STATE, ...JSON.parse(raw) });
    } catch {
      // localStorage no disponible; se sigue con el estado por defecto.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // localStorage no disponible; el progreso solo dura esta sesión.
    }
  }, [state, hydrated]);

  const login = useCallback(() => {
    setState((prev) => ({ ...prev, loggedIn: true, user: DEFAULT_DEMO_USER }));
  }, []);

  const logout = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  const addPoints = useCallback((amount: number) => {
    setState((prev) => ({ ...prev, user: { ...prev.user, puntos: prev.user.puntos + amount } }));
  }, []);

  const markModuleCompleted = useCallback((slug: string) => {
    setState((prev) =>
      prev.completedModules.includes(slug)
        ? prev
        : { ...prev, completedModules: [...prev.completedModules, slug] },
    );
  }, []);

  const recordQuizResult = useCallback((slug: string, score: number, total: number) => {
    setState((prev) => ({
      ...prev,
      quizResults: { ...prev.quizResults, [slug]: { score, total } },
    }));
  }, []);

  const value = useMemo(
    () => ({ state, hydrated, login, logout, addPoints, markModuleCompleted, recordQuizResult }),
    [state, hydrated, login, logout, addPoints, markModuleCompleted, recordQuizResult],
  );

  return <DemoUserContext.Provider value={value}>{children}</DemoUserContext.Provider>;
}

export function useDemoUser() {
  const ctx = useContext(DemoUserContext);
  if (!ctx) throw new Error("useDemoUser debe usarse dentro de DemoUserProvider");
  return ctx;
}
