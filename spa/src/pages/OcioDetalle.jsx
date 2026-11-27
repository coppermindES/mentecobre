import { Link, useParams } from 'react-router-dom'
import { OCIO } from '../data/ocio'

export default function OcioDetalle() {
  const { slug } = useParams()
  const item = OCIO.find((i) => i.to === `/ocio/${slug}`)

  if (!item) {
    return (
      <div>
        <header className="page-header">
          <span className="accent-bar"></span>
          <div>
            <h1 className="page-title">No encontrado</h1>
          </div>
        </header>
        <div className="glass-panel login-card">
          <span className="material-symbols-outlined login-icon">
            search_off
          </span>
          <h2 className="login-title">Esta sección no existe</h2>
          <p className="login-text">Vuelve al listado de ocio.</p>
          <Link className="btn btn-ghost" to="/ocio">
            Volver a Ocio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">{item.title}</h1>
          <p className="page-sub">{item.tag}</p>
        </div>
      </header>

      <div className="glass-panel ocio-detalle">
        <div className="juego-icon ocio-detalle-icon">
          <span className="material-symbols-outlined">{item.icon}</span>
        </div>
        <p className="ocio-detalle-desc">
          {item.description ||
            'Esta sección está por definir. ¡Pronto tendremos más información!'}
        </p>
        <p className="ocio-detalle-aviso">
          Esta sección está en construcción. ¡Vuelve pronto!
        </p>
        <Link className="btn btn-ghost" to="/ocio">
          Volver a Ocio
        </Link>
      </div>
    </div>
  )
}