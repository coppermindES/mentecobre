import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { AdminHead } from '../Admin'
import { SCHEMAS, fmtFecha } from './schemas'

const SIN_ACCESO_REVISOR = new Set(['usuarios', 'universos', 'reclutamiento'])

const EJEMPLOS_CAMPO = {
  term: 'Investiture',
  es: 'Investidura',
  en: 'Investiture.jpg',
  nombre: 'Scadrial',
  titleEn: 'Investiture',
  titleEs: 'Investidura',
  urlEn: 'https://coppermind.net/wiki/Investiture',
  urlEs: 'https://es.coppermind.net/wiki/Investidura',
  articulo: 'Elantris',
  texto: 'Falta la tabla de metales alománticos.',
  email: 'kokerlii@mentecobre.dev',
  username: 'kokerlii',
  first_name: 'Kokerlii',
  last_name: 'Cotorra',
  notes: 'Pendiente de revisar.',
  notas: 'Pendiente de revisar.',
  contexto: 'Armaduras esquirladas',
  enUrl: 'https://coppermind.net/wiki/Special:FilePath/Shardplate.jpeg',
  tipo: 'imagen_con_texto',
}

function opcionesDe(campo, extras) {
  return campo.opciones ? extras[campo.opciones] ?? [] : []
}

function etiquetaOpcion(op) {
  if (op && typeof op === 'object') return op.nombre ?? op.label ?? String(op.id)
  return String(op)
}

function aFormulario(schema, registro) {
  const base = { ...(schema.nuevosDefecto?.() ?? {}), ...(registro ?? {}) }
  const formula = {}
  for (const campo of schema.campos) {
    const v = base[campo.guard]
    if (campo.tipo === 'lista') formula[campo.guard] = (Array.isArray(v) ? v : []).join('\n')
    else if (campo.tipo === 'ids') formula[campo.guard] = (Array.isArray(v) ? v : []).map(Number)
    else if (campo.tipo === 'checkbox') formula[campo.guard] = Boolean(v)
    else formula[campo.guard] = v ?? ''
  }
  return formula
}

function deFormulario(campo, v) {
  if (campo.tipo === 'lista') {
    return String(v ?? '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  if (campo.tipo === 'ids') return (Array.isArray(v) ? v : []).map(Number)
  if (campo.tipo === 'checkbox') return Boolean(v)
  if (campo.tipo === 'numero') return v === '' || v == null ? null : Number(v)
  if (campo.tipo === 'fecha') return v === '' || v == null ? null : v
  if (campo.tipo === 'universo' || campo.tipo === 'usuario') {
    return v === '' || v == null ? null : Number(v)
  }
  if (['texto', 'textarea', 'url', 'select'].includes(campo.tipo)) {
    return String(v ?? '').trim()
  }
  return v
}

function valorTexto(schema, campo, registro, extras) {
  const v = registro?.[campo.guard]
  if (Array.isArray(v)) {
    if (campo.tipo === 'ids') {
      const porId = new Map(
        opcionesDe(campo, extras).map((op) => [Number(op.id), etiquetaOpcion(op)]),
      )
      const nombres = v
        .map((x) => porId.get(Number(x)) ?? x)
        .filter((x) => x != null && x !== '')
      return nombres.length ? nombres.join(', ') : '—'
    }
    return v.length ? v.map(String).join(', ') : '—'
  }
  if (v === null || v === undefined || v === '') return '—'
  if (campo.tipo === 'fecha') return fmtFecha(v)
  if (campo.tipo === 'checkbox') return v ? 'Sí' : 'No'
  if ((campo.tipo === 'universo' || campo.tipo === 'usuario') && campo.opciones) {
    const opcion = opcionesDe(campo, extras).find((op) => Number(op.id) === Number(v))
    return opcion ? etiquetaOpcion(opcion) : String(v)
  }
  return String(v)
}

function CampoForm({ campo, formula, extras, onChange, onBlur }) {
  const actualizar = (valor) => onChange(campo.guard, valor)

  if (campo.tipo === 'textarea' || campo.tipo === 'lista') {
    return (
      <textarea
        className="admin-textarea"
        rows={3}
        value={formula[campo.guard]}
        onChange={(ev) => actualizar(ev.target.value)}
        placeholder={campo.tipo === 'lista' ? 'Uno por línea' : undefined}
      />
    )
  }
  if (campo.tipo === 'numero') {
    return (
      <input
        className="admin-input"
        type="number"
        value={formula[campo.guard]}
        onChange={(ev) => actualizar(ev.target.value)}
      />
    )
  }
  if (campo.tipo === 'fecha') {
    return (
      <input
        className="admin-input"
        type="date"
        value={formula[campo.guard]}
        onChange={(ev) => actualizar(ev.target.value)}
      />
    )
  }
  if (campo.tipo === 'checkbox') {
    return (
      <label className="adm-check-line">
        <input
          type="checkbox"
          checked={formula[campo.guard]}
          onChange={(ev) => actualizar(ev.target.checked)}
        />
        {campo.etiqueta}
      </label>
    )
  }
  if (campo.tipo === 'select') {
    return (
      <select
        className="adm-select"
        value={formula[campo.guard]}
        onChange={(ev) => actualizar(ev.target.value)}
      >
        {(campo.opciones ?? []).map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    )
  }
  if (campo.tipo === 'universo' || campo.tipo === 'usuario') {
    return (
      <select
        className="adm-select"
        value={String(formula[campo.guard] ?? '')}
        onChange={(ev) => actualizar(ev.target.value)}
      >
        <option value="">—</option>
        {opcionesDe(campo, extras).map((op) => (
          <option key={op.id} value={String(op.id)}>
            {etiquetaOpcion(op)}
          </option>
        ))}
      </select>
    )
  }
  if (campo.tipo === 'ids') {
    const seleccion = new Set(formula[campo.guard])
    const alternar = (num) => {
      const nuevo = new Set(seleccion)
      if (nuevo.has(num)) nuevo.delete(num)
      else nuevo.add(num)
      actualizar([...nuevo])
    }
    return (
      <ul className="adm-check-group">
        {opcionesDe(campo, extras).map((op) => {
          const num = Number(op.id)
          return (
            <li key={op.id}>
              <label className="adm-check-line">
                <input
                  type="checkbox"
                  checked={seleccion.has(num)}
                  onChange={() => alternar(num)}
                />
                {etiquetaOpcion(op)}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <input
      className="admin-input"
      type="text"
      value={formula[campo.guard]}
      onChange={(ev) => actualizar(ev.target.value)}
      onBlur={onBlur}
    />
  )
}

export default function AdminDetalle() {
  const { seccion, id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const esRevisor = user?.role === 'revisor'
  const schema = SCHEMAS[seccion]
  const esNuevo = id === 'nuevo'

  const [editando, setEditando] = useState(esNuevo)
  const [registro, setRegistro] = useState(null)
  const [extras, setExtras] = useState({})
  const [formula, setFormula] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState(null)
  const [cruce, setCruce] = useState(null)

  useEffect(() => {
    if (!schema) return
    let activo = true
    setCargando(true)
    setError(null)
    setGuardando(false)
    setRegistro(null)
    setCruce(null)
    setEditando(esNuevo)
    ;(async () => {
      try {
        const ex = schema.cargaExtras ? await schema.cargaExtras() : {}
        if (!activo) return
        setExtras(ex)
        if (esNuevo) {
          setFormula(aFormulario(schema, {}))
        } else {
          const filas = await schema.svc.listar()
          if (!activo) return
          const encontrado = filas.find((f) => Number(f.id) === Number(id))
          setRegistro(encontrado ?? null)
          setFormula(encontrado ? aFormulario(schema, encontrado) : null)
        }
        setCargando(false)
      } catch (e) {
        if (activo) {
          setError(String(e?.message ?? e))
          setCargando(false)
        }
      }
    })()
    return () => {
      activo = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seccion, id])

  function actualizarCampo(guard, valor) {
    setFormula((f) => (f ? { ...f, [guard]: valor } : f))
  }

  async function comprobarCruce() {
    if (!esNuevo || !schema?.cruce || !formula) return
    const valor = String(formula[schema.cruce.clave] ?? '').trim()
    if (!valor) return
    try {
      const filas = await schema.cruce.svc.listar()
      const encontrado = filas.find(
        (f) =>
          String(f[schema.cruce.claveOtra] ?? '')
            .trim()
            .toLowerCase() === valor.toLowerCase(),
      )
      if (encontrado) setCruce(encontrado)
    } catch {
      return
    }
  }

  function traerDatos() {
    if (!cruce || !schema?.cruce) return
    setFormula((f) => {
      const nuevo = { ...f }
      for (const [destino, origen] of Object.entries(schema.cruce.mapa)) {
        const v = cruce[origen]
        if (v !== undefined && v !== null && v !== '') nuevo[destino] = v
      }
      return nuevo
    })
    setCruce(null)
  }

  async function guardar() {
    setGuardando(true)
    setError(null)
    try {
      const payload = {}
      for (const campo of schema.campos) {
        payload[campo.guard] = deFormulario(campo, formula[campo.guard])
      }
      const guardado = esNuevo
        ? await schema.svc.crear(payload)
        : await schema.svc.modificar(Number(id), payload)
      if (esNuevo) {
        navigate(`/admin/${seccion}/${guardado.id}`)
      } else {
        setRegistro(guardado)
        setFormula(aFormulario(schema, guardado))
        setEditando(false)
        setGuardando(false)
      }
    } catch (e) {
      setError(String(e?.message ?? e))
      setGuardando(false)
    }
  }

  async function borrar() {
    const titulo = registro && schema.titulo ? schema.titulo(registro) : 'este registro'
    if (!window.confirm(`¿Eliminar ${schema.singular.toLowerCase()} «${titulo}»?`)) return
    setError(null)
    try {
      await schema.svc.borrar(Number(id))
      navigate('/admin')
    } catch (e) {
      setError(String(e?.message ?? e))
    }
  }

  if (!schema || (esRevisor && SIN_ACCESO_REVISOR.has(seccion))) {
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
                No tienes permisos para gestionar esta sección.
              </p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const titulo = esNuevo
    ? `Nuevo ${schema.singular.toLowerCase()}`
    : `${schema.label} · ${registro && schema.titulo ? schema.titulo(registro) : `#${id}`}`

  const sub = esNuevo
    ? `Crear un ${schema.singular.toLowerCase()} nuevo`
    : `Detalle ${schema.singular.toLowerCase()} #${id}`

  return (
    <div className="admin-standalone">
      <AdminHead user={user} />

      <div className="admin-body">
        <main className="admin-content">
          <div className="admin-panel">
            <header className="admin-panel-head">
              <div>
                <h2 className="admin-panel-title">{titulo}</h2>
                <span className="admin-panel-sub">{sub}</span>
              </div>
              <div className="admin-head-actions">
                <Link className="admin-btn btn-sm" to="/admin">
                  <span className="material-symbols-outlined">arrow_back</span>
                  Volver
                </Link>
                {!esNuevo && registro && !editando && (
                  <>
                    <button
                      type="button"
                      className="admin-btn btn-sm"
                      onClick={() => setEditando(true)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger btn-sm"
                      onClick={borrar}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </header>

            {error && <p className="admin-empty">{error}</p>}
            {cargando && <p className="admin-empty">Cargando…</p>}
            {!cargando && !esNuevo && !registro && (
              <p className="admin-empty">No se encontró el registro solicitado.</p>
            )}

            {!cargando && registro && !editando && (
              <dl className="adm-detail">
                {schema.campos.map((campo) => {
                  const valorUrl = campo.tipo === 'url' ? registro[campo.guard] : null
                  return (
                    <div className="adm-detail-row" key={campo.guard}>
                      <dt className="adm-detail-label">{campo.etiqueta}</dt>
                      <dd className="adm-detail-value">
                        {valorUrl ? (
                          <a
                            className="adm-link"
                            href={valorUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {valorUrl}
                          </a>
                        ) : (
                          valorTexto(schema, campo, registro, extras)
                        )}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            )}

            {!cargando && formula && editando && (
              <>
                <div className="adm-form-grid">
                  {schema.campos.map((campo) => {
                    const esCheck = campo.tipo === 'checkbox'
                    const alBlur =
                      campo.guard === schema.cruce?.clave
                        ? comprobarCruce
                        : undefined
                    return (
                      <div
                        className={`adm-field${esCheck ? ' adm-field-check' : ''}`}
                        key={campo.guard}
                      >
                        {!esCheck && (
                          <span className="adm-field-label">{campo.etiqueta}</span>
                        )}
                        <CampoForm
                          campo={campo}
                          formula={formula}
                          extras={extras}
                          onChange={actualizarCampo}
                          onBlur={alBlur}
                        />
                      </div>
                    )
                  })}
                </div>
                <div className="adm-form-actions">
                  <button
                    type="button"
                    className="admin-btn btn-sm"
                    onClick={() => (esNuevo ? navigate('/admin') : setEditando(false))}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn-primary btn-sm"
                    onClick={guardar}
                    disabled={guardando}
                  >
                    {guardando ? 'Guardando…' : esNuevo ? 'Crear' : 'Guardar cambios'}
                  </button>
                </div>
              </>
            )}

            {cruce && schema.cruce && (
              <div
                className="adm-modal-overlay"
                role="dialog"
                aria-modal="true"
                onClick={() => setCruce(null)}
              >
                <div className="adm-modal" onClick={(ev) => ev.stopPropagation()}>
                  <h3 className="adm-modal-title">He encontrado estos datos</h3>
                  <p className="adm-modal-text">
                    Ya existe un {schema.cruce.etiqueta} con el mismo nombre en la
                    otra tabla. ¿Quieres enlazarlo y traer sus datos?
                  </p>
                  <dl className="adm-detail adm-modal-detail">
                    {Object.entries(schema.cruce.mapa).map(([destino, origen]) =>
                      cruce[origen] ? (
                        <div className="adm-detail-row" key={destino}>
                          <dt className="adm-detail-label">
                            {schema.campos.find((c) => c.guard === destino)
                              ?.etiqueta ?? destino}
                          </dt>
                          <dd className="adm-detail-value">
                            {String(cruce[origen])}
                          </dd>
                        </div>
                      ) : null,
                    )}
                  </dl>
                  <div className="adm-modal-actions">
                    <button
                      type="button"
                      className="admin-btn"
                      onClick={() => setCruce(null)}
                    >
                      Ahora no
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-primary"
                      onClick={traerDatos}
                    >
                      Traer datos
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export function AdminMasivo() {
  const { seccion } = useParams()
  const { user } = useAuth()
  const esRevisor = user?.role === 'revisor'
  const schema = SCHEMAS[seccion]

  const [texto, setTexto] = useState('')
  const [error, setError] = useState(null)
  const [creando, setCreando] = useState(false)
  const [creados, setCreados] = useState(0)

  const bloqueado = !schema || (esRevisor && SIN_ACCESO_REVISOR.has(seccion))

  const campos = schema?.campos ?? []
  const orden = campos.map((c) => c.etiqueta).join(' | ')

  async function crearTodo() {
    setError(null)
    setCreados(0)
    const lineas = texto
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
    if (!lineas.length) {
      setError('Pega al menos una fila.')
      return
    }
    setCreando(true)
    let n = 0
    try {
      for (const linea of lineas) {
        const valores = linea.split('|')
        const payload = {}
        campos.forEach((campo, i) => {
          const bruto = (valores[i] ?? '').trim()
          const valor =
            campo.tipo === 'lista'
              ? bruto.replace(/\s*;\s*/g, '\n')
              : bruto
          payload[campo.guard] = deFormulario(campo, valor)
        })
        await schema.svc.crear(payload)
        n += 1
        setCreados(n)
      }
      setTexto('')
    } catch (e) {
      setError(
        `Se crearon ${n} de ${lineas.length} registros. ${String(e?.message ?? e)}`,
      )
    } finally {
      setCreando(false)
    }
  }

  if (bloqueado) {
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
                No tienes permisos para gestionar esta sección.
              </p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-standalone">
      <AdminHead user={user} />
      <div className="admin-body">
        <main className="admin-content">
          <div className="admin-panel">
            <header className="admin-panel-head">
              <div>
                <h2 className="admin-panel-title">
                  Alta masiva · {schema.label}
                </h2>
                <span className="admin-panel-sub">
                  Una fila por registro · {creados} creados en esta tanda
                </span>
              </div>
              <div className="admin-head-actions">
                <Link className="admin-btn btn-sm" to="/admin">
                  <span className="material-symbols-outlined">arrow_back</span>
                  Volver
                </Link>
              </div>
            </header>

            <p className="adm-field-label">
              Orden de los campos, separados por «|»: {orden}
            </p>
            <textarea
              className="admin-textarea adm-masivo-textarea"
              rows={12}
              value={texto}
              onChange={(ev) => setTexto(ev.target.value)}
              placeholder={`Ejemplo:\n${campos
                .map((c) => EJEMPLOS_CAMPO[c.guard] ?? `valor ${c.etiqueta}`)
                .join(' | ')}`}
            />

            {error && <p className="admin-empty">{error}</p>}
            {creados > 0 && !error && (
              <p className="site-ok">{creados} registros creados.</p>
            )}

            <div className="adm-form-actions">
              <Link className="admin-btn btn-sm" to="/admin">
                Cancelar
              </Link>
              <button
                type="button"
                className="admin-btn admin-btn-primary btn-sm"
                onClick={crearTodo}
                disabled={creando}
              >
                {creando ? 'Creando…' : 'Crear registros'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}