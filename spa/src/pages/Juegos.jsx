import { Link } from "react-router-dom";

const JUEGOS = [
  {
    titulo: "La aventura de los Forjamundos",
    desc: "Crónica interactiva con decisiones y guardado de progreso.",
    tipo: "Aventura",
    icon: "map-signs",
    to: "/juegos/aventura"
  },
  {
    titulo: "Copperhopper",
    desc: "Arcade ligero integrado en la aplicación.",
    tipo: "Arcade",
    icon: "gamepad",
    to: "/juegos/copperhopper"
  },
  {
    titulo: "CopperQuiz",
    desc: "Preguntas del Cosmere contra el reloj, con puntuación.",
    tipo: "Quiz",
    icon: "question-circle",
    to: "/juegos/copperquiz"
  }
];

export default function Juegos() {
  return (
    <>
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="section-title position-relative text-center mx-auto mb-5 pb-3" style={{ maxWidth: "600px" }}>
            <h2 className="app-text-primary font-secondary">Pon a prueba tus conocimientos</h2>
            <h1 className="display-4 text-uppercase">Juegos</h1>
          </div>
          <p className="text-center mx-auto mb-0" style={{ maxWidth: "640px" }}>
            Explora el Cosmere de forma interactiva, con el mismo cuidado visual que el resto de la mentecobre.
          </p>
        </div>
      </div>

      <div className="container-fluid py-4">
        <div className="container">
          <div className="row gx-5 gy-5 justify-content-center">
            {JUEGOS.map((j) => (
              <div className="col-md-6 col-lg-4" key={j.to}>
                <Link to={j.to} className="text-decoration-none text-dark d-block h-100">
                  <div className="bg-white border rounded h-100 d-flex flex-column p-4 p-lg-5 text-center">
                    <div className="d-flex justify-content-center mb-4">
                      <div
                        className="d-flex align-items-center justify-content-center app-bg-primary border-inner"
                        style={{ width: "90px", height: "90px" }}
                      >
                        <i className={`bi ${j.icon === 'map-signs' ? 'bi-map' : j.icon === 'gamepad' ? 'bi-controller' : 'bi-question-circle'} fs-2 text-white`} aria-hidden="true" />
                      </div>
                    </div>
                    <h4 className="text-uppercase mb-3">{j.titulo}</h4>
                    <p className="text-muted mb-4 flex-grow-1">{j.desc}</p>
                    <p className="small text-uppercase text-muted mb-4">{j.tipo}</p>
                    <div className="mt-auto">
                      <span className="app-btn-primary text-uppercase px-4">Jugar</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
