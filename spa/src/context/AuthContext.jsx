import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const PERIODOS_KEY = "mentecobre_periodos_descanso";

function loadPeriodos() {
  try {
    const raw = localStorage.getItem(PERIODOS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function savePeriodos(arr) {
  localStorage.setItem(PERIODOS_KEY, JSON.stringify(arr));
}

function addMonths(base, n) {
  const d = new Date(base);
  d.setMonth(d.getMonth() + n);
  return d;
}

/** Período vigente: fecha de fin aún no pasada. */
export function periodoDescansoActivo(periodos, userId) {
  const now = Date.now();
  return periodos.find((p) => p.userId === userId && new Date(p.hastaISO).getTime() > now) || null;
}

/** Solo períodos aún vigentes (para vista admin). */
export function periodosDescansoVigentes(periodos) {
  const now = Date.now();
  return periodos.filter((p) => new Date(p.hastaISO).getTime() > now);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [periodosDescanso, setPeriodosDescanso] = useState(() => loadPeriodos());

  const syncPeriodos = (next) => {
    setPeriodosDescanso(next);
    savePeriodos(next);
  };

  const login = (arg1, arg2) => {
    const rol = typeof arg1 === "object" ? arg1?.rol : arg1;
    const email = typeof arg1 === "object" ? arg1?.email : arg2;
    const id = (email || "demo@mentecobre.es").toLowerCase().trim();

    const universosAsignados =
      rol === "admin" ? [] : ["Archivo de las tormentas", "Nacidos de la bruma", "Elantris", "Cosmere", "El alma del emperador"];

    setUser({
      id,
      nombre: rol === "admin" ? "Admin (demo)" : "Usuario Demo",
      email: email || "demo@mentecobre.es",
      rol,
      universosAsignados
    });
  };

  const logout = () => setUser(null);

  /**
   * Activa un descanso de 3 meses desde ya: sin aprobación ni contacto de administración.
   */
  const solicitarDescanso = () => {
    if (!user) return { ok: false, reason: "no_user" };
    if (user.rol === "admin") return { ok: false, reason: "no_admin" };
    if (periodoDescansoActivo(periodosDescanso, user.id)) return { ok: false, reason: "ya_activo" };

    const desde = new Date();
    const hasta = addMonths(desde, 3);
    const entry = {
      id: `${user.id}-${Date.now()}`,
      userId: user.id,
      nombre: user.nombre,
      rol: user.rol,
      desdeISO: desde.toISOString(),
      hastaISO: hasta.toISOString()
    };
    syncPeriodos([...periodosDescanso, entry]);
    return { ok: true, hastaISO: entry.hastaISO };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, periodosDescanso, solicitarDescanso }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
