import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'

export default function RequireAuth({ children }) {
  const { user, logout } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user.status !== 'activo' && location.pathname !== '/perfil') {
    const descanso = user.status === 'descanso'
    return (
      <div>
        <header className="page-header">
          <span className="accent-bar"></span>
          <div>
            <h1 className="page-title">
              {descanso ? 'Estás de descanso' : 'Ya no formas parte'}
            </h1>
          </div>
        </header>
        <div className="glass-panel login-card">
          <span className="material-symbols-outlined login-icon">
            {descanso ? 'hotel' : 'flight_takeoff'}
          </span>
          <h2 className="login-title">
            {descanso
              ? 'Tu cuenta está en descanso'
              : 'Ya no colaboras en el proyecto'}
          </h2>
          <p className="login-text">
            {descanso
              ? 'Solo un admin puede reactivarte. Hasta entonces no puedes acceder; avísale y aquí te esperamos.'
              : 'Solo un admin puede volver a darte de alta.'}
          </p>
          <button
            type="button"
            className="btn btn-ghost btn-lg"
            onClick={logout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    )
  }

  return children
}