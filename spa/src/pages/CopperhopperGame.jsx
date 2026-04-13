import { useEffect } from "react";
import "./copperhopper-mentecobre.css";

function onResetGame() {
  if (typeof window.resetGame === "function") window.resetGame();
}

export default function CopperhopperGame() {
  useEffect(() => {
    const cleanup = () => {
      const root = document.getElementById("copperhopper-root");
      if (root && window.__chHopperHandler) {
        root.removeEventListener("click", window.__chHopperHandler);
        window.__chHopperHandler = null;
      }
      if (typeof window.cleanupBootstrapModalArtifacts === "function") {
        window.cleanupBootstrapModalArtifacts();
      } else {
        document.body.classList.remove("modal-open");
        document.body.style.removeProperty("padding-right");
        document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
      }
    };

    const run = () => {
      if (typeof window.__copperhopperStart === "function") {
        window.__copperhopperStart();
      }
    };

    if (window.__copperhopperStart) {
      run();
      return cleanup;
    }

    let script = document.querySelector("script[data-copperhopper-runtime]");
    if (!script) {
      script = document.createElement("script");
      script.src = "/games/copperhopper-runtime.js";
      script.async = true;
      script.dataset.copperhopperRuntime = "true";
      script.onload = run;
      document.body.appendChild(script);
    } else {
      script.addEventListener("load", run, { once: true });
      if (window.__copperhopperStart) run();
    }

    return cleanup;
  }, []);

  return (
    <>
      <div className="container-fluid pt-4">
        <div className="container">
          <div className="section-title position-relative text-center mx-auto mb-4 pb-3" style={{ maxWidth: "600px" }}>
            <h2 className="app-text-primary font-secondary">WikiRace en la Coppermind</h2>
            <h1 className="display-4 text-uppercase">Copperhopper</h1>
          </div>
          <p className="text-center text-muted mx-auto mb-0" style={{ maxWidth: "640px" }}>
            Navega entre artículos ya traducidos hasta alcanzar el objetivo. Los datos salen en vivo de la wiki en español.
          </p>
        </div>
      </div>

      <div id="copperhopper-root" className="ch-page">
        <div className="game-container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="article-card" id="fromArticle">
                <h3 className="article-title">Artículo de inicio</h3>
                <div className="article-info" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="article-card" id="toArticle">
                <h3 className="article-title">Artículo objetivo</h3>
                <div className="article-info" />
              </div>
            </div>
          </div>

          <div className="loading" id="loadingSpinner" style={{ display: "none" }}>
            <div className="loading-spinner" />
          </div>

          <div className="modal fade" id="surrenderModal" tabIndex={-1} aria-labelledby="surrenderModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="surrenderModalLabel">
                    Te has rendido
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
                </div>
                <div className="modal-body">
                  <p>
                    No has llegado desde <span id="startArticle" className="fw-bold" /> hasta <span id="targetArticle" className="fw-bold" />.
                  </p>
                  <div id="optimalPath" />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn app-btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                  <button type="button" className="btn app-btn-primary" data-bs-dismiss="modal" onClick={onResetGame}>
                    Nuevo juego
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="victoryModal" tabIndex={-1} aria-labelledby="victoryModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="victoryModalLabel">
                    ¡Felicidades!
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
                </div>
                <div className="modal-body">
                  <p>
                    Has llegado desde <span id="victoryStartArticle" className="fw-bold" /> hasta <span id="victoryTargetArticle" className="fw-bold" /> en{" "}
                    <span id="victoryMoves" className="fw-bold" /> movimientos.
                  </p>
                  <p>
                    Tiempo total: <span id="victoryTime" className="fw-bold" />
                  </p>
                  <p>
                    Pistas usadas: <span id="victoryHints" className="fw-bold" />
                  </p>
                  <p>
                    Tiempo adicional por pistas: <span id="victoryPenaltyTime" className="fw-bold" />
                  </p>
                  <p>
                    Tiempo final con penalizaciones: <span id="victoryFinalTime" className="fw-bold" />
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn app-btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                  <button type="button" className="btn app-btn-primary" data-bs-dismiss="modal" onClick={onResetGame}>
                    Nuevo juego
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="hintModal" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Pista</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
                </div>
                <div className="modal-body" />
                <div className="modal-footer">
                  <button type="button" className="btn app-btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="welcomeModal" tabIndex={-1} aria-labelledby="welcomeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Copperhopper</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
                </div>
                <div className="modal-body">
                  <p>¡Bienvenide!</p>
                  <p>
                    Un juego creado por las cotorras, basado en el WikiRace y bautizado por El Club de las Tormentas. Navega por la Coppermind en español
                    con el menor número de clics.
                  </p>
                  <h6 className="mt-3">En esta versión</h6>
                  <ul className="mb-0">
                    <li>Puntuación por movimientos y tiempo</li>
                    <li>Pistas tras 30 segundos</li>
                    <li>Buscador entre enlaces del artículo</li>
                  </ul>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn app-btn-secondary" data-bs-toggle="modal" data-bs-target="#tutorialModal">
                    Cómo jugar
                  </button>
                  <button type="button" className="btn app-btn-primary" id="startGame">
                    Empezar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="tutorialModal" tabIndex={-1} aria-labelledby="tutorialModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Cómo jugar</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
                </div>
                <div className="modal-body">
                  <h6>Objetivo</h6>
                  <p className="mb-3">Llega del artículo de inicio al objetivo con el menor número de clics.</p>
                  <h6>¿Cómo funciona?</h6>
                  <ol>
                    <li>Arriba ves el artículo actual y el objetivo, con un extracto breve.</li>
                    <li>Debajo aparecen los enlaces internos del artículo actual.</li>
                    <li>Pulsa el enlace que te acerque al objetivo.</li>
                    <li>Cada clic cuenta como un movimiento.</li>
                  </ol>
                  <div className="alert alert-secondary mb-0 mt-3">
                    <small>Ejemplo: Alta tormenta → Roshar → Cosmere → Lumar → Germinador</small>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn app-btn-primary" id="tutorialStartButton" data-bs-dismiss="modal">
                    Entendido
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="gameModal" tabIndex={-1} aria-labelledby="gameModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Fin del juego</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
                </div>
                <div className="modal-body" />
              </div>
            </div>
          </div>

          {/* Sin data-bs-backdrop: el runtime usa backdrop: false para no apilar velos oscuros */}
          <div className="modal fade" id="loadingModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center py-5">
                  <div className="cargando">
                    <div className="logos-container">
                      <img src="img/LogoRecurso%202.png" className="logo-salto" alt="" />
                      <img src="img/LogoRecurso%202.png" className="logo-salto" alt="" />
                      <img src="img/LogoRecurso%202.png" className="logo-salto" alt="" />
                    </div>
                    <span className="texto-cargando d-block mt-3">Preparando partida…</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
