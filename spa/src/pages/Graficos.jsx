import GraficosComparativa from "../components/GraficosComparativa";

export default function Graficos() {
  return (
    <div style={{ maxWidth: 940, margin: "0 auto", padding: "40px 40px", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ color: "#D4960A", fontFamily: "Georgia, serif", fontStyle: "italic", marginBottom: 6 }}>
        Estadisticas del proyecto
      </div>
      <h1 style={{ fontSize: 30, fontWeight: 800, color: "#1A1008", textTransform: "uppercase", marginBottom: 8 }}>
        Graficos de avance
      </h1>
      <p style={{ color: "#6B5240", marginBottom: 24 }}>
        Seguimiento mensual del progreso de traduccion y revision de la Coppermind en espanol.
      </p>
      <GraficosComparativa />
    </div>
  );
}
