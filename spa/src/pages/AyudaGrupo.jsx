import { Link, useLocation } from 'react-router-dom'
import { GRUPOS } from '../data/ayuda'

export default function AyudaGrupo() {
  const { pathname } = useLocation()
  const slug = pathname.split('/').filter(Boolean).pop() || ''
  const grupo = GRUPOS[slug]

  if (!grupo) {
    return (
      <div>
        <header className="page-header">
          <span className="accent-bar"></span>
          <div>
            <h1 className="page-title">No encontrado</h1>
          </div>
        </header>
        <Link className="btn btn-primary" to="/ayuda">
          <span className="material-symbols-outlined">arrow_back</span>
          Volver a Ayuda
        </Link>
      </div>
    )
  }

  return (
    <div>
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">{grupo.titulo}</h1>
          <p className="page-sub">{grupo.sub}</p>
        </div>
      </header>

      <div className="ayuda-grid">
        {grupo.items.map((item) => (
          <Link key={item.slug} className="ayuda-card glass-panel" to={`/ayuda/${grupo.slug}/${item.slug}`}>
            <span className="ayuda-card-icon">
              <span className="material-symbols-outlined">{item.icono}</span>
            </span>
            <h3 className="ayuda-card-titulo">{item.titulo}</h3>
            <p className="ayuda-card-texto">{item.sub}</p>
          </Link>
        ))}
      </div>

      <div className="ayuda-back">
        <Link className="btn btn-primary" to="/ayuda">
          <span className="material-symbols-outlined">arrow_back</span>
          Volver a Ayuda
        </Link>
      </div>
    </div>
  )
}