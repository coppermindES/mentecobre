export default function JuegoEmbed({ title, src }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px", fontFamily: "'Segoe UI', sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>{title}</h1>
      <div style={{ background: "#fff", border: "1px solid #E0D5C5", borderRadius: 8, overflow: "hidden" }}>
        <iframe
          title={title}
          src={src}
          style={{ width: "100%", height: "80vh", border: "none" }}
        />
      </div>
    </div>
  );
}
