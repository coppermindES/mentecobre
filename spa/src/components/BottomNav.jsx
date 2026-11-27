import { NavLink, Link } from 'react-router-dom'
import { useThemeMode } from '../theme/useThemeMode'
import { useAuth } from '../auth/useAuth'

const ITEMS = [
  { to: '/', icon: 'home', label: 'Inicio', end: true },
  { to: '/avance', icon: 'query_stats', label: 'El avance' },
  { to: '/glosario', icon: 'book', label: 'Glosario' },
  { to: '/ocio', icon: 'sports_esports', label: 'Ocio' },
]

export default function BottomNav() {
  const { mode, toggle } = useThemeMode()
  const { user } = useAuth()

  const sessionLink = user
    ? { to: '/perfil', label: 'Mi perfil' }
    : { to: '/login', label: 'Inicia sesión' }

  return (
    <nav className="bottom-nav">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => `bottom-item${isActive ? ' active' : ''}`}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
      <button type="button" className="bottom-item theme-toggle-nav" onClick={toggle}>
        <span className="material-symbols-outlined">
          {mode === 'light' ? 'dark_mode' : 'light_mode'}
        </span>
        <span>{mode === 'light' ? 'Oscuro' : 'Claro'}</span>
      </button>
      <Link className="bottom-item" to={sessionLink.to}>
        <span className="material-symbols-outlined">account_circle</span>
        <span>{sessionLink.label}</span>
      </Link>
    </nav>
  )
}