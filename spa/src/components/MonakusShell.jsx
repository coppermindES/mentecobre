import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import fondo from '../assets/images/monakus/MonakusFondo.jpg'

const OFERTA = {
  to: '/ocio/escuela-monakus/oferta',
  label: 'Oferta académica',
  children: [
    { to: '/ocio/escuela-monakus/oferta/basica', label: 'Enseñanza básica' },
    { to: '/ocio/escuela-monakus/oferta/avanzada', label: 'Enseñanza avanzada' },
    { to: '/ocio/escuela-monakus/oferta/mastrell', label: 'Método Mastrell' },
  ],
}

const SUBS = [
  { to: '/ocio/escuela-monakus', label: 'Inicio', end: true },
  { to: '/ocio/escuela-monakus/presentacion', label: 'Presentación' },
  { to: '/ocio/escuela-monakus/instalaciones', label: 'Instalaciones' },
  OFERTA,
  { to: '/ocio/escuela-monakus/matriculacion', label: 'Matriculación' },
  { to: '/ocio/escuela-monakus/material', label: 'Material utilizado' },
  { to: '/ocio/escuela-monakus/contacto', label: 'Contacto' },
]

export default function MonakusShell({ children }) {
  const [ofertaAbierta, setOfertaAbierta] = useState(false)

  return (
    <div
      className="mn-page mn-page-con-fondo"
      style={{
        ['--mn-page-imagen']: `url(${fondo})`,
        ['--mn-page-imagen-opacidad']: 0.5,
      }}
    >
      <header className="mn-top">
        <Link className="mn-back" to="/">
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_back
          </span>
          Volver a la mentecobre
        </Link>

        <p className="mn-brand">Escuela Monakus</p>

        <nav className="mn-nav">
          {SUBS.map((s) =>
            s.children ? (
              <div
                key={s.to}
                className={`mn-nav-drop${ofertaAbierta ? ' abierta' : ''}`}
                onMouseEnter={() => setOfertaAbierta(true)}
                onMouseLeave={() => setOfertaAbierta(false)}
              >
                <button
                  type="button"
                  className="mn-nav-drop-btn"
                  aria-expanded={ofertaAbierta}
                  onClick={() => setOfertaAbierta((o) => !o)}
                >
                  {s.label}
                  <span
                    className="material-symbols-outlined mn-nav-drop-caret"
                    aria-hidden="true"
                  >
                    expand_more
                  </span>
                </button>
                <div className="mn-nav-drop-panel">
                  {s.children.map((c) => (
                    <NavLink
                      key={c.to}
                      to={c.to}
                      className={({ isActive }) =>
                        `mn-nav-link mn-nav-drop-link${isActive ? ' active' : ''}`
                      }
                      onClick={() => setOfertaAbierta(false)}
                    >
                      {c.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={s.to}
                to={s.to}
                end={s.end}
                className={({ isActive }) => `mn-nav-link${isActive ? ' active' : ''}`}
              >
                {s.label}
              </NavLink>
            )
          )}
        </nav>
      </header>

      {children}
    </div>
  )
}