import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const C = { cobreLight: "#B5451A", borde: "#E0D5C5", textoSec: "#6B5240" };

export default function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [rol, setRol] = useState("traductor");
  const [email, setEmail] = useState("demo@mentecobre.es");

  const handleLogin = () => {
    login(rol, email);
    onClose();
  };

  const roles = [
    { id: "traductor", label: "Traductor" },
    { id: "revisor", label: "Revisor" },
    { id: "admin", label: "Admin" }
  ];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
      <div style={{ background: "#fff", borderRadius: 10, padding: 24, width: 340, maxWidth: "90vw", fontFamily: "'Segoe UI', sans-serif" }}>
        <h2 style={{ marginTop: 0, fontSize: 20 }}>Iniciar sesion</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={{ width: "100%", padding: 10, border: `1px solid ${C.borde}`, borderRadius: 6, marginBottom: 10 }} />
        <input type="password" placeholder="Contrasena" style={{ width: "100%", padding: 10, border: `1px solid ${C.borde}`, borderRadius: 6, marginBottom: 14 }} />
        <div style={{ fontSize: 12, color: C.textoSec, marginBottom: 8 }}>Rol demo</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {roles.map((r) => (
            <button key={r.id} onClick={() => setRol(r.id)} style={{ textAlign: "left", padding: "8px 10px", borderRadius: 7, border: `1px solid ${rol === r.id ? C.cobreLight : C.borde}`, background: rol === r.id ? "#FFF3EE" : "#fff" }}>
              {r.label}
            </button>
          ))}
        </div>
        <button onClick={handleLogin} style={{ width: "100%", padding: 10, background: C.cobreLight, color: "#fff", border: "none", borderRadius: 7, marginBottom: 8 }}>
          Entrar
        </button>
        <button onClick={onClose} style={{ width: "100%", padding: 8, background: "none", border: "none", color: "#777" }}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
