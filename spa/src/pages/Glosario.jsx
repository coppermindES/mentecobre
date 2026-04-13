import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const C = { cobreLight: "#B5451A", dorado: "#D4960A", borde: "#E0D5C5", textoSec: "#6B5240", texto: "#1A1008" };
const TERMINOS = [
  { en: "Nikaro", es: "Nikaro", uni: "Cosmere" },
  { en: "Hion", es: "Hion", uni: "Cosmere" },
  { en: "Yoki-hijo", es: "Yoki-haijo", uni: "Cosmere" },
  { en: "Hijo", es: "Haijo", uni: "Cosmere" },
  { en: "Virtuosity", es: "Virtuosismo", uni: "Cosmere" },
  { en: "Yumi", es: "Yumi", uni: "Cosmere" },
  { en: "Nightmare", es: "Pesadilla", uni: "Cosmere" },
  { en: "Earth (Frugal Wizard)", es: "Tierra (Mago frugal)", uni: "No Cosmere" },
  { en: "Skyward Legacy", es: "Skyward Legacy", uni: "Cytoverse" },
  { en: "Tress", es: "Trenza", uni: "Cosmere" },
  { en: "Sapphire Sea", es: "Mar Zafiro", uni: "Cosmere" },
  { en: "Rose Sea", es: "Mar Rosa", uni: "Cosmere" },
  { en: "Midnight Sea", es: "Mar de Medianoche", uni: "Cosmere" },
  { en: "Lunagree", es: "Lunacuerdo", uni: "Cosmere" },
  { en: "Lumar", es: "Lumar", uni: "Cosmere" },
  { en: "Luhel bond", es: "Vinculo Luhel", uni: "Cosmere" },
  { en: "Huck", es: "Huck", uni: "Cosmere" },
  { en: "Emerald Sea", es: "Mar Esmeralda", uni: "Cosmere" },
  { en: "Dragonsteel (metal)", es: "Acero de dragon", uni: "Cosmere" },
  { en: "Crimson Sea", es: "Mar Carmesi", uni: "Cosmere" },
  { en: "Aether spores", es: "Esporas de eter", uni: "Cosmere" },
  { en: "Yolen", es: "Yolen", uni: "Cosmere" },
  { en: "Yelig-nar", es: "Yelig-nar", uni: "Cosmere" },
  { en: "Wyndle", es: "Wyndle", uni: "Cosmere" },
  { en: "Whimsy", es: "Capricho", uni: "Cosmere" },
  { en: "Warbreaker", es: "El aliento de los dioses", uni: "Cosmere" },
  { en: "Voidlight", es: "Luz del vacio", uni: "Cosmere" },
  { en: "Voidbringer", es: "Portadores del Vacio", uni: "Cosmere" },
  { en: "Vin", es: "Vin", uni: "Cosmere" },
  { en: "Vasher", es: "Vasher", uni: "Cosmere" },
  { en: "Urithiru", es: "Urithiru", uni: "Cosmere" },
  { en: "Unmade", es: "Deshecho", uni: "Cosmere" },
  { en: "Twinborn", es: "Nacidoble", uni: "Cosmere" },
  { en: "Truthless", es: "Sinverdad", uni: "Cosmere" },
  { en: "Tin", es: "Estano", uni: "Cosmere" },
  { en: "Thunderclast", es: "Tronador", uni: "Cosmere" },
  { en: "Threnody", es: "Treno", uni: "Cosmere" }
];
const CATEGORIAS = [
  { en: "Category:Update for White Sand", es: "Categoria:Actualizacion para Arena Blanca" },
  { en: "Category:Update for Bastille Versus the Evil Librarians", es: "Categoria:Actualizacion para Bastille contra los bibliotecarios malvados" },
  { en: "Category:Update for The Bands of Mourning", es: "Categoria:Actualizacion para Brazales de Duelo (libro)" },
  { en: "Category:Update for Calamity", es: "Categoria:Actualizacion para Calamity" },
  { en: "Category:Update for Cytonic (book)", es: "Categoria:Actualizacion para Citonica (libro)" },
  { en: "Category:Update for Edgedancer (novella)", es: "Categoria:Actualizacion para Danzante del Filo (novella)" },
  { en: "Category:Update for Defiant (book)", es: "Categoria:Actualizacion para Desafiante (libro)" },
  { en: "Category:Update for The Sunlit Man", es: "Categoria:Actualizacion para El Hombre Iluminado" },
  { en: "Category:Update for The Lost Metal", es: "Categoria:Actualizacion para El metal perdido" },
  { en: "Category:Update for Rhythm of War", es: "Categoria:Actualizacion para El ritmo de la guerra" },
  { en: "Category:Update for Dawnshard (novella)", es: "Categoria:Actualizacion para Esquirla del Amanecer (novella)" },
  { en: "Category:Update for Starsight", es: "Categoria:Actualizacion para Estelar" },
  { en: "Category:Update for Oathbringer", es: "Categoria:Actualizacion para Juramentada" },
  { en: "Category:Update for Legion: Skin Deep", es: "Categoria:Actualizacion para Legion: A flor de piel" },
  { en: "Category:Update for Mistborn: Secret History", es: "Categoria:Actualizacion para Mistborn: historia secreta" },
  { en: "Category:Update for Words of Radiance", es: "Categoria:Actualizacion para Palabras radiantes" },
  { en: "Category:Update for Shadows of Self", es: "Categoria:Actualizacion para Sombras de identidad" },
  { en: "Category:Update for Tress of the Emerald Sea", es: "Categoria:Actualizacion para Trenza del mar Esmeralda" },
  { en: "Category:Update for Wind and Truth", es: "Categoria:Actualizacion para Viento y verdad" },
  { en: "Category:Update for Yumi and the Nightmare Painter", es: "Categoria:Actualizacion para Yumi y el pintor de pesadillas" },
  { en: "Category:Administration", es: "Categoria:Administracion" },
  { en: "Category:Aircraft", es: "Categoria:Aeronaves" },
  { en: "Category:Aimia", es: "Categoria:Aimia" },
  { en: "Category:Akinah", es: "Categoria:Akinah" },
  { en: "Category:Alethkar", es: "Categoria:Alezkar" },
  { en: "Category:Aliases", es: "Categoria:Alias" },
  { en: "Category:Allomancy", es: "Categoria:Alomancia" },
  { en: "Category:Allomancers", es: "Categoria:Alomantes" },
  { en: "Category:Highprinces", es: "Categoria:Altos principes" },
  { en: "Category:Old Magic", es: "Categoria:Antigua Magia" }
];

export default function Glosario() {
  const { user } = useAuth();
  const [tab, setTab] = useState("busqueda");
  const [busqueda, setBusqueda] = useState("");
  const termsFiltrados = TERMINOS.filter((t) => t.en.toLowerCase().includes(busqueda.toLowerCase()) || t.es.toLowerCase().includes(busqueda.toLowerCase()));
  const categoriasFiltradas = CATEGORIAS.filter((c) => c.en.toLowerCase().includes(busqueda.toLowerCase()) || c.es.toLowerCase().includes(busqueda.toLowerCase()));
  const tabStyle = (id) => ({ padding: "10px 22px", border: "none", borderBottom: `2px solid ${tab === id ? C.cobreLight : "transparent"}`, background: "none", color: tab === id ? C.cobreLight : C.textoSec, cursor: id === "categorias" && !user ? "not-allowed" : "pointer" });

  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 40px", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ color: C.dorado, fontFamily: "Georgia, serif", fontStyle: "italic", marginBottom: 6 }}>Terminologia del Cosmere</div>
      <h1 style={{ fontSize: 30, fontWeight: 800, color: C.texto, textTransform: "uppercase", marginBottom: 22 }}>Glosario</h1>
      <div style={{ display: "flex", borderBottom: `2px solid ${C.borde}`, marginBottom: 24 }}>
        <button style={tabStyle("busqueda")} onClick={() => setTab("busqueda")}>Busqueda de terminos</button>
        {user && (
          <button style={tabStyle("categorias")} onClick={() => setTab("categorias")}>
            Categorias
          </button>
        )}
      </div>

      {tab === "busqueda" && (
        <div>
          <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar en ingles o espanol..." style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.borde}`, borderRadius: 8, marginBottom: 16 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 140px", gap: 12 }}>
            {termsFiltrados.map((t) => (
              <div key={t.en} style={{ display: "contents" }}>
                <div style={{ background: "#fff", border: `1px solid ${C.borde}`, padding: "10px 12px", borderRadius: 6 }}>{t.en}</div>
                <div style={{ background: "#fff", border: `1px solid ${C.borde}`, padding: "10px 12px", borderRadius: 6 }}>{t.es}</div>
                <div style={{ background: "#fff", border: `1px solid ${C.borde}`, padding: "10px 12px", borderRadius: 6 }}><span style={{ fontSize: 11, background: "#FFF3EE", color: C.cobreLight, padding: "3px 10px", borderRadius: 10 }}>{t.uni}</span></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "categorias" && user && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
          <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar categoria en ingles o espanol..." style={{ gridColumn: "1 / -1", width: "100%", padding: "10px 14px", border: `1px solid ${C.borde}`, borderRadius: 8, marginBottom: 2 }} />
          <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {categoriasFiltradas.map((c) => (
              <div key={c.en} style={{ display: "contents" }}>
                <div style={{ background: "#fff", border: `1px solid ${C.borde}`, padding: "10px 12px", borderRadius: 6 }}>{c.en}</div>
                <div style={{ background: "#fff", border: `1px solid ${C.borde}`, padding: "10px 12px", borderRadius: 6 }}>{c.es}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
