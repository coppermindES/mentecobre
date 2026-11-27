import { usersSv } from './index'
import { MOCK_CREDENCIALES } from '../auth/mockUsers'

const API_URL = import.meta.env.VITE_API_URL || null

function esperar(ms = 400) {
  return new Promise((resolver) => setTimeout(resolver, ms))
}

async function loginReal(username, password) {
  const res = await fetch(`${API_URL}/api/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) {
    throw new Error('Usuario o contraseña incorrectos')
  }
  const cuerpo = await res.json()
  return { access: cuerpo.access, refresh: cuerpo.refresh }
}

async function meReal(access) {
  const res = await fetch(`${API_URL}/api/v1/users/me/`, {
    headers: { Authorization: `Bearer ${access}` },
  })
  if (!res.ok) {
    throw new Error('La sesión no es válida')
  }
  return res.json()
}

function motivoNoActivo(usuario) {
  if (usuario.status === 'baja') {
    return 'Tu cuenta está dada de baja. Escribe al equipo de administración si quieres reactivarla.'
  }
  if (usuario.status === 'descanso') {
    return 'Tu cuenta está de descanso. Escribe al equipo de administración para volver a activarla.'
  }
  return 'Tu cuenta no está activa. Escribe al equipo de administración.'
}

function puedeEntrar(usuario) {
  return usuario.status === 'activo' && usuario.is_active !== false
}

export async function login(username, password) {
  if (API_URL) return loginReal(username, password)

  await esperar()
  const usuarios = await usersSv.listar()
  const usuario = usuarios.find((u) => u.username === username)
  if (!usuario || MOCK_CREDENCIALES[username] !== password) {
    throw new Error('Usuario o contraseña incorrectos')
  }
  if (!puedeEntrar(usuario)) {
    throw new Error(motivoNoActivo(usuario))
  }
  return {
    access: `mock-access-${usuario.id}`,
    refresh: `mock-refresh-${usuario.id}`,
  }
}

export async function me(access) {
  if (API_URL) return meReal(access)

  await esperar()
  const id = Number(String(access).replace('mock-access-', ''))
  const usuarios = await usersSv.listar()
  const usuario = usuarios.find((u) => u.id === id)
  if (!usuario) throw new Error('La sesión no es válida')
  if (!puedeEntrar(usuario)) throw new Error(motivoNoActivo(usuario))
  return usuario
}