import { Link, NavLink } from 'react-router-dom'

const SUBS = [
  { to: '/ocio/cotorraviajes', label: 'Inicio', end: true },
  { to: '/ocio/cotorraviajes/destinos', label: 'Nuestros destinos' },
  { to: '/ocio/cotorraviajes/catalogo', label: 'Catálogo' },
]

export default function CotorraViajesShell({ children, fondo, fondoOpacidad }) {
  return (
    <div
      className="cv-page"
      style={
        fondo
          ? { ['--cv-page-imagen']: `url(${fondo})`, ['--cv-page-imagen-opacidad']: fondoOpacidad ?? 0.55 }
          : undefined
      }
    >
      <header className="cv-top">
        <Link className="cv-back" to="/">
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_back
          </span>
          Volver a la mentecobre
        </Link>

        <p className="cv-brand">Cotorra Viajes</p>

        <nav className="cv-nav">
          {SUBS.map((s) => (
            <NavLink
              key={s.to}
              to={s.to}
              end={s.end}
              className={({ isActive }) => `cv-nav-link${isActive ? ' active' : ''}`}
            >
              {s.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {children}
    </div>
  )
}