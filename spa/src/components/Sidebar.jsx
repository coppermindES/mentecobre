import { NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useThemeMode } from '../theme/useThemeMode'
import { useAuth } from '../auth/useAuth'
import { ROLES_LABEL } from '../auth/mockUsers'
import { notificationsSv } from '../api'

const NAV_ITEMS = [
  { to: '/', icon: 'home', label: 'Inicio', end: true },
  { to: '/avance', icon: 'query_stats', label: 'El avance' },
  { to: '/glosario', icon: 'book', label: 'Glosario' },
]

const AUX_ITEMS = [{ icon: 'sports_esports', label: 'Ocio', to: '/ocio' }]

const itemsConAdmin = [
  { icon: 'translate', label: 'Traducción', to: '/traduccion' },
  {
    icon: 'admin_panel_settings',
    label: 'Administración',
    to: '/admin',
    badge: true,
  },
]

const ROLE_ITEMS = {
  traductor: [{ icon: 'translate', label: 'Traducción', to: '/traduccion' }],
  revisor: itemsConAdmin,
  admin: itemsConAdmin,
}

export default function Sidebar() {
  const { mode, toggle } = useThemeMode()
  const { user } = useAuth()
  const location = useLocation()
  const [pendientes, setPendientes] = useState(0)

  useEffect(() => {
    if (!user || (user.role !== 'revisor' && user.role !== 'admin')) return
    let vivo = true
    ;(async () => {
      try {
        const lista = await notificationsSv.listar()
        const sinResolver = lista.filter(
          (n) => n.estado !== 'resuelta' && n.estado !== 'completado',
        ).length
        if (vivo) setPendientes(sinResolver)
      } catch {
        return
      }
    })()
    return () => {
      vivo = false
    }
  }, [user, location.pathname])

  const footerItems = user
    ? [{ icon: 'live_help', label: 'Ayuda', to: '/ayuda' }]
    : [
        {
          icon: 'group',
          label: 'Únete al equipo',
          to: '/union',
        },
        {
          icon: 'account_circle',
          label: 'Iniciar sesión',
          to: '/login',
          highlighted: true,
        },
      ]

  const roleItems = user ? ROLE_ITEMS[user.role] ?? [] : []
  const roleLabel = user ? ROLES_LABEL[user.role] : null

  return (
    <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Mentecobre</h1>
        </div>
        <img src="/Logo.png" alt="" className="sidebar-logo" aria-hidden="true" />
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            >
              <span className="material-symbols-outlined nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
          {AUX_ITEMS.map((item) => (
            <Link key={item.label} to={item.to} className="nav-item">
              <span className="material-symbols-outlined nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          {roleItems.map((item) => (
            <Link key={item.label} to={item.to} className="nav-item">
              <span className="material-symbols-outlined nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && pendientes > 0 && (
                <span className="nav-badge" title="Notificaciones pendientes">
                  {pendientes}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
        {user && roleLabel && (
          <Link to="/perfil" className="sidebar-user">
            <span className="material-symbols-outlined sidebar-user-icon">
              account_circle
            </span>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{user.name}</span>
              <span className="sidebar-user-role">{roleLabel}</span>
            </div>
          </Link>
        )}
        {footerItems.map((item) =>
          item.to ? (
            <Link
              key={item.label}
              to={item.to}
              className={`nav-item${item.highlighted ? ' active' : ''}`}
            >
              <span className="material-symbols-outlined nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className={`nav-item${item.highlighted ? ' active' : ''}`}
              {...(item.external
                ? { target: '_blank', rel: 'noreferrer' }
                : {})}
            >
              <span className="material-symbols-outlined nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ),
        )}
        <div className="theme-switch-row">
          <span className="theme-switch-label">Oscurense</span>
          <button
            type="button"
            className={`theme-switch${mode === 'light' ? ' on' : ''}`}
            onClick={toggle}
            aria-label="Cambiar tema"
          >
            <span className="theme-switch-thumb"></span>
          </button>
          <span className="theme-switch-label">Diurnense</span>
        </div>
      </div>
    </aside>
  )
}