
const API_URL = import.meta.env?.VITE_API_URL ?? null

const win = typeof window !== 'undefined' ? window : null
const storage = win?.localStorage ?? null

const PREFIJO = 'mentecobre'

function clonar(valor) {
  return JSON.parse(JSON.stringify(valor))
}

function tokenAcceso() {
  if (!storage) return null
  try {
    const raw = storage.getItem(`${PREFIJO}.session`)
    return raw ? JSON.parse(raw).access : null
  } catch {
    return null
  }
}

function cabeceras(json) {
  const headers = {}
  const token = tokenAcceso()
  if (token) headers.Authorization = `Bearer ${token}`
  if (json) headers['Content-Type'] = 'application/json'
  return headers
}

async function listarReal(recurso, filtros) {
  const qs = new URLSearchParams(
    Object.entries(filtros ?? {}).filter(([, v]) => v !== undefined && v !== null && v !== ''),
  ).toString()
  const res = await fetch(`${API_URL}/api/v1/${recurso}/?${qs}`, {
    headers: cabeceras(),
  })
  if (!res.ok) throw new Error(`No se pudo consultar ${recurso}`)
  const cuerpo = await res.json()
  return Array.isArray(cuerpo) ? cuerpo : (cuerpo.results ?? [])
}

async function crearReal(recurso, datos) {
  const res = await fetch(`${API_URL}/api/v1/${recurso}/`, {
    method: 'POST',
    headers: cabeceras(true),
    body: JSON.stringify(datos),
  })
  if (!res.ok) throw new Error(`No se pudo crear en ${recurso}`)
  return res.json()
}

async function modificarReal(recurso, id, cambios) {
  const res = await fetch(`${API_URL}/api/v1/${recurso}/${id}/`, {
    method: 'PATCH',
    headers: cabeceras(true),
    body: JSON.stringify(cambios),
  })
  if (!res.ok) throw new Error(`No se pudo modificar ${recurso}/${id}`)
  return res.json()
}

async function borrarReal(recurso, id) {
  const res = await fetch(`${API_URL}/api/v1/${recurso}/${id}/`, {
    method: 'DELETE',
    headers: cabeceras(),
  })
  if (!res.ok) throw new Error(`No se pudo borrar ${recurso}/${id}`)
}

export function crearServicio({
  clave,
  recurso,
  seed,
  version = 1,
  persistir = true,
}) {
  const storageKey = `${PREFIJO}.${clave}.v${version}`
  let memoria = null
  let cargaEnCurso = null

  async function obtenerSemilla() {
    const semilla = typeof seed === 'function' ? await seed() : seed
    return clonar(semilla ?? [])
  }

  async function cargar() {
    if (memoria) return memoria
    if (!cargaEnCurso) {
      cargaEnCurso = (async () => {
        try {
          if (persistir && storage) {
            const raw = storage.getItem(storageKey)
            if (raw) {
              try {
                memoria = JSON.parse(raw)
                return memoria
              } catch {
                memoria = null
              }
            }
          }
          memoria = await obtenerSemilla()
          if (persistir && storage) {
            storage.setItem(storageKey, JSON.stringify(memoria))
          }
          return memoria
        } catch (e) {
          cargaEnCurso = null
          throw e
        }
      })()
    }
    return cargaEnCurso
  }

  function guardar() {
    if (persistir && storage) {
      storage.setItem(storageKey, JSON.stringify(memoria))
    }
  }

  const coincide = (fila, filtro) =>
    Object.entries(filtro).every(([k, v]) => fila?.[k] === v || String(fila?.[k]) === String(v))

  return {
    esReal: Boolean(API_URL),

    async listar(filtros = {}) {
      if (API_URL) return listarReal(recurso, filtros)
      const datos = await cargar()
      if (!Object.keys(filtros).length) return clonar(datos)
      return clonar(datos.filter((fila) => coincide(fila, filtros)))
    },

    async crear(datos) {
      if (API_URL) return crearReal(recurso, datos)
      const datosArr = await cargar()
      const id =
        datos.id ??
        (datosArr.reduce((max, fila) => Math.max(max, fila.id ?? 0), 0) + 1)
      const fila = { ...clonar(datos), id }
      datosArr.push(fila)
      guardar()
      return clonar(fila)
    },

    async modificar(id, cambios) {
      if (API_URL) return modificarReal(recurso, id, cambios)
      const datosArr = await cargar()
      const indice = datosArr.findIndex((fila) => fila.id === id)
      if (indice === -1) throw new Error(`No existe ${recurso}/${id}`)
      datosArr[indice] = { ...datosArr[indice], ...clonar(cambios), id }
      guardar()
      return clonar(datosArr[indice])
    },

    async borrar(id) {
      if (API_URL) return borrarReal(recurso, id)
      const datosArr = await cargar()
      const indice = datosArr.findIndex((fila) => fila.id === id)
      if (indice !== -1) {
        datosArr.splice(indice, 1)
        guardar()
      }
    },

    async restaurar() {
      if (API_URL) return
      cargaEnCurso = null
      memoria = await obtenerSemilla()
      if (persistir && storage) {
        storage.setItem(storageKey, JSON.stringify(memoria))
      }
    },
  }
}