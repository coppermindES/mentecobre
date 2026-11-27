import { Link, NavLink, useLocation } from 'react-router-dom'

const SUBS = [
  { to: '/ocio/coppernews', label: 'Inicio', end: true },
  { to: '/ocio/coppernews/la-redaccion', label: 'La Redacción' },
  { to: '/ocio/coppernews/ediciones', label: 'Nuestras ediciones' },
]

export default function CopperNewsShell({ children }) {
  const { pathname } = useLocation()
  const isEdicion = /^\/ocio\/coppernews\/ediciones\/.+/.test(pathname)
  return (
    <div className="coppernews-page">
      <div className="coppernews">
        <div className="coppernews-top">
          <Link className="coppernews-back" to="/">
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
            Volver a la mentecobre
          </Link>
          <p className="coppernews-brand">CopperNews</p>
          <p className="coppernews-slogan">Mantente Investido</p>
        </div>

        <nav className="cn-nav">
          {SUBS.map((s) => (
            <NavLink
              key={s.to}
              to={s.to}
              end={s.end}
              className={({ isActive }) => `cn-nav-link${isActive ? ' active' : ''}`}
            >
              {s.label}
            </NavLink>
          ))}
        </nav>

        <div className={isEdicion ? 'coppernews-inner cn-page-edicion' : 'coppernews-inner'}>{children}</div>
      </div>
    </div>
  )
}