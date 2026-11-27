import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { ROLES_LABEL } from '../auth/mockUsers'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  const desde = location.state?.from?.pathname ?? '/perfil'

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!username.trim() || !password) {
      setError('Introduce tu usuario y contraseña.')
      return
    }
    setCargando(true)
    try {
      await login(username.trim(), password)
      navigate(desde, { replace: true })
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">Iniciar sesión</h1>
          <p className="page-sub">
            Entra con tu usuario y contraseña para ver las opciones según tu
            rol.
          </p>
        </div>
      </header>

      <div className="glass-panel login-card">
        <span className="material-symbols-outlined login-icon">
          local_fire_department
        </span>

        {user ? (
          <>
            <h2 className="login-title">Ya tienes la sesión iniciada</h2>
            <p className="login-text">
              Estás dentro como <strong>{user.name}</strong> (
              {ROLES_LABEL[user.role]}).
            </p>
            <Link className="btn btn-primary btn-lg" to="/perfil">
              Ir a mi perfil
            </Link>
          </>
        ) : (
          <>
            <h2 className="login-title">Bienvenida de nuevo</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-campo">
                <label className="login-label" htmlFor="login-usuario">
                  Usuario
                </label>
                <input
                  id="login-usuario"
                  className="login-input"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="login-campo">
                <label className="login-label" htmlFor="login-password">
                  Contraseña
                </label>
                <input
                  id="login-password"
                  className="login-input"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="login-error">{error}</p>}
              <button
                type="submit"
                className="btn btn-primary btn-lg login-btn"
                disabled={cargando}
              >
                {cargando ? 'Entrando…' : 'Entrar'}
              </button>
            </form>
            <p className="login-hint">
              Maqueta: traductor / traductor123 · revisor / revisor123 · admin
              / admin123
            </p>
          </>
        )}
      </div>
    </div>
  )
}