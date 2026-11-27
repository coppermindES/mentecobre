import { crearServicio } from './servicios'
import {
  ARTICLES_SEED_URL,
  users,
  universes,
  glossary,
  categories,
  imagesWithText,
  erratas,
  recruitment,
  monthlyChanges,
  notifications,
} from '../data/contracts'

async function semillaArticles() {
  const res = await fetch(ARTICLES_SEED_URL)
  if (!res.ok) throw new Error('No se pudo cargar la semilla de artículos')
  return res.json()
}

export const articles = crearServicio({
  clave: 'articles',
  recurso: 'articles',
  seed: semillaArticles,
  persistir: false,
})
export const usersSv = crearServicio({ clave: 'users', recurso: 'users', seed: users, version: 2 })
export const universesSv = crearServicio({ clave: 'universes', recurso: 'universes', seed: universes })
export const glossarySv = crearServicio({ clave: 'glossary', recurso: 'glossary', seed: glossary })
export const categoriesSv = crearServicio({ clave: 'categories', recurso: 'categories', seed: categories })
export const imagesWithTextSv = crearServicio({
  clave: 'images-with-text',
  recurso: 'images-with-text',
  seed: imagesWithText,
})
export const erratasSv = crearServicio({ clave: 'erratas', recurso: 'erratas', seed: erratas })
export const recruitmentSv = crearServicio({ clave: 'recruitment', recurso: 'recruitment', seed: recruitment })
export const monthlyChangesSv = crearServicio({
  clave: 'monthly-changes',
  recurso: 'monthly-changes',
  seed: monthlyChanges,
  version: 2,
})
export const notificationsSv = crearServicio({
  clave: 'notifications',
  recurso: 'notifications',
  seed: notifications,
})

const TODOS = [
  articles,
  usersSv,
  universesSv,
  glossarySv,
  categoriesSv,
  imagesWithTextSv,
  erratasSv,
  recruitmentSv,
  monthlyChangesSv,
  notificationsSv,
]

export async function restaurarDatos() {
  await Promise.all(TODOS.map((s) => s.restaurar()))
}

export async function obtenerNombreUniversos(ids = []) {
  const universos = await universesSv.listar()
  const porId = new Map(universos.map((u) => [Number(u.id), u.nombre]))
  return ids.map((id) => porId.get(Number(id)) ?? 'Otro')
}

export async function obtenerStats() {
  const [universos, articulos] = await Promise.all([
    universesSv.listar(),
    articles.listar(),
  ])
  const porUni = new Map()
  const global = { revisados: 0, enRevision: 0, pendientes: 0 }
  articulos.forEach((a) => {
    const u = Number(a.universe)
    const e = porUni.get(u) ?? { revisados: 0, enRevision: 0, pendientes: 0 }
    if (a.reviewed) {
      e.revisados += 1
      global.revisados += 1
    } else if (a.translated) {
      e.enRevision += 1
      global.enRevision += 1
    } else {
      e.pendientes += 1
      global.pendientes += 1
    }
    porUni.set(u, e)
  })

  const universosConStats = universos.map((uni) => {
    const e = porUni.get(uni.id) ?? { revisados: 0, enRevision: 0, pendientes: 0 }
    const traducidos = e.revisados + e.enRevision
    return { id: uni.id, nombre: uni.nombre, ...e, traducidos }
  })
  const { revisados, enRevision, pendientes } = global
  return {
    universos: universosConStats,
    projectStats: {
      totalArticulos: articulos.length,
      traducidos: revisados + enRevision,
      revisados,
      enRevision,
      pendientes,
    },
    articleStates: [
      { label: 'Revisado', value: revisados, color: '#d66e4b' },
      { label: 'En revisión', value: enRevision, color: '#ffb873' },
      { label: 'Pendiente', value: pendientes, color: '#7e402b' },
    ],
  }
}