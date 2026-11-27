import { Link } from 'react-router-dom'
import { PASA_TIEMPOS } from '../data/ocio'

export default function Pasatiempos() {
  return (
    <div>
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">Pasatiempos</h1>
          <p className="page-sub">
            Pequeños juegos para entrenar la mente entre desolación y desolación.
          </p>
        </div>
      </header>

      <div className="ocio-grid">
        {PASA_TIEMPOS.map((item) => (
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
        ))}
      </div>

      <div className="pasatiempos-back">
        <Link className="btn btn-ghost" to="/ocio">
          Volver a Ocio
        </Link>
      </div>
    </div>
  )
}