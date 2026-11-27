import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { ROLES_LABEL } from '../auth/mockUsers'
import {
  articles,
  usersSv,
  universesSv,
  glossarySv,
  categoriesSv,
  imagesWithTextSv,
  erratasSv,
  recruitmentSv,
  notificationsSv,
} from '../api'
import { ESTADOS_ERRATA, ESTADOS_RECLUTAMIENTO, fmtFecha } from './admin/schemas'

const fechaHoy = () => new Date().toISOString().slice(0, 10)

const DIA_MS = 24 * 60 * 60 * 1000

function diasSinTrabajar(fecha) {
  if (!fecha) return null
  const d = new Date(fecha)
  if (Number.isNaN(d.getTime())) return null
  return Math.floor((Date.now() - d.getTime()) / DIA_MS)
}

function claseInactividad(dias) {
  if (dias == null) return 'adm-chip-neutro'
  if (dias >= 90) return 'adm-chip-danger'
  if (dias >= 60) return 'adm-chip-alert'
  if (dias >= 30) return 'adm-chip-warn'
  return 'adm-chip-ok'
}

function esPendienteNotificaciones(tipo, estado) {
  if (tipo === 'errata') return estado === 'nuevo'
  if (tipo === 'reclutamiento') return estado === 'nuevo'
  return estado !== 'resuelta' && estado !== 'completado'
}

export function Volver() {
  return (
    <Link to="/" className="admin-back-btn">
      <span className="material-symbols-outlined">arrow_back</span>
      Volver a la mentecobre
    </Link>
  )
}

export function AdminHead({ user }) {
  return (
    <header className="admin-topbar">
      <Volver />
      <div className="admin-topbar-id">
        <span className="material-symbols-outlined admin-topbar-logo">
          local_fire_department
        </span>
        <span className="admin-topbar-brand">
          <span className="admin-topbar-name">Mentecobre</span>
          <span className="admin-topbar-sub">Panel de administración</span>
        </span>
      </div>
      {user && (
        <div className="admin-topbar-user">
          <span className="admin-topbar-avatar">
            {(user.name ?? user.username ?? '?').slice(0, 1).toUpperCase()}
          </span>
          <span className="admin-topbar-u-name">
            {user.name ?? user.username}
          </span>
          <span className="admin-role-chip">
            {ROLES_LABEL[user.role] ?? user.role}
          </span>
        </div>
      )}
    </header>
  )
}

function NuevoBtn({ seccion }) {
  return (
    <Link className="admin-btn btn-sm" to={`/admin/${seccion}/nuevo`}>
      <span className="material-symbols-outlined">add</span>
      Nuevo
    </Link>
  )
}

function MasivoBtn({ seccion }) {
  return (
    <Link className="admin-btn btn-sm" to={`/admin/${seccion}/masivo`}>
      <span className="material-symbols-outlined">playlist_add</span>
      Alta masiva
    </Link>
  )
}

function AccionesFila({ seccion, fila, svc, recargar, etiqueta }) {
  async function eliminar() {
    if (!window.confirm(`¿Eliminar «${etiqueta(fila)}»?`)) return
    await svc.borrar(fila.id)
    await recargar()
  }

  return (
    <div className="adm-row-actions">
      <Link className="adm-row-link" to={`/admin/${seccion}/${fila.id}`}>
        Ver
      </Link>
      <button
        type="button"
        className="adm-row-link adm-row-link-danger"
        onClick={eliminar}
      >
        Eliminar
      </button>
    </div>
  )
}

export default function Admin() {
  const { user } = useAuth()
  const esAdmin = user?.role === 'admin'
  const esRevisor = user?.role === 'revisor'
  const puedeAdministrar = esAdmin || esRevisor

  const TODAS = [
    { id: 'glosario', label: 'Glosario', icon: 'book' },
    { id: 'categorias', label: 'Categorías', icon: 'category' },
    { id: 'imagenes', label: 'Imágenes con texto', icon: 'image' },
    { id: 'articulos', label: 'Artículos', icon: 'article' },
    { id: 'usuarios', label: 'Usuarios', icon: 'group' },
    { id: 'universos', label: 'Universos', icon: 'public' },
    { id: 'notificaciones', label: 'Notificaciones', icon: 'notifications' },
  ]
  const SIN_ACCESO_REVISOR = new Set(['usuarios', 'universos'])
  const TABS = esRevisor
    ? TODAS.filter((t) => !SIN_ACCESO_REVISOR.has(t.id))
    : TODAS

  const [tab, setTab] = useState(TABS[0].id)
  const [dato, setDato] = useState(null)

  async function cargarTodo() {
    const data = {}
    const tareas = [
      glossarySv.listar().then((r) => (data.glosario = r)),
      categoriesSv.listar().then((r) => (data.categorias = r)),
      imagesWithTextSv.listar().then((r) => (data.imagenes = r)),
      erratasSv.listar().then((r) => (data.erratas = r)),
      notificationsSv.listar().then((r) => (data.notificaciones = r)),
      usersSv.listar().then((r) => (data.usuarios = r)),
      universesSv.listar().then((r) => (data.universos = r)),
      articles.listar().then((r) => (data.articulos = r)),
    ]
    if (!esRevisor) {
      tareas.push(recruitmentSv.listar().then((r) => (data.solicitudes = r)))
    }
    await Promise.all(tareas)
    setDato(data)
  }

  useEffect(() => {
    setDato(null)
    cargarTodo().catch(() => setDato(null))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!puedeAdministrar) {
    return (
      <div className="admin-standalone">
        <AdminHead user={user} />
        <div className="admin-body">
          <main className="admin-content">
            <div className="admin-panel">
              <header className="admin-panel-head">
                <div>
                  <h2 className="admin-panel-title">Sin acceso</h2>
                  <span className="admin-panel-sub">
                    Esta sección es exclusiva del equipo de administración.
                  </span>
                </div>
              </header>
              <p className="admin-lock-msg">
                No tienes permisos para gestionar el panel.
              </p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const conteos = {
    notificaciones: dato
      ? dato.notificaciones.filter((n) =>
          esPendienteNotificaciones('notificacion', n.estado),
        ).length +
        dato.erratas.filter((e) =>
          esPendienteNotificaciones('errata', e.estado),
        ).length +
        (esRevisor
          ? 0
          : (dato.solicitudes ?? []).filter((s) =>
              esPendienteNotificaciones('reclutamiento', s.estado),
            ).length)
      : undefined,
  }

  return (
    <div className="admin-standalone">
      <AdminHead user={user} />

      <div className="admin-body">
        <nav className="admin-sidenav" aria-label="Secciones del panel">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`adm-nav-item${tab === t.id ? ' active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <span className="material-symbols-outlined adm-nav-item-icon">
                {t.icon}
              </span>
              <span className="adm-nav-item-label">{t.label}</span>
              {dato &&
                t.id === 'notificaciones' &&
                conteos.notificaciones != null &&
                conteos.notificaciones > 0 && (
                  <span className="adm-nav-item-count">
                    {conteos.notificaciones}
                  </span>
                )}
            </button>
          ))}
        </nav>

        <main className="admin-content">
          {!dato && <p className="admin-empty">Cargando datos…</p>}

          {dato && tab === 'glosario' && (
            <SeccionGlosario glosario={dato.glosario} recargar={() => cargarTodo()} />
          )}
          {dato && tab === 'categorias' && (
            <SeccionCategorias categorias={dato.categorias} recargar={() => cargarTodo()} />
          )}
          {dato && tab === 'imagenes' && (
            <SeccionImagenes imagenes={dato.imagenes} recargar={() => cargarTodo()} />
          )}
          {dato && tab === 'articulos' && (
            <SeccionArticulos
              articulos={dato.articulos}
              universos={dato.universos}
              usuarios={dato.usuarios}
              recargar={() => cargarTodo()}
            />
          )}
          {dato && tab === 'usuarios' && (
            <SeccionUsuarios
              usuarios={dato.usuarios}
              recargar={() => cargarTodo()}
            />
          )}
          {dato && tab === 'universos' && (
            <SeccionUniversos
              universos={dato.universos}
              articulos={dato.articulos}
              usuarios={dato.usuarios}
              recargar={() => cargarTodo()}
            />
          )}
          {dato && tab === 'notificaciones' && (
            <SeccionNotificaciones
              notificaciones={dato.notificaciones}
              erratas={dato.erratas}
              solicitudes={dato.solicitudes}
              esRevisor={esRevisor}
              esAdmin={esAdmin}
              recargar={() => cargarTodo()}
            />
          )}
        </main>
      </div>
    </div>
  )
}

function SeccionGlosario({ glosario, recargar }) {
  return (
    <div className="admin-panel">
      <header className="admin-panel-head">
        <div>
          <h2 className="admin-panel-title">Términos del glosario</h2>
          <span className="admin-panel-sub">{glosario.length} términos</span>
        </div>
        <div className="admin-head-actions">
          <MasivoBtn seccion="glosario" />
          <NuevoBtn seccion="glosario" />
        </div>
      </header>
      <div className="table-scroll">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Término</th>
              <th>Traducción</th>
              <th>Universo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {glosario.map((g) => (
              <tr key={g.term}>
                <td className="adm-link">{g.term}</td>
                <td>{g.es}</td>
                <td>
                  <span className="adm-chip adm-chip-neutro">
                    {g.universo}
                  </span>
                </td>
                <td>
                  <AccionesFila
                    seccion="glosario"
                    fila={g}
                    svc={glossarySv}
                    recargar={recargar}
                    etiqueta={(f) => f.term}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SeccionCategorias({ categorias, recargar }) {
  return (
    <div className="admin-panel">
      <header className="admin-panel-head">
        <div>
          <h2 className="admin-panel-title">Categorías</h2>
          <span className="admin-panel-sub">{categorias.length} categorías</span>
        </div>
        <div className="admin-head-actions">
          <MasivoBtn seccion="categorias" />
          <NuevoBtn seccion="categorias" />
        </div>
      </header>
      <div className="table-scroll">
        <table className="adm-table">
          <thead>
            <tr>
              <th>En inglés</th>
              <th>En español</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((c) => (
              <tr key={c.id}>
                <td className="adm-link">{c.en}</td>
                <td>{c.es}</td>
                <td>
                  <AccionesFila
                    seccion="categorias"
                    fila={c}
                    svc={categoriesSv}
                    recargar={recargar}
                    etiqueta={(f) => f.en}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const ESTADOS_ARTICULO = [
  { id: 'todos', label: 'Todos' },
  { id: 'pendiente', label: 'Pendientes' },
  { id: 'en_revision', label: 'En revisión' },
  { id: 'revisado', label: 'Revisados' },
]

function SeccionArticulos({ articulos, universos, usuarios, recargar }) {
  const nombreUni = useMemo(
    () => new Map((universos ?? []).map((u) => [u.id, u.nombre])),
    [universos],
  )
  const nombreUser = useMemo(
    () =>
      new Map(
        (usuarios ?? []).map((u) => [
          u.id,
          [u.first_name, u.last_name].filter(Boolean).join(' ') || u.username,
        ]),
      ),
    [usuarios],
  )
  const [q, setQ] = useState('')
  const [estado, setEstado] = useState('todos')

  const filtrados = useMemo(() => {
    const term = q.trim().toLowerCase()
    return (articulos ?? [])
      .filter((a) => {
        if (term) {
          const campo = `${a.titleEn ?? ''} ${a.titleEs ?? ''}`.toLowerCase()
          if (!campo.includes(term)) return false
        }
        if (estado === 'revisado') return !!a.reviewed
        if (estado === 'en_revision') return !!a.translated && !a.reviewed
        if (estado === 'pendiente') return !a.translated
        return true
      })
      .slice(0, 250)
  }, [articulos, q, estado])

  return (
    <div className="admin-panel">
      <header className="admin-panel-head">
        <div>
          <h2 className="admin-panel-title">Artículos</h2>
          <span className="admin-panel-sub">
            {articulos?.length ?? 0} en el índice · mostrando {filtrados.length}
          </span>
        </div>
        <div className="admin-head-actions">
          <input
            className="admin-input"
            value={q}
            onChange={(ev) => setQ(ev.target.value)}
            placeholder="Buscar título…"
            aria-label="Buscar artículos"
          />
          <select
            className="adm-select"
            value={estado}
            onChange={(ev) => setEstado(ev.target.value)}
            aria-label="Filtrar por estado"
          >
            {ESTADOS_ARTICULO.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </select>
          <MasivoBtn seccion="articulos" />
          <NuevoBtn seccion="articulos" />
        </div>
      </header>

      <div className="table-scroll">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Artículo</th>
              <th>Universo</th>
              <th>Traductor</th>
              <th>Revisor</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((a) => (
              <tr key={a.id}>
                <td>
                  <span className="adm-link">{a.titleEn}</span>
                  <div className="adm-en">{a.titleEs || '—'}</div>
                </td>
                <td>
                  <span className="adm-chip adm-chip-neutro">
                    {nombreUni.get(Number(a.universe)) ?? a.universe ?? '—'}
                  </span>
                </td>
                <td>{nombreUser.get(a.translator) ?? '—'}</td>
                <td>{nombreUser.get(a.reviewer) ?? '—'}</td>
                <td>
                  <span
                    className={`adm-chip ${
                      a.reviewed
                        ? 'adm-chip-rev'
                        : a.translated
                          ? 'adm-chip-enrev'
                          : 'adm-chip-pend'
                    }`}
                  >
                    {a.reviewed
                      ? 'revisado'
                      : a.translated
                        ? 'en revisión'
                        : 'pendiente'}
                  </span>
                </td>
                <td>
                  <AccionesFila
                    seccion="articulos"
                    fila={a}
                    svc={articles}
                    recargar={recargar}
                    etiqueta={(f) => f.titleEn ?? f.titleEs ?? f.id}
                  />
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={6} className="admin-empty">
                  Sin resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SeccionImagenes({ imagenes, recargar }) {
  const pendientes = imagenes.filter((i) => i.pendienteEs)

  return (
    <div className="admin-panel">
      <header className="admin-panel-head">
        <div>
          <h2 className="admin-panel-title">Imágenes con texto</h2>
          <span className="admin-panel-sub">
            {imagenes.length} en total
            {pendientes.length > 0 &&
              ` · ${pendientes.length} sin versión ES (ver Notificaciones)`}
          </span>
        </div>
        <div className="admin-head-actions">
          <MasivoBtn seccion="imagenes" />
          <NuevoBtn seccion="imagenes" />
        </div>
      </header>

      <div className="table-scroll">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Si pone…</th>
              <th>…sustituir por</th>
              <th>Falta versión ES</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {imagenes.map((img) => (
              <tr key={img.id}>
                <td>
                  <span className="adm-link">{img.en}</span>
                </td>
                <td>
                  <span className="adm-link">{img.es || '—'}</span>
                </td>
                <td>{img.pendienteEs ? 'Sí' : '—'}</td>
                <td>
                  <AccionesFila
                    seccion="imagenes"
                    fila={img}
                    svc={imagesWithTextSv}
                    recargar={recargar}
                    etiqueta={(f) => f.nombre}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SeccionUsuarios({ usuarios, recargar }) {
  async function cambiarEstado(u, status) {
    const patch = { status, status_changed_at: fechaHoy() }
    if (status === 'descanso') {
      patch.is_resting = true
      patch.timeoff_date = fechaHoy()
      patch.out_date = null
    } else if (status === 'baja') {
      patch.is_resting = false
      patch.timeoff_date = null
      patch.out_date = fechaHoy()
    } else {
      patch.is_resting = false
      patch.timeoff_date = null
      patch.out_date = null
    }
    await usersSv.modificar(u.id, patch)
    await recargar()
  }

  return (
    <div className="admin-panel">
      <header className="admin-panel-head">
        <div>
          <h2 className="admin-panel-title">Usuarios</h2>
          <span className="admin-panel-sub">
            {usuarios.length} personas en el equipo
          </span>
        </div>
        <div className="admin-head-actions">
          <NuevoBtn seccion="usuarios" />
        </div>
      </header>
      <div className="table-scroll">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Perfil</th>
              <th>Estado</th>
              <th>Última en la Copper</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>
                  <span className="adm-link">
                    {[u.first_name, u.last_name].filter(Boolean).join(' ') ||
                      u.username}
                  </span>
                  <div className="adm-en">@{u.username}</div>
                </td>
                <td>
                  <span className="adm-chip adm-chip-neutro">
                    {u.groups?.[0] ?? u.rol ?? '—'}
                  </span>
                </td>
                <td>
                  <span
                    className={`adm-chip adm-chip-${u.status ?? 'activo'}`}
                  >
                    {u.status ?? '—'}
                  </span>
                </td>
                <td>
                  {u.last_copper_update ? (
                    <>
                      <span
                        className={`adm-chip ${claseInactividad(
                          diasSinTrabajar(u.last_copper_update),
                        )}`}
                      >
                        {diasSinTrabajar(u.last_copper_update)} días
                      </span>
                      <div className="adm-en">
                        {fmtFecha(u.last_copper_update)}
                      </div>
                    </>
                  ) : (
                    <span className="adm-en">Sin registro</span>
                  )}
                </td>
                <td>
                  {(u.status === 'descanso' || u.status === 'baja') && (
                    <button
                      type="button"
                      className="admin-btn admin-btn-ghost"
                      onClick={() => cambiarEstado(u, 'activo')}
                    >
                      Reactivar
                    </button>
                  )}
                  {u.status === 'activo' && (
                    <>
                      <button
                        type="button"
                        className="admin-btn admin-btn-ghost"
                        onClick={() => cambiarEstado(u, 'descanso')}
                      >
                        Descanso
                      </button>{' '}
                      <button
                        type="button"
                        className="admin-btn admin-btn-ghost"
                        onClick={() => cambiarEstado(u, 'baja')}
                      >
                        Baja
                      </button>
                    </>
                  )}
                </td>
                <td>
                  <AccionesFila
                    seccion="usuarios"
                    fila={u}
                    svc={usersSv}
                    recargar={recargar}
                    etiqueta={(f) =>
                      [f.first_name, f.last_name].filter(Boolean).join(' ') ||
                      f.username
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SeccionUniversos({ universos, articulos, usuarios, recargar }) {
  const conteo = useMemo(() => {
    const porUni = new Map()
    articulos.forEach((a) => {
      const u = Number(a.universe)
      const e = porUni.get(u) ?? { total: 0, revisados: 0, traducidos: 0 }
      e.total += 1
      if (a.reviewed) e.revisados += 1
      if (a.translated) e.traducidos += 1
      porUni.set(u, e)
    })
    const colaboradores = new Map()
    usuarios.forEach((u) => {
      ;(u.universe ?? []).forEach((un) => {
        colaboradores.set(Number(un), (colaboradores.get(Number(un)) ?? 0) + 1)
      })
    })
    return { porUni, colaboradores }
  }, [articulos, usuarios])

  return (
    <div className="admin-panel">
      <header className="admin-panel-head">
        <div>
          <h2 className="admin-panel-title">Universos</h2>
          <span className="admin-panel-sub">
            {universos.length} universos del Cosmere
          </span>
        </div>
        <div className="admin-head-actions">
          <MasivoBtn seccion="universos" />
          <NuevoBtn seccion="universos" />
        </div>
      </header>
      <div className="table-scroll">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Universo</th>
              <th>Artículos</th>
              <th>Traducidos</th>
              <th>Revisados</th>
              <th>Colaboradores</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {universos.map((uni) => {
              const e = conteo.porUni.get(uni.id) ?? {
                total: 0,
                traducidos: 0,
                revisados: 0,
              }
              const pct =
                e.total === 0 ? 0 : Math.round((e.traducidos / e.total) * 100)
              return (
                <tr key={uni.id}>
                  <td>
                    <span className="adm-link">{uni.nombre}</span>
                  </td>
                  <td>{e.total}</td>
                  <td>
                    {e.traducidos} ({pct}%)
                  </td>
                  <td>{e.revisados}</td>
                  <td>{conteo.colaboradores.get(uni.id) ?? 0}</td>
                  <td>
                    <AccionesFila
                      seccion="universos"
                      fila={uni}
                      svc={universesSv}
                      recargar={recargar}
                      etiqueta={(f) => f.nombre}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function NotasEditor({ registro, svc, recargar, esAdmin }) {
  const [valor, setValor] = useState(registro.notas ?? '')
  const [guardando, setGuardando] = useState(false)

  if (!esAdmin) {
    return registro.notas ? (
      <div className="adm-en adm-limit">Nota: {registro.notas}</div>
    ) : null
  }

  async function guardar() {
    if (valor === (registro.notas ?? '')) return
    setGuardando(true)
    await svc.modificar(registro.id, { notas: valor })
    await recargar()
    setGuardando(false)
  }

  return (
    <textarea
      className="adm-notes"
      value={valor}
      placeholder="Añadir nota interna…"
      rows={2}
      onChange={(ev) => setValor(ev.target.value)}
      onBlur={guardar}
      disabled={guardando}
      aria-label="Nota interna"
    />
  )
}

function SeccionNotificaciones({
  notificaciones,
  erratas,
  solicitudes,
  esRevisor,
  esAdmin,
  recargar,
}) {
  const [filtro, setFiltro] = useState('todas')
  const [avisoMail, setAvisoMail] = useState(null)
  const TIPO_LABEL = {
    notificacion: 'imagen_con_texto',
    errata: 'errata',
    reclutamiento: 'reclutamiento',
  }
  const TIPO_CHIP = {
    notificacion: 'adm-chip-neutro',
    errata: 'adm-chip-pend',
    reclutamiento: 'adm-chip-enrev',
  }

  const items = [
    ...notificaciones.map((n) => ({ tipo: 'notificacion', registro: n })),
    ...erratas.map((e) => ({ tipo: 'errata', registro: e })),
    ...(esRevisor
      ? []
      : (solicitudes ?? []).map((s) => ({
          tipo: 'reclutamiento',
          registro: s,
        }))),
  ].sort(
    (a, b) =>
      Number(esPendienteNotificaciones(b.tipo, b.registro.estado)) -
        Number(esPendienteNotificaciones(a.tipo, a.registro.estado)) ||
      String(b.registro.creado_en ?? '').localeCompare(
        String(a.registro.creado_en ?? ''),
      ),
  )
  const pendientes = items.filter((it) =>
    esPendienteNotificaciones(it.tipo, it.registro.estado),
  )

  const visibles = items.filter((it) => {
    if (filtro === 'todas') return true
    const pend = esPendienteNotificaciones(it.tipo, it.registro.estado)
    return filtro === 'pendientes' ? pend : !pend
  })

  async function resolver(n) {
    await notificationsSv.modificar(n.id, { estado: 'resuelta' })
    await recargar()
  }

  async function cambiarEstado(tipo, registro, estado) {
    if (tipo === 'errata') await erratasSv.modificar(registro.id, { estado })
    else await recruitmentSv.modificar(registro.id, { estado })
    await recargar()
    const resuelto =
      tipo === 'errata'
        ? estado === 'resuelto' || estado === 'descartado'
        : estado === 'aceptado' || estado === 'rechazado'
    if (resuelto) setAvisoMail({ tipo, registro })
  }

  return (
    <div className="admin-panel">
      <header className="admin-panel-head">
        <div>
          <h2 className="admin-panel-title">Notificaciones</h2>
          <span className="admin-panel-sub">
            {pendientes.length} pendientes · {items.length} en total ·
            erratas y solicitudes entran aquí desde la portada
          </span>
        </div>
        <div className="admin-head-actions">
          <select
            className="adm-select"
            value={filtro}
            onChange={(ev) => setFiltro(ev.target.value)}
            aria-label="Filtrar notificaciones"
          >
            <option value="todas">Todas</option>
            <option value="pendientes">Pendientes</option>
            <option value="resueltas">Resueltas</option>
          </select>
          <NuevoBtn seccion="notificaciones" />
        </div>
      </header>
      <div className="table-scroll">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Contexto</th>
              <th>Estado</th>
              <th>Creada</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visibles.map(({ tipo, registro }) => {
              const contexto =
                tipo === 'notificacion'
                  ? registro.contexto ?? registro.enUrl
                  : tipo === 'errata'
                    ? registro.articulo
                    : registro.nombre
              const detalle =
                tipo === 'notificacion'
                  ? registro.enUrl
                  : tipo === 'errata'
                    ? (registro.usuario ?? 'anónimo') +
                      (registro.email ? ` · ${registro.email}` : '')
                    : `${registro.libros?.length ?? 0} obras`
              const seccion =
                tipo === 'errata'
                  ? 'erratas'
                  : tipo === 'reclutamiento'
                    ? 'reclutamiento'
                    : 'notificaciones'
              const svc =
                tipo === 'errata'
                  ? erratasSv
                  : tipo === 'reclutamiento'
                    ? recruitmentSv
                    : notificationsSv
              const pendiente = esPendienteNotificaciones(tipo, registro.estado)
              const estadoLabel =
                tipo === 'notificacion'
                  ? registro.estado === 'pendiente'
                    ? 'nueva'
                    : 'resuelta'
                  : registro.estado
              return (
                <tr key={`${tipo}-${registro.id}`}>
                  <td>
                    <span className={`adm-chip ${TIPO_CHIP[tipo]}`}>
                      {TIPO_LABEL[tipo]}
                    </span>
                  </td>
                  <td>
                    <span className="adm-link">{contexto}</span>
                    {detalle && <div className="adm-en">{detalle}</div>}
                    {tipo === 'errata' && registro.texto && (
                      <div className="adm-en adm-limit">{registro.texto}</div>
                    )}
                    {tipo === 'reclutamiento' && (
                      <div className="adm-en adm-limit">
                        {registro.motivacion}
                      </div>
                    )}
                    {tipo !== 'notificacion' && (
                      <NotasEditor
                        registro={registro}
                        svc={svc}
                        recargar={recargar}
                        esAdmin={esAdmin}
                      />
                    )}
                  </td>
                  <td>
                    {tipo === 'notificacion' ? (
                      <span
                        className={`adm-chip ${
                          pendiente ? 'adm-chip-enrev' : 'adm-chip-rev'
                        }`}
                      >
                        {estadoLabel}
                      </span>
                    ) : (
                      <select
                        className="adm-select"
                        value={registro.estado}
                        onChange={(ev) =>
                          cambiarEstado(tipo, registro, ev.target.value)
                        }
                        aria-label="Estado de la solicitud"
                      >
                        {(tipo === 'errata'
                          ? ESTADOS_ERRATA
                          : ESTADOS_RECLUTAMIENTO
                        ).map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td>{fmtFecha(registro.creado_en)}</td>
                  <td>
                    {tipo === 'notificacion' && pendiente && (
                      <button
                        type="button"
                        className="admin-btn admin-btn-ghost"
                        onClick={() => resolver(registro)}
                      >
                        Marcar resuelta
                      </button>
                    )}
                  </td>
                  <td>
                    <AccionesFila
                      seccion={seccion}
                      fila={registro}
                      svc={svc}
                      recargar={recargar}
                      etiqueta={(f) =>
                        f.contexto ?? f.articulo ?? f.nombre ?? f.tipo
                      }
                    />
                  </td>
                </tr>
              )
            })}
            {visibles.length === 0 && (
              <tr>
                <td colSpan={6} className="admin-empty">
                  Nada que mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {avisoMail && (
        <div
          className="adm-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setAvisoMail(null)}
        >
          <div className="adm-modal" onClick={(ev) => ev.stopPropagation()}>
            <h3 className="adm-modal-title">Recuerda mandar el mail</h3>
            <p className="adm-modal-text">
              Has marcado{' '}
              {avisoMail.tipo === 'errata'
                ? 'la errata'
                : 'la solicitud de reclutamiento'}{' '}
              <strong>
                {avisoMail.registro.articulo ??
                  avisoMail.registro.nombre ??
                  `#${avisoMail.registro.id}`}
              </strong>{' '}
              como resuelta. Acuérdate de enviar el correo de respuesta.
            </p>
            <div className="adm-modal-actions">
              <button
                type="button"
                className="admin-btn"
                onClick={() => setAvisoMail(null)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}