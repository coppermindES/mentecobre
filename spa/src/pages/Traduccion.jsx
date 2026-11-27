import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { articles, universesSv, monthlyChangesSv } from '../api'

const estaVacio = (v) => v === null || v === undefined || v === ''

function hoy() {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${dia}`
}

export default function Traduccion() {
  const { user } = useAuth()
  const esRevisor = user?.role === 'revisor' || user?.role === 'admin'

  const TABS = [
    { id: 'traduccion', label: 'Traducción', icon: 'translate' },
    ...(esRevisor
      ? [{ id: 'revision', label: 'Revisión', icon: 'fact_check' }]
      : []),
    { id: 'actualizacion', label: 'Actualización', icon: 'update' },
  ]

  const TAB_TEXTO = {
    traduccion: {
      titulo: 'Traducción',
      subtitulo:
        'Tu artículo actual y el siguiente por asignar de cada uno de tus universos.',
    },
    revision: {
      titulo: 'Revisión',
      subtitulo:
        'Revisa los artículos ya traducidos y pendientes de verificación.',
    },
    actualizacion: {
      titulo: 'Actualización',
      subtitulo:
        'Cambios que detecta la API en la Coppermind en inglés, agrupados por tipo de trabajo.',
    },
  }

  const [tab, setTab] = useState(TABS[0]?.id ?? 'traduccion')
  const [estado, setEstado] = useState({ tab: null, datos: null, cambios: null })

  const cargar = useCallback(async () => {
    const [articulos, universos] = await Promise.all([
      articles.listar(),
      universesSv.listar(),
    ])
    const porId = new Map(universos.map((u) => [Number(u.id), u.nombre]))
    return { articulos, nombreUni: (id) => porId.get(Number(id)) ?? 'Otro' }
  }, [])

  const cargarCambios = useCallback(async () => {
    const [articulos, cambiosLista] = await Promise.all([
      articles.listar(),
      monthlyChangesSv.listar(),
    ])
    return { articulos, cambios: cambiosLista }
  }, [])

  const cargarTab = useCallback(
    async (id) => {
      if (id === 'actualizacion') {
        return { cambios: await cargarCambios().catch(() => null) }
      }
      return { datos: await cargar().catch(() => null) }
    },
    [cargar, cargarCambios],
  )

  const recargar = useCallback(async () => {
    const data = await cargarTab(tab)
    setEstado((prev) => ({ ...prev, tab, ...data }))
  }, [tab, cargarTab])

  useEffect(() => {
    cargarTab(tab).then((data) =>
      setEstado((prev) => ({ ...prev, tab, ...data })),
    )
  }, [tab, cargarTab])

  if (!user) {
    return (
      <div>
        <header className="page-header">
          <span className="accent-bar"></span>
          <div>
            <h1 className="page-title">Traducción</h1>
          </div>
        </header>
        <div className="glass-panel login-card">
          <span className="material-symbols-outlined login-icon">translate</span>
          <h2 className="login-title">Inicia sesión</h2>
          <p className="login-text">
            La sección de traducción está reservada a personas registradas.
          </p>
          <Link className="btn btn-primary btn-lg" to="/login">
            Iniciar sesión
          </Link>
        </div>
      </div>
    )
  }

  const { titulo, subtitulo } = TAB_TEXTO[tab] ?? TAB_TEXTO.traduccion

  const datos = estado.tab === tab ? estado.datos : null
  const cambios = estado.tab === tab ? estado.cambios : null

  return (
    <div>
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">{titulo}</h1>
          <p className="page-sub">{subtitulo}</p>
        </div>
      </header>

      <div
        className="admin-tabs"
        role="tablist"
        aria-label="Secciones de traducción"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`admin-tab${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <span className="material-symbols-outlined admin-tab-icon">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'traduccion' && <TabTraduccion user={user} datos={datos} recargar={recargar} />}

      {tab === 'revision' && esRevisor && (
        <SeccionRevision user={user} datos={datos} recargar={recargar} />
      )}

      {tab === 'actualizacion' && (
        <TabActualizacion
          cambios={cambios}
          recargar={recargar}
          esRevisor={esRevisor}
        />
      )}
    </div>
  )
}

function TabTraduccion({ user, datos, recargar }) {
  const [modalArticuloId, setModalArticuloId] = useState(null)
  const [notas, setNotas] = useState('')

  if (!datos) {
    return <p className="traduccion-empty">Cargando artículos…</p>
  }

  const misUniversos = (user.universe ?? []).map((u) => Number(u))
  const articulos = datos.articulos.filter((a) =>
    misUniversos.includes(Number(a.universe)),
  )

  const trabajando =
    articulos.find(
      (a) => Number(a.translator) === user.id && !a.translated,
    ) ?? null
  const porUniverso = new Map()
  articulos.forEach((a) => {
    if (a.translated || !estaVacio(a.translator)) return
    const uni = Number(a.universe)
    if (!porUniverso.has(uni)) porUniverso.set(uni, a)
  })
  const siguientes = Array.from(porUniverso.values())
  const tieneAsignado = Boolean(trabajando)
  const modalArticulo =
    modalArticuloId != null
      ? (datos.articulos.find((a) => a.id === modalArticuloId) ?? null)
      : null

  function openModal(id) {
    setNotas('')
    setModalArticuloId(id)
  }

  function cerrarModal() {
    setModalArticuloId(null)
    setNotas('')
  }

  async function aceptar() {
    if (modalArticuloId == null) return
    await articles.modificar(modalArticuloId, {
      translated: true,
      translatedDate: hoy(),
      notes: notas.trim() || modalArticulo.notes,
    })
    await recargar()
    cerrarModal()
  }

  async function asignar(articulo) {
    await articles.modificar(articulo.id, {
      translator: user.id,
      assignedDate: hoy(),
    })
    await recargar()
  }

  return (
    <>
      {trabajando ? (
        <section className="traduccion-section">
          <h2 className="traduccion-h2">Artículo en el que estás trabajando</h2>
          <ArticuloCard
            articulo={trabajando}
            modo="trabajando"
            nombreUni={datos.nombreUni}
            labelMarcar="Marcar como traducido"
            onMarcar={() => openModal(trabajando.id)}
          />
        </section>
      ) : (
        siguientes.length > 0 && (
          <section className="traduccion-section">
            <p className="traduccion-hint">
              No tienes ningún artículo asignado. Asigna uno de abajo para
              empezar a traducir.
            </p>
          </section>
        )
      )}

      <section className="traduccion-section">
        <h2 className="traduccion-h2">Siguientes por asignar</h2>
        {siguientes.length === 0 ? (
          <p className="traduccion-empty">
            No hay más artículos disponibles en tus universos.
          </p>
        ) : (
          <div className="traduccion-grid">
            {siguientes.map((a) => (
              <ArticuloCard
                key={a.id}
                articulo={a}
                modo="asignar"
                nombreUni={datos.nombreUni}
                onAsignar={() => asignar(a)}
                asignarDeshabilitado={tieneAsignado}
              />
            ))}
          </div>
        )}
      </section>

      {modalArticulo && (
        <div className="modal-backdrop" onClick={cerrarModal}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="modal-title">
              Estás a punto de marcar como traducido «{modalArticulo.titleEs}»
            </h3>
            <label className="modal-label" htmlFor="notas-revisor">
              Notas para el revisor
            </label>
            <textarea
              id="notas-revisor"
              className="modal-textarea"
              rows={4}
              placeholder="Añade aquí cualquier nota para quien revise tu traducción..."
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-ghost btn-lg"
                onClick={cerrarModal}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={aceptar}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ArticuloCard({
  articulo,
  modo,
  nombreUni,
  onMarcar,
  onAsignar,
  asignarDeshabilitado,
  labelMarcar = 'Marcar como traducido',
}) {
  return (
    <article
      className={`traduccion-card${modo === 'trabajando' ? ' traduccion-principal' : ''}`}
    >
      <span className="traduccion-chip">
        {nombreUni(articulo.universe)}
      </span>
      <div className="traduccion-titulos">
        {articulo.urlEs ? (
          <a
            className="traduccion-titulo-es"
            href={articulo.urlEs}
            target="_blank"
            rel="noreferrer"
          >
            {articulo.titleEs}
          </a>
        ) : (
          <span className="traduccion-titulo-es">{articulo.titleEs}</span>
        )}
        {articulo.urlEn ? (
          <a
            className="traduccion-titulo-en"
            href={articulo.urlEn}
            target="_blank"
            rel="noreferrer"
          >
            {articulo.titleEn}
          </a>
        ) : (
          <span className="traduccion-titulo-en">{articulo.titleEn}</span>
        )}
      </div>
      {modo === 'trabajando' ? (
        <button
          type="button"
          className="btn btn-primary btn-lg traduccion-btn"
          onClick={onMarcar}
        >
          {labelMarcar}
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-ghost btn-lg traduccion-btn"
          onClick={onAsignar}
          disabled={asignarDeshabilitado}
        >
          Asignármelo a mí
        </button>
      )}
    </article>
  )
}

function SeccionRevision({ user, datos, recargar }) {
  const [modalId, setModalId] = useState(null)
  const [notas, setNotas] = useState('')

  if (!datos) {
    return <p className="traduccion-empty">Cargando artículos…</p>
  }

  const misUniversos = (user.universe ?? []).map((u) => Number(u))

  const trabajando =
    datos.articulos.find(
      (a) => a.translated && !a.reviewed && Number(a.reviewer) === user.id,
    ) ?? null

  const articulos = datos.articulos.filter(
    (a) => a.translated && !a.reviewed && misUniversos.includes(Number(a.universe)),
  )
  const porUniverso = new Map()
  articulos.forEach((a) => {
    if (!estaVacio(a.reviewer)) return
    const uni = Number(a.universe)
    if (!porUniverso.has(uni)) porUniverso.set(uni, a)
  })
  const siguientes = Array.from(porUniverso.values())
  const tieneAsignado = Boolean(trabajando)

  const modalArticulo =
    modalId != null
      ? (datos.articulos.find((a) => a.id === modalId) ?? null)
      : null

  function openModal(id) {
    setNotas('')
    setModalId(id)
  }

  function cerrarModal() {
    setModalId(null)
    setNotas('')
  }

  async function aceptar() {
    if (modalArticulo == null) return
    await articles.modificar(modalArticulo.id, {
      reviewed: true,
      reviewedDate: hoy(),
      notes: notas.trim() || modalArticulo.notes,
    })
    await recargar()
    cerrarModal()
  }

  async function asignar(articulo) {
    await articles.modificar(articulo.id, {
      reviewer: user.id,
      reviewerassignedDate: hoy(),
    })
    await recargar()
  }

  return (
    <>
      {trabajando ? (
        <section className="traduccion-section">
          <h2 className="traduccion-h2">Artículo en el que estás trabajando</h2>
          <ArticuloCard
            articulo={trabajando}
            modo="trabajando"
            nombreUni={datos.nombreUni}
            labelMarcar="Marcar como revisado"
            onMarcar={() => openModal(trabajando.id)}
          />
        </section>
      ) : (
        siguientes.length > 0 && (
          <section className="traduccion-section">
            <p className="traduccion-hint">
              No tienes ningún artículo asignado. Asigna uno de abajo para
              empezar a revisar.
            </p>
          </section>
        )
      )}

      <section className="traduccion-section">
        <h2 className="traduccion-h2">Siguientes por revisar</h2>
        {siguientes.length === 0 ? (
          <p className="traduccion-empty">
            No hay más artículos disponibles en tus universos.
          </p>
        ) : (
          <div className="traduccion-grid">
            {siguientes.map((a) => (
              <ArticuloCard
                key={a.id}
                articulo={a}
                modo="asignar"
                nombreUni={datos.nombreUni}
                onAsignar={() => asignar(a)}
                asignarDeshabilitado={tieneAsignado}
              />
            ))}
          </div>
        )}
      </section>

      {modalArticulo && (
        <div className="modal-backdrop" onClick={cerrarModal}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="modal-title">
              Estás a punto de marcar como revisado «{modalArticulo.titleEs}»
            </h3>
            <label className="modal-label" htmlFor="notas-revision">
              Notas al artículo (opcional)
            </label>
            <textarea
              id="notas-revision"
              className="modal-textarea"
              rows={4}
              placeholder="Añade aquí cualquier comentario sobre la revisión..."
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-ghost btn-lg"
                onClick={cerrarModal}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={aceptar}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function slugUrl(t) {
  return (t ?? '').trim().replace(/\s+/g, '_')
}

function copperEn(t) {
  return `https://coppermind.net/edit/${slugUrl(t)}`
}

function copperEs(t) {
  return `https://es.coppermind.net/edit/${slugUrl(t)}`
}

function tipoDeCambio(c, porId) {
  if (c.tipo === 'htup') return 'htup'
  const a = c.articleId != null ? porId.get(Number(c.articleId)) : null
  if (!a) return 'crear'
  return a.translated ? 'traducido' : 'sin_traducir'
}

function nombreCambio(c, porId) {
  const a = c.articleId != null ? porId.get(Number(c.articleId)) : null
  return a ? a.titleEs || a.titleEn : `#${c.articleId}`
}

function fechaCambio(c) {
  const f = c.fechaCambioEn ?? c.revisarDesde ?? c.mesInicio
  if (!f) return '—'
  const d = new Date(f)
  if (Number.isNaN(d.getTime())) return f
  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

async function marcarHecho(c, recargar) {
  await monthlyChangesSv.modificar(c.id, { hecho: true })
  await recargar()
}

async function marcarGrandes(c, valor, recargar) {
  await monthlyChangesSv.modificar(c.id, { cambiosGrandes: valor })
  await recargar()
}

function Acordeon({ titulo, chip, pendientes, children }) {
  return (
    <details className="traduccion-acordeon">
      <summary>
        <span className="material-symbols-outlined traduccion-acordeon-icon">
          expand_more
        </span>
        <span className="traduccion-acordeon-titulo">{titulo}</span>
        <span className={`admin-chip ${chip}`}>{pendientes}</span>
      </summary>
      <div className="traduccion-acordeon-body">
        {pendientes === 0 ? (
          <p className="traduccion-empty">Sin cambios pendientes en este grupo.</p>
        ) : (
          children
        )}
      </div>
    </details>
  )
}

function CheckHecho({ c, modoSel, seleccion, toggleSel, recargar }) {
  if (modoSel) {
    return (
      <input
        type="checkbox"
        className="traduccion-check"
        checked={seleccion.has(c.id)}
        onChange={() => toggleSel(c.id)}
        aria-label={`Marcar la entrada de actualización #${c.id} como hecha`}
      />
    )
  }
  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm"
      onClick={() => marcarHecho(c, recargar)}
    >
      Marcar como hecho
    </button>
  )
}

function FilaHTUP({ c, porId, modoSel, seleccion, toggleSel, recargar }) {
  const a = c.articleId != null ? porId.get(Number(c.articleId)) : null
  return (
    <div className="traduccion-fila">
      <CheckHecho
        c={c}
        modoSel={modoSel}
        seleccion={seleccion}
        toggleSel={toggleSel}
        recargar={recargar}
      />
      <div className="traduccion-fila-info">
        <span className="admin-link">{nombreCambio(c, porId)}</span>
      </div>
      <div className="traduccion-acciones">
        <Link
          to={a ? `/admin/articulos/${a.id}` : '/admin/articulos'}
          className="btn btn-primary btn-sm"
        >
          Solucionarlo
        </Link>
      </div>
    </div>
  )
}

function FilaCrear({ c, porId, modoSel, seleccion, toggleSel, recargar }) {
  const [trad, setTrad] = useState('')
  return (
    <div className="traduccion-fila">
      <CheckHecho
        c={c}
        modoSel={modoSel}
        seleccion={seleccion}
        toggleSel={toggleSel}
        recargar={recargar}
      />
      <div className="traduccion-fila-info">
        <a
          className="admin-link"
          href={copperEn(c.tituloEn ?? nombreCambio(c, porId))}
          target="_blank"
          rel="noreferrer"
        >
          {c.tituloEn ?? nombreCambio(c, porId)}
        </a>
        <input
          className="admin-input traduccion-trad-input"
          value={trad}
          onChange={(ev) => setTrad(ev.target.value)}
          placeholder="Traducción al español"
        />
      </div>
      <div className="traduccion-acciones">
        <a
          className="btn btn-primary btn-sm"
          href={copperEs(trad)}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!trad.trim()}
          onClick={(ev) => {
            if (!trad.trim()) ev.preventDefault()
          }}
        >
          Crear en la Copper
        </a>
        <Link to="/admin/articulos/nuevo" className="btn btn-primary btn-sm">
          Crear en la DDBB
        </Link>
      </div>
    </div>
  )
}

function FilaSinTraducir({ c, porId, modoSel, seleccion, toggleSel, recargar }) {
  const a = c.articleId != null ? porId.get(Number(c.articleId)) : null
  return (
    <div className="traduccion-fila">
      <CheckHecho
        c={c}
        modoSel={modoSel}
        seleccion={seleccion}
        toggleSel={toggleSel}
        recargar={recargar}
      />
      <div className="traduccion-fila-info">
        <span className="admin-link">{nombreCambio(c, porId)}</span>
      </div>
      <div className="traduccion-acciones">
        <a
          className="btn btn-ghost btn-sm"
          href={a ? copperEn(a.titleEn) : '#'}
          target="_blank"
          rel="noreferrer"
        >
          Copper EN
        </a>
        <a
          className="btn btn-ghost btn-sm"
          href={a ? copperEs(a.titleEs || a.titleEn) : '#'}
          target="_blank"
          rel="noreferrer"
        >
          Copper ES
        </a>
      </div>
    </div>
  )
}

function FilaTraducido({ c, porId, modoSel, seleccion, toggleSel, recargar }) {
  const a = c.articleId != null ? porId.get(Number(c.articleId)) : null
  return (
    <div className="traduccion-fila">
      <div className="traduccion-fila-control">
        <CheckHecho
          c={c}
          modoSel={modoSel}
          seleccion={seleccion}
          toggleSel={toggleSel}
          recargar={recargar}
        />
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => marcarGrandes(c, true, recargar)}
        >
          Cambios grandes
        </button>
      </div>
      <div className="traduccion-fila-info">
        <span className="admin-link">{nombreCambio(c, porId)}</span>
        <div className="admin-count">
          Cambios desde: <strong>{fechaCambio(c)}</strong>
        </div>
      </div>
      <div className="traduccion-acciones">
        <a
          className="btn btn-ghost btn-sm"
          href={a ? copperEn(a.titleEn) : '#'}
          target="_blank"
          rel="noreferrer"
        >
          Copper EN
        </a>
        <a
          className="btn btn-ghost btn-sm"
          href={a ? copperEs(a.titleEs || a.titleEn) : '#'}
          target="_blank"
          rel="noreferrer"
        >
          Copper ES
        </a>
      </div>
    </div>
  )
}

function FilaGrandes({ c, porId, modoSel, seleccion, toggleSel, recargar }) {
  const a = c.articleId != null ? porId.get(Number(c.articleId)) : null
  return (
    <div className="traduccion-fila">
      <div className="traduccion-fila-control">
        <CheckHecho
          c={c}
          modoSel={modoSel}
          seleccion={seleccion}
          toggleSel={toggleSel}
          recargar={recargar}
        />
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => marcarGrandes(c, false, recargar)}
        >
          Quitar de grandes
        </button>
      </div>
      <div className="traduccion-fila-info">
        <span className="admin-link">{nombreCambio(c, porId)}</span>
        <div className="admin-count">
          Cambios desde: <strong>{fechaCambio(c)}</strong>
        </div>
      </div>
      <div className="traduccion-acciones">
        <a
          className="btn btn-ghost btn-sm"
          href={a ? copperEn(a.titleEn) : '#'}
          target="_blank"
          rel="noreferrer"
        >
          Copper EN
        </a>
        <a
          className="btn btn-ghost btn-sm"
          href={a ? copperEs(a.titleEs || a.titleEn) : '#'}
          target="_blank"
          rel="noreferrer"
        >
          Copper ES
        </a>
      </div>
    </div>
  )
}

function TabActualizacion({ cambios, recargar, esRevisor }) {
  const [modoSel, setModoSel] = useState(false)
  const [seleccion, setSeleccion] = useState(() => new Set())

  const porId = useMemo(
    () => new Map((cambios?.articulos ?? []).map((a) => [Number(a.id), a])),
    [cambios],
  )

  const grupos = useMemo(() => {
    const acc = {
      htup: [],
      crear: [],
      sin_traducir: [],
      traducido: [],
      cambios_grandes: [],
    }
    for (const c of cambios?.cambios ?? []) {
      const tipo = tipoDeCambio(c, porId)
      const destino =
        tipo === 'traducido' && c.cambiosGrandes ? 'cambios_grandes' : tipo
      acc[destino].push(c)
    }
    const cmp = (a, b) =>
      nombreCambio(a, porId).localeCompare(nombreCambio(b, porId), 'es')
    for (const k of Object.keys(acc)) acc[k].sort(cmp)
    return acc
  }, [cambios, porId])

  if (!cambios) {
    return <p className="traduccion-empty">Cargando cambios…</p>
  }

  const visibles = esRevisor
    ? ['htup', 'crear', 'sin_traducir', 'traducido', 'cambios_grandes']
    : ['sin_traducir', 'traducido', 'cambios_grandes']
  const pendientes = visibles.reduce(
    (n, k) => n + grupos[k].filter((c) => !c.hecho).length,
    0,
  )

  function toggleSel(id) {
    setSeleccion((prev) => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return s
    })
  }

  async function aplicarSeleccion(datos) {
    const ids = [...seleccion]
    for (const id of ids) {
      await monthlyChangesSv.modificar(id, datos)
    }
    setSeleccion(new Set())
    await recargar()
  }

  const selCambios = [...seleccion]
    .map((id) => cambios.cambios.find((c) => c.id === id))
    .filter(Boolean)
  const todasTraducidas =
    selCambios.length > 0 &&
    selCambios.every((c) => tipoDeCambio(c, porId) === 'traducido')
  const hayPorGrandes = selCambios.some((c) => !c.cambiosGrandes)
  const hayGrandes = selCambios.some((c) => c.cambiosGrandes)

  if ((cambios.cambios ?? []).length === 0) {
    return (
      <p className="traduccion-empty">
        No hay cambios detectados este mes por la API.
      </p>
    )
  }

  const propsFila = { modoSel, seleccion, toggleSel, recargar }

  return (
    <div>
      <div className="traduccion-toolbar">
        <p className="traduccion-pendientes">
          <strong>{pendientes}</strong>{' '}
          {pendientes === 1
            ? 'pendiente de actualizar'
            : 'pendientes de actualizar'}
        </p>
        <div className="traduccion-acciones">
          {modoSel ? (
            <>
              {seleccion.size > 0 && (
              <>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => aplicarSeleccion({ hecho: true })}
                >
                  Marcar como hechas ({seleccion.size})
                </button>
                {todasTraducidas && hayPorGrandes && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => aplicarSeleccion({ cambiosGrandes: true })}
                  >
                    Marcar como cambios grandes ({seleccion.size})
                  </button>
                )}
                {todasTraducidas && hayGrandes && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => aplicarSeleccion({ cambiosGrandes: false })}
                  >
                    Quitar de grandes ({seleccion.size})
                  </button>
                )}
              </>
            )}
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setModoSel(false)
                  setSeleccion(new Set())
                }}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setModoSel(true)}
            >
              Seleccionar varios
            </button>
          )}
        </div>
      </div>

      {esRevisor && (
        <Acordeon
          titulo="Houston, tenemos un problema"
          chip="admin-chip-pend"
          pendientes={grupos.htup.filter((c) => !c.hecho).length}
        >
          {grupos.htup
            .filter((c) => !c.hecho)
            .map((c) => (
              <FilaHTUP key={c.id} c={c} porId={porId} {...propsFila} />
            ))}
        </Acordeon>
      )}

      {esRevisor && (
        <Acordeon
          titulo="Crear"
          chip="admin-chip-neutro"
          pendientes={grupos.crear.filter((c) => !c.hecho).length}
        >
          {grupos.crear
            .filter((c) => !c.hecho)
            .map((c) => (
              <FilaCrear key={c.id} c={c} porId={porId} {...propsFila} />
            ))}
        </Acordeon>
      )}

      <Acordeon
        titulo="Sin traducir"
        chip="admin-chip-enrev"
        pendientes={grupos.sin_traducir.filter((c) => !c.hecho).length}
      >
        {grupos.sin_traducir
          .filter((c) => !c.hecho)
          .map((c) => (
            <FilaSinTraducir key={c.id} c={c} porId={porId} {...propsFila} />
          ))}
      </Acordeon>

      <Acordeon
        titulo="Traducido"
        chip="admin-chip-rev"
        pendientes={grupos.traducido.filter((c) => !c.hecho).length}
      >
        {grupos.traducido
          .filter((c) => !c.hecho)
          .map((c) => (
            <FilaTraducido key={c.id} c={c} porId={porId} {...propsFila} />
          ))}
      </Acordeon>

      <Acordeon
        titulo="Cambios grandes"
        chip="admin-chip-alta"
        pendientes={grupos.cambios_grandes.filter((c) => !c.hecho).length}
      >
        {grupos.cambios_grandes
          .filter((c) => !c.hecho)
          .map((c) => (
            <FilaGrandes key={c.id} c={c} porId={porId} {...propsFila} />
          ))}
      </Acordeon>
    </div>
  )
}