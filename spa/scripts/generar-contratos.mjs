import fs from 'node:fs'
import path from 'node:path'

const REPO = process.argv[2] ?? 'C:/Users/shan_/Desktop/Aya/Sanderson/Copper/Web/Codigo/NewMentecobre'
const OUT = path.join(REPO, 'src/data/contracts')
const PUBLIC_DATA = path.join(REPO, 'public/data')
const TMP = 'C:/Users/shan_/AppData/Local/Temp/opencode'
const CSV = process.argv[3] ?? path.join(TMP, 'articulos.csv')

fs.mkdirSync(OUT, { recursive: true })
fs.mkdirSync(PUBLIC_DATA, { recursive: true })

function parsearCsv(raw) {
  const filas = []
  let fila = []
  let campo = ''
  let dentro = false
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i]
    if (dentro) {
      if (c === '"') {
        if (raw[i + 1] === '"') { campo += '"'; i++ }
        else dentro = false
      } else campo += c
    } else if (c === '"') dentro = true
    else if (c === ',') { fila.push(campo); campo = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && raw[i + 1] === '\n') i++
      if (campo !== '' || fila.length) { fila.push(campo); filas.push(fila) }
      fila = []
      campo = ''
    } else campo += c
  }
  if (campo !== '' || fila.length) { fila.push(campo); filas.push(fila) }
  return filas
}

const num = (v) => (v.trim() === '' ? null : Number(v))
const bool = (v) => Number(v) === 1

const filasCsv = parsearCsv(fs.readFileSync(CSV, 'utf8'))
const [cabecera, ...filas] = filasCsv
const idx = Object.fromEntries(cabecera.map((c, i) => [c, i]))

const articles = filas.map((f) => ({
  id: num(f[idx.id]),
  pageidEn: num(f[idx.pageidEn]),
  pageidEs: num(f[idx.pageidEs]),
  titleEn: f[idx.titleEn].trim(),
  titleEs: f[idx.titleEs].trim(),
  type: f[idx.type].trim() || null,
  priority: num(f[idx.priority]),
  translator: num(f[idx.translator]),
  assignedDate: f[idx.assignedDate].trim() || null,
  translated: bool(f[idx.translated]),
  translatedDate: f[idx.translatedDate].trim() || null,
  reviewer: num(f[idx.reviewer]),
  reviewed: bool(f[idx.reviewed]),
  reviewerassignedDate: f[idx.reviewerassignedDate].trim() || null,
  reviewedDate: f[idx.reviewedDate].trim() || null,
  gregorio: bool(f[idx.gregorio]),
  engregoriado: bool(f[idx.engregoriado]),
  notes: f[idx.notes].trim() || '',
  universe: num(f[idx.universe]),
  urldrive: f[idx.urldrive].trim() || '',
  urlEn: f[idx.urlEn].trim() || '',
  urlEs: f[idx.urlEs].trim() || '',
  linkcopperen: bool(f[idx.linkcopperen]),
  problemCopper: f[idx.problemCopper].trim() || '',
}))

fs.writeFileSync(path.join(PUBLIC_DATA, 'articles.json'), JSON.stringify(articles))

const importar = async (rel, name) => {
  const src = path.join(REPO, rel)
  const copia = path.join(TMP, name)
  fs.copyFileSync(src, copia)
  const mod = await import('file://' + copia.split(path.sep).join('/') + '?t=' + Date.now())
  return mod
}

const { universos, glossary, categoria } = await importar(
  'src/data/mockData.js',
  'mock-data-import.mjs',
)
const { imagenesConTexto } = await importar(
  'src/data/imagenesConTexto.js',
  'imagenes-con-texto-import.mjs',
)

const nombreUniversoId = Object.fromEntries(universos.map((u) => [u.nombre, u.id]))

fs.writeFileSync(path.join(OUT, 'universes.json'),
  JSON.stringify(universos.map((u) => ({ id: u.id, nombre: u.nombre })), null, 2))
fs.writeFileSync(path.join(OUT, 'glossary.json'),
  JSON.stringify(glossary.map((g, i) => ({
    id: i + 1, term: g.term, es: g.es,
    universeId: nombreUniversoId[g.universo] ?? null,
    universo: g.universo, urlEn: g.urlEn, urlEs: g.urlEs,
  })), null, 2))
fs.writeFileSync(path.join(OUT, 'categories.json'),
  JSON.stringify(categoria.map((c) => ({ id: c.id, es: c.es, en: c.en })), null, 2))
fs.writeFileSync(path.join(OUT, 'images-with-text.json'),
  JSON.stringify(imagenesConTexto.map((i, n) => ({
    id: n + 1, nombre: i.nombre, en: i.en, es: i.es,
    urlEn: i.urlEn, urlEs: i.urlEs, pendienteEs: false,
  })), null, 2))

const users = [
  {
    id: 1, username: 'traductor', first_name: 'Traductora', last_name: '',
    email: 'traductora@mentecobre.dev', groups: ['traductor'], rol: 'colaborador',
    universe: [5, 6, 4], status: 'activo', status_changed_at: null,
    copper_username: 'Traductora', date_joined: '2021-03-15',
    is_active: true, is_staff: false, is_resting: false,
    timeoff_date: null, out_date: null, notes: '',
  },
  {
    id: 2, username: 'revisor', first_name: 'Revisor', last_name: '',
    email: 'revisor@mentecobre.dev', groups: ['revisor'], rol: 'colaborador',
    universe: [5, 6], status: 'activo', status_changed_at: null,
    copper_username: 'Revisor', date_joined: '2022-08-02',
    is_active: true, is_staff: false, is_resting: false,
    timeoff_date: null, out_date: null, notes: '',
  },
  {
    id: 3, username: 'admin', first_name: 'Admin', last_name: '',
    email: 'admin@mentecobre.dev', groups: ['admin'], rol: 'admin',
    universe: [5, 6, 4], status: 'activo', status_changed_at: null,
    copper_username: 'Admin', date_joined: '2021-01-10',
    is_active: true, is_staff: true, is_resting: false,
    timeoff_date: null, out_date: null, notes: '',
  },
]
fs.writeFileSync(path.join(OUT, 'users.json'), JSON.stringify(users, null, 2))

fs.writeFileSync(path.join(OUT, 'erratas.json'), JSON.stringify([
  {
    id: 1,
    articulo: 'La guía del mago frugal para sobrevivir en la Inglaterra del medievo',
    texto: 'Ejemplo de errata recibida por el formulario.',
    usuario: null, estado: 'nuevo', creado_en: '2026-09-01',
  },
], null, 2))

fs.writeFileSync(path.join(OUT, 'recruitment.json'), JSON.stringify([
  {
    id: 1, nombre: 'Ejemplo', email: 'ejemplo@mentecobre.dev',
    motivacion: 'Solicitud de ejemplo recibida por el formulario.',
    estado: 'nuevo', creado_en: '2026-09-01',
  },
], null, 2))

const idRevisar = articles.find((a) => a.translated && a.universe === 17)?.id ?? null
const idCrear = articles.find((a) => !a.translated && a.universe === 17)?.id ?? articles[0]?.id ?? null

fs.writeFileSync(path.join(OUT, 'monthly-changes.json'), JSON.stringify([
  {
    id: 1, articleId: idRevisar,
    mesInicio: '2026-08-01', mesFin: '2026-08-31',
    estado: 'nuevo', veredicto: 'revisar_diff',
    fechaCambioEn: '2026-08-28', revisarDesde: '2026-09-05', sinPasar: true,
  },
  {
    id: 2, articleId: idCrear,
    mesInicio: '2026-08-01', mesFin: '2026-08-31',
    estado: 'nuevo', veredicto: 'crear_pagina',
    fechaCambioEn: '2026-08-12', revisarDesde: null, sinPasar: false,
  },
], null, 2))

fs.writeFileSync(path.join(OUT, 'notifications.json'), JSON.stringify([
  {
    id: 1, tipo: 'imagen_con_texto',
    enUrl: 'https://coppermind.net/wiki/Special:FilePath/Ejemplo.jpg',
    contexto: 'Artículo de ejemplo',
    estado: 'pendiente', creado_en: '2026-09-06', imageId: null,
  },
], null, 2))

console.log(JSON.stringify({
  articles: articles.length,
  universes: universos.length,
  glossary: glossary.length,
  categories: categoria.length,
  imagesWithText: imagenesConTexto.length,
  articulosPublicoKB: Math.round(fs.statSync(path.join(PUBLIC_DATA, 'articles.json')).size / 1024),
}))