import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import GraficosComparativa from "../components/GraficosComparativa";

export default function Inicio() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash !== "#el-avance") return;
    const id = window.setTimeout(() => {
      document.getElementById("el-avance")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(id);
  }, [location.pathname, location.hash]);

  return (
    <>
      {/* —— Proyecto (contenido principal de la página) —— */}
      <div className="container-fluid pt-5 pb-5">
        <div className="container">
          <div className="section-title position-relative text-center mx-auto mb-5 pb-3" style={{ maxWidth: "600px" }}>
            <h2 className="app-text-primary font-secondary">Sobre el proyecto</h2>
            <h1 className="display-4 text-uppercase">Bienvenido a la mentecobre</h1>
          </div>
          <div className="row gx-5 mb-5">
            <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: "250px" }}>
              <div className="position-relative h-75">
                <img
                  className="position-absolute h-100"
                  src="img/LogoRecurso 2.png"
                  style={{ objectFit: "cover" }}
                  alt="Logo Mentecobre"
                />
              </div>
            </div>
            <div className="col-lg-6 pb-5">
              <h4 className="mb-4">Reuniendo fragmentos de sabiduría del Cosmere para quienes leen y sueñan en español</h4>
              <p className="mb-5">
                Desde 2021, la Coppermind en español ha sido un proyecto impulsado por la pasión por el Cosmere y el deseo de compartir su conocimiento con toda la comunidad hispanohablante. Cada entrada, cada fragmento de información y cada guía se construyen con cuidado para que lectores y curiosos puedan explorar los mundos, personajes y secretos de Brandon Sanderson de manera clara y accesible.
              </p>

              <div className="row g-5">
                <div className="col-sm-6">
                  <div
                    className="d-flex align-items-center justify-content-center app-bg-primary border-inner mb-4"
                    style={{ width: "90px", height: "90px" }}
                  >
                    <i className="bi bi-star-fill fs-2 text-white"></i>
                  </div>
                  <h4 className="text-uppercase">CALIDAD</h4>
                  <p className="mb-0">Cada traducción se revisa de forma minuciosa</p>
                </div>
                <div className="col-sm-6">
                  <div
                    className="d-flex align-items-center justify-content-center app-bg-primary border-inner mb-4"
                    style={{ width: "90px", height: "90px" }}
                  >
                    <i className="bi bi-globe2 fs-2 text-white"></i>
                  </div>
                  <h4 className="text-uppercase">AVANCE</h4>
                  <p className="mb-0">Más del 80% traducido al español</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* —— Avance: cifras y gráficos (ancla #el-avance) —— */}
      <div
        id="el-avance"
        className="container-fluid app-bg-secondary py-4 py-lg-5 border-top border-bottom"
        style={{ borderColor: "#E0D5C5" }}
      >
        <div className="container">
          <div className="section-title position-relative text-center mx-auto mb-3 pb-3" style={{ maxWidth: "720px" }}>
            <h2 className="app-text-primary font-secondary">Avance en la Coppermind en español</h2>
            <h1 className="display-4 text-uppercase">¿Cómo vamos?</h1>
          </div>
        </div>

        <div className="container" style={{ maxWidth: "1080px" }}>
          <GraficosComparativa />
        </div>
      </div>
    </>
  );
}
