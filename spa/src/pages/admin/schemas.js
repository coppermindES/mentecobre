import {
  usersSv,
  universesSv,
  glossarySv,
  categoriesSv,
  imagesWithTextSv,
  erratasSv,
  recruitmentSv,
  notificationsSv,
  articles,
} from '../../api'

export const ESTADOS_ERRATA = ['nuevo', 'en_proceso', 'resuelto', 'descartado']
export const ESTADOS_RECLUTAMIENTO = ['nuevo', 'entrevista', 'aceptado', 'rechazado']
export const ESTADOS_NOTIFICACION = ['pendiente', 'resuelta', 'completado']
export const ESTADOS_USUARIO = ['activo', 'descanso', 'baja']
export const TIPOS_ARTICULO = ['FDV', 'LIB', 'LOC', 'MG', 'ORG', 'PJ', 'RD']

const fechaHoy = () => new Date().toISOString().slice(0, 10)

export function fmtFecha(fecha) {
  if (!fecha) return '—'
  const d = new Date(fecha)
  if (Number.isNaN(d.getTime())) return fecha
  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function nombreUsuario(u) {
  return (
    [u.first_name, u.last_name].filter(Boolean).join(' ') ||
    u.username ||
    `#${u.id}`
  )
}

async function extrasUniversos() {
  const lista = await universesSv.listar()
  return { universos: lista }
}

async function extrasUniversosYUsuarios() {
  const [universos, usuarios] = await Promise.all([
    universesSv.listar(),
    usersSv.listar(),
  ])
  return {
    universos,
    usuarios: usuarios.map((u) => ({ id: u.id, label: nombreUsuario(u) })),
  }
}

export const SCHEMAS = {
  glosario: {
    id: 'glosario',
    label: 'Glosario',
    singular: 'Término',
    svc: glossarySv,
    titulo: (f) => f.term || '—',
    campos: [
      { guard: 'term', etiqueta: 'Término (EN)', tipo: 'texto' },
      { guard: 'es', etiqueta: 'Traducción (ES)', tipo: 'texto' },
      { guard: 'universeId', etiqueta: 'Universo', tipo: 'universo', opciones: 'universos' },
      { guard: 'urlEn', etiqueta: 'URL EN', tipo: 'url' },
      { guard: 'urlEs', etiqueta: 'URL ES', tipo: 'url' },
    ],
    cargaExtras: extrasUniversos,

    cruce: {
      svc: articles,
      etiqueta: 'artículo',
      clave: 'term',
      claveOtra: 'titleEn',
      mapa: {
        term: 'titleEn',
        es: 'titleEs',
        universeId: 'universe',
        urlEn: 'urlEn',
        urlEs: 'urlEs',
      },
    },
  },

  categorias: {
    id: 'categorias',
    label: 'Categorías',
    singular: 'Categoría',
    svc: categoriesSv,
    titulo: (f) => f.en || '—',
    campos: [
      { guard: 'en', etiqueta: 'En inglés', tipo: 'texto' },
      { guard: 'es', etiqueta: 'En español', tipo: 'texto' },
    ],
  },

  imagenes: {
    id: 'imagenes',
    label: 'Imágenes con texto',
    singular: 'Imagen',
    svc: imagesWithTextSv,
    titulo: (f) => f.nombre || '—',
    campos: [
      { guard: 'nombre', etiqueta: 'Nombre', tipo: 'texto' },
      { guard: 'en', etiqueta: 'Archivo EN', tipo: 'texto' },
      { guard: 'es', etiqueta: 'Archivo ES', tipo: 'texto' },
      { guard: 'urlEn', etiqueta: 'URL EN', tipo: 'url' },
      { guard: 'urlEs', etiqueta: 'URL ES', tipo: 'url' },
      { guard: 'pendienteEs', etiqueta: 'Falta versión ES', tipo: 'checkbox' },
    ],
  },

  articulos: {
    id: 'articulos',
    label: 'Artículos',
    singular: 'Artículo',
    svc: articles,
    titulo: (f) => f.titleEn || f.titleEs || '—',
    campos: [
      { guard: 'titleEn', etiqueta: 'Título EN', tipo: 'texto' },
      { guard: 'titleEs', etiqueta: 'Título ES', tipo: 'texto' },
      { guard: 'universe', etiqueta: 'Universo', tipo: 'universo', opciones: 'universos' },
      { guard: 'type', etiqueta: 'Tipo', tipo: 'select', opciones: TIPOS_ARTICULO },
      { guard: 'priority', etiqueta: 'Prioridad', tipo: 'numero' },
      { guard: 'translator', etiqueta: 'Traductor', tipo: 'usuario', opciones: 'usuarios' },
      { guard: 'assignedDate', etiqueta: 'Asignado (traducción)', tipo: 'fecha' },
      { guard: 'translated', etiqueta: 'Traducido', tipo: 'checkbox' },
      { guard: 'translatedDate', etiqueta: 'Traducido el', tipo: 'fecha' },
      { guard: 'reviewer', etiqueta: 'Revisor', tipo: 'usuario', opciones: 'usuarios' },
      { guard: 'reviewed', etiqueta: 'Revisado', tipo: 'checkbox' },
      { guard: 'reviewerassignedDate', etiqueta: 'Asignado (revisión)', tipo: 'fecha' },
      { guard: 'reviewedDate', etiqueta: 'Revisado el', tipo: 'fecha' },
      { guard: 'gregorio', etiqueta: 'En Gregorio', tipo: 'checkbox' },
      { guard: 'engregoriado', etiqueta: 'Gregoriado (EN)', tipo: 'checkbox' },
      { guard: 'linkcopperen', etiqueta: 'Enlazado en Copper EN', tipo: 'checkbox' },
      { guard: 'pageidEn', etiqueta: 'Page ID EN', tipo: 'numero' },
      { guard: 'pageidEs', etiqueta: 'Page ID ES', tipo: 'numero' },
      { guard: 'urlEn', etiqueta: 'URL EN', tipo: 'url' },
      { guard: 'urlEs', etiqueta: 'URL ES', tipo: 'url' },
      { guard: 'urldrive', etiqueta: 'URL de Drive', tipo: 'url' },
      { guard: 'notes', etiqueta: 'Notas', tipo: 'textarea' },
      { guard: 'problemCopper', etiqueta: 'Problema en Copper', tipo: 'texto' },
    ],
    cargaExtras: extrasUniversosYUsuarios,

    cruce: {
      svc: glossarySv,
      etiqueta: 'término del glosario',
      clave: 'titleEn',
      claveOtra: 'term',
      mapa: {
        titleEn: 'term',
        titleEs: 'es',
        universe: 'universeId',
        urlEn: 'urlEn',
        urlEs: 'urlEs',
      },
    },
  },

  usuarios: {
    id: 'usuarios',
    label: 'Usuarios',
    singular: 'Usuario',
    svc: usersSv,
    titulo: (f) => nombreUsuario(f),
    campos: [
      { guard: 'username', etiqueta: 'Nombre de usuario', tipo: 'texto' },
      { guard: 'first_name', etiqueta: 'Nombre', tipo: 'texto' },
      { guard: 'last_name', etiqueta: 'Apellidos', tipo: 'texto' },
      { guard: 'email', etiqueta: 'Email', tipo: 'texto' },
      { guard: 'copper_username', etiqueta: 'Nombre en Copper', tipo: 'texto' },
      { guard: 'groups', etiqueta: 'Grupos', tipo: 'lista' },
      { guard: 'rol', etiqueta: 'Rol', tipo: 'select', opciones: ['colaborador', 'admin'] },
      { guard: 'universe', etiqueta: 'Universos', tipo: 'ids', opciones: 'universos' },
      { guard: 'status', etiqueta: 'Estado', tipo: 'select', opciones: ESTADOS_USUARIO },
      { guard: 'status_changed_at', etiqueta: 'Cambio de estado el', tipo: 'fecha' },
      { guard: 'last_copper_update', etiqueta: 'Última actualización en la Copper', tipo: 'fecha' },
      { guard: 'date_joined', etiqueta: 'Alta', tipo: 'fecha' },
      { guard: 'is_active', etiqueta: 'Activo', tipo: 'checkbox' },
      { guard: 'is_staff', etiqueta: 'Staff', tipo: 'checkbox' },
      { guard: 'is_resting', etiqueta: 'De descanso', tipo: 'checkbox' },
      { guard: 'timeoff_date', etiqueta: 'Fin de descanso', tipo: 'fecha' },
      { guard: 'out_date', etiqueta: 'Fecha de baja', tipo: 'fecha' },
      { guard: 'notes', etiqueta: 'Notas', tipo: 'textarea' },
    ],
    cargaExtras: extrasUniversos,
  },

  universos: {
    id: 'universos',
    label: 'Universos',
    singular: 'Universo',
    svc: universesSv,
    titulo: (f) => f.nombre || '—',
    campos: [{ guard: 'nombre', etiqueta: 'Nombre', tipo: 'texto' }],
  },

  erratas: {
    id: 'erratas',
    label: 'Erratas',
    singular: 'Errata',
    svc: erratasSv,
    titulo: (f) => f.articulo || '—',
    nuevosDefecto: () => ({ estado: 'nuevo', creado_en: fechaHoy() }),
    campos: [
      { guard: 'articulo', etiqueta: 'Artículo', tipo: 'texto' },
      { guard: 'texto', etiqueta: 'Texto', tipo: 'textarea' },
      { guard: 'usuario', etiqueta: 'Usuario', tipo: 'texto' },
      { guard: 'email', etiqueta: 'Email', tipo: 'texto' },
      { guard: 'checks', etiqueta: 'Comprobaciones', tipo: 'lista' },
      { guard: 'estado', etiqueta: 'Estado', tipo: 'select', opciones: ESTADOS_ERRATA },
      { guard: 'notas', etiqueta: 'Notas internas', tipo: 'textarea' },
      { guard: 'creado_en', etiqueta: 'Recibida', tipo: 'fecha' },
    ],
  },

  reclutamiento: {
    id: 'reclutamiento',
    label: 'Reclutamiento',
    singular: 'Solicitud',
    svc: recruitmentSv,
    titulo: (f) => f.nombre || '—',
    nuevosDefecto: () => ({ estado: 'nuevo', creado_en: fechaHoy() }),
    campos: [
      { guard: 'nombre', etiqueta: 'Nombre', tipo: 'texto' },
      { guard: 'email', etiqueta: 'Email', tipo: 'texto' },
      { guard: 'motivacion', etiqueta: 'Motivación', tipo: 'textarea' },
      { guard: 'libros', etiqueta: 'Obras leídas', tipo: 'lista' },
      { guard: 'prueba', etiqueta: 'Prueba', tipo: 'textarea' },
      { guard: 'estado', etiqueta: 'Estado', tipo: 'select', opciones: ESTADOS_RECLUTAMIENTO },
      { guard: 'notas', etiqueta: 'Notas internas', tipo: 'textarea' },
      { guard: 'creado_en', etiqueta: 'Recibida', tipo: 'fecha' },
    ],
  },

  notificaciones: {
    id: 'notificaciones',
    label: 'Notificaciones',
    singular: 'Notificación',
    svc: notificationsSv,
    titulo: (f) => f.contexto || f.tipo || '—',
    nuevosDefecto: () => ({ estado: 'pendiente', creado_en: fechaHoy() }),
    campos: [
      { guard: 'tipo', etiqueta: 'Tipo', tipo: 'texto' },
      { guard: 'contexto', etiqueta: 'Contexto', tipo: 'texto' },
      { guard: 'enUrl', etiqueta: 'URL EN', tipo: 'url' },
      { guard: 'imageId', etiqueta: 'ID de imagen', tipo: 'numero' },
      { guard: 'estado', etiqueta: 'Estado', tipo: 'select', opciones: ESTADOS_NOTIFICACION },
      { guard: 'creado_en', etiqueta: 'Creada', tipo: 'fecha' },
    ],
  },
}