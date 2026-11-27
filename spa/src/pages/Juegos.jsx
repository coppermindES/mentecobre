import { Link } from 'react-router-dom'
import { OCIO } from '../data/ocio'

export default function Juegos() {
  return (
    <div>
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">Nuestro ocio</h1>
          <p className="page-sub">
            Pasa un buen rato con las secciones y proyectos de la comunidad.
          </p>
        </div>
      </header>

      <div className="ocio-grid">
        {OCIO.map((item) =>
          item.proximamente ? (
            <div key={item.title} className="juego-card glass-panel">
              <div className="juego-icon">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <h2 className="juego-title">{item.title}</h2>
              <span className="juego-play juego-proximamente">
                Próximamente
                <span className="material-symbols-outlined">schedule</span>
              </span>
            </div>
          ) : (
            <Link key={item.to} to={item.to} className="juego-card glass-panel">
              <div className="juego-icon">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              {item.tag && <span className="juego-tag">{item.tag}</span>}
              <h2 className="juego-title">{item.title}</h2>
              {item.description && <p className="juego-desc">{item.description}</p>}
              <span className="juego-play">
                Entrar
                <span className="material-symbols-outlined">arrow_forward</span>
              </span>
            </Link>
          ),
        )}
      </div>
    </div>
  )
}