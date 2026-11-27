import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './authContext'
import { login as apiLogin, me as apiMe } from '../api/auth'
import { usersSv } from '../api'
import { ROLES } from './mockUsers'

const STORAGE_KEY = 'mentecobre.session'

function leerSesion() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const sesion = JSON.parse(raw)
    if (!sesion || !sesion.access || !sesion.user) return null
    return sesion
  } catch {
    return null
  }
}

const ROLES_POR_GRUPO = [ROLES.admin, ROLES.revisor, ROLES.traductor]

function rolDesdeGrupos(groups = []) {
  return ROLES_POR_GRUPO.find((g) => groups.includes(g)) ?? ROLES.traductor
}

function armarUsuario(me) {
  const rol = rolDesdeGrupos(me.groups)
  const nombre =
    [me.first_name, me.last_name].filter(Boolean).join(' ') || me.username
  return { ...me, name: nombre, role: rol }
}

export default function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(leerSesion)

  const login = useCallback(async (username, password) => {
    const tokens = await apiLogin(username, password)
    const me = await apiMe(tokens.access)
    const user = armarUsuario(me)
    setSesion({ ...tokens, user })
    return user
  }, [])

  const logout = useCallback(() => {
    setSesion(null)
  }, [])

  const actualizarUser = useCallback(
    async (patch) => {
      const usuario = sesion?.user
      if (!usuario) return null
      await usersSv
        .modificar(usuario.id, { ...usuario, ...patch })
        .catch(() => null)
      setSesion((prev) =>
        prev ? { ...prev, user: { ...prev.user, ...patch } } : prev,
      )
      return { ...sesion?.user, ...patch }
    },
    [sesion],
  )

  useEffect(() => {
    if (sesion) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sesion))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [sesion])

  const value = useMemo(
    () => ({ user: sesion?.user ?? null, login, logout, actualizarUser }),
    [sesion, login, logout, actualizarUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}