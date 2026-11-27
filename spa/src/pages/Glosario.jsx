import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { glossarySv, categoriesSv, imagesWithTextSv, notificationsSv } from '../api'
import { useAuth } from '../auth/useAuth'

const IMG_NO_ENC = 'https://media.tenor.com/a-niVX8qPEkAAAAj/rei-john-travolta.gif'

const SECCION_ADMIN = {
  articulos: 'glosario',
  categorias: 'categorias',
  imagenes: 'imagenes',
}

export default function Glosario() {
  const { user } = useAuth()
  const puedeGestionar = user?.role === 'revisor' || user?.role === 'admin'
  const [tab, setTab] = useState('articulos')
  const [query, setQuery] = useState('')
  const [preview, setPreview] = useState(null)
  const [previewPos, setPreviewPos] = useState({ top: 0 })
  const [imgState, setImgState] = useState({})
  const [terminos, setTerminos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [imagenes, setImagenes] = useState([])
  const [cargado, setCargado] = useState(false)
  const [notifyAbierto, setNotifyAbierto] = useState(false)
  const [notifyUrl, setNotifyUrl] = useState('')
  const [notifyContexto, setNotifyContexto] = useState('')
  const [notifyOk, setNotifyOk] = useState(false)
  const [notifyError, setNotifyError] = useState('')

  useEffect(() => {
    let vivo = true
    Promise.all([
      glossarySv.listar(),
      categoriesSv.listar(),
      imagesWithTextSv.listar(),
    ]).then(([g, c, i]) => {
      if (vivo) {
        setTerminos(g)
        setCategorias(c)
        setImagenes(i)
        setCargado(true)
      }
    })
    return () => {
      vivo = false
    }
  }, [])

  const setImgStateFor = (url, status) =>
    setImgState((prev) => ({ ...prev, [url]: status }))

  async function notificarImagen(e) {
    e.preventDefault()
    setNotifyError('')
    const url = notifyUrl.trim()
    if (!url) return
    try {
      let en = 'Imagen con texto'
      try {
        en = decodeURIComponent(url.split('/').pop() || 'Imagen con texto')
      } catch {
        en = 'Imagen con texto'
      }
      const img = await imagesWithTextSv.crear({
        nombre: notifyContexto.trim() || en,
        en,
        es: '',
        urlEn: url,
        urlEs: '',
        pendienteEs: true,
      })
      await notificationsSv.crear({
        tipo: 'imagen_con_texto',
        enUrl: url,
        contexto: notifyContexto.trim() || '',
        estado: 'pendiente',
        creado_en: new Date().toISOString().slice(0, 10),
        imageId: img.id,
      })
      setImagenes(await imagesWithTextSv.listar())
      setNotifyUrl('')
      setNotifyContexto('')
      setNotifyAbierto(false)
      setNotifyOk(true)
    } catch {
      setNotifyError('No se pudo notificar la imagen. Inténtalo de nuevo.')
    }
  }

  const q = query.trim().toLowerCase()

  const TABS = [
    { id: 'articulos', label: 'Artículos' },
    ...(user ? [{ id: 'categorias', label: 'Categorías' }] : []),
    ...(user ? [{ id: 'imagenes', label: 'Imágenes con texto' }] : []),
  ]

  const articulosFiltrados = terminos.filter((entry) => {
    if (!q) return true
    return (
      entry.term.toLowerCase().includes(q) ||
      entry.es.toLowerCase().includes(q)
    )
  })

  const categoriasFiltradas = categorias.filter((c) => {
    if (!q) return true
    return (
      c.es.toLowerCase().includes(q) ||
      c.en.toLowerCase().includes(q)
    )
  })

  const imagenesFiltradas = imagenes.filter((i) => {
    if (!q) return true
    return (
      i.nombre.toLowerCase().includes(q) ||
      i.en.toLowerCase().includes(q) ||
      i.es.toLowerCase().includes(q)
    )
  })

  const placeholder =
    tab === 'articulos'
      ? 'Buscar término...'
      : tab === 'categorias'
        ? 'Buscar categoría...'
        : 'Buscar imagen...'

  return (
    <div>
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">Glosario</h1>
          <p className="page-sub">
            Términos, traducciones y recursos consensuados por el equipo.
          </p>
        </div>
        {puedeGestionar && (
          <Link
            to={`/admin/${SECCION_ADMIN[tab]}/nuevo`}
            className="btn btn-primary glosario-add-btn"
          >
            <span className="material-symbols-outlined">add</span>
            Añadir nuevo
          </Link>
        )}
      </header>

      <div className="glosario-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`glosario-tab${tab === t.id ? ' active' : ''}`}
            onClick={() => { setTab(t.id); setPreview(null) }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <input
        className="search-input"
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {!cargado && (
        <p className="traduccion-empty">Cargando glosario…</p>
      )}

      {cargado && tab === 'articulos' && (
        <div className="glossary-grid">
          {articulosFiltrados.map((entry) => (
            <article key={entry.term} className="glossary-card">
              <div className="glossary-pair">
                <a
                  className="glossary-term"
                  href={entry.urlEn}
                  target="_blank"
                  rel="noreferrer"
                >
                  {entry.term}
                </a>
                <span className="glossary-divider"></span>
                <a
                  className="glossary-es"
                  href={entry.urlEs}
                  target="_blank"
                  rel="noreferrer"
                >
                  {entry.es}
                </a>
              </div>
              <div className="glossary-footer">
                <span className="glossary-universe">{entry.universo}</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {cargado && tab === 'categorias' && (
        <div className="glossary-grid">
          {categoriasFiltradas.map((c) => (
            <article key={c.id} className="glossary-card">
              <div className="glossary-pair">
                <span className="glossary-term">{c.en}</span>
                <span className="glossary-divider"></span>
                <span className="glossary-es">{c.es}</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {cargado && tab === 'imagenes' && (
        <div className="imgtexto">
          <div className="imgtexto-head">
            <p className="imgtexto-desc">
              Las imágenes que llevan texto en inglés tienen una versión en español
              subida a la Coppermind. Pasa el ratón sobre una fila para ver la
              miniatura de ambas versiones.
            </p>
            <button
              type="button"
              className="btn btn-ghost imgtexto-notify-btn"
              onClick={() => setNotifyAbierto((v) => !v)}
            >
              <span className="material-symbols-outlined">campaign</span>
              Notificar imagen con texto
            </button>
          </div>

          {notifyAbierto && (
            <form className="site-form" onSubmit={notificarImagen}>
              <header className="site-form-head">
                <h3 className="site-form-title">Notificar imagen con texto</h3>
                <p className="site-form-desc">
                  Si una imagen con texto en inglés aún no tiene versión en español,
                  avísanos para añadirla.
                </p>
              </header>
              <label className="site-field">
                <span className="site-label">URL de la imagen en inglés (Coppermind)</span>
                <input
                  className="site-input"
                  type="url"
                  placeholder="https://coppermind.net/wiki/Special:FilePath/Imagen.jpg"
                  value={notifyUrl}
                  onChange={(e) => setNotifyUrl(e.target.value)}
                  required
                />
              </label>
              <label className="site-field">
                <span className="site-label">¿En qué artículo aparece?</span>
                <input
                  className="site-input"
                  type="text"
                  placeholder="Nombre del artículo (opcional)"
                  value={notifyContexto}
                  onChange={(e) => setNotifyContexto(e.target.value)}
                />
              </label>
              {notifyError && <p className="site-error">{notifyError}</p>}
              <div className="site-actions">
                <button type="submit" className="btn btn-primary">
                  Notificar
                </button>
              </div>
            </form>
          )}

          {notifyOk && (
            <p className="site-ok">
              Imagen notificada. El equipo la revisará y subirá su versión en español.
            </p>
          )}
          <div className="table-scroll imgtexto-table-scroll">
            <table className="imgtexto-table">
              <thead>
                <tr>
                  <th>Si pone…</th>
                  <th>…sustituir por</th>
                </tr>
              </thead>
              <tbody>
                {imagenesFiltradas.map((img) => (
                  <tr
                    key={img.nombre}
                    className="imgtexto-row"
                    onPointerEnter={(e) => {
                      setPreview(img)
                      setPreviewPos({ top: e.currentTarget.offsetTop })
                      setImgState({})
                    }}
                    onPointerLeave={() => setPreview(null)}
                    onFocus={(e) => {
                      setPreview(img)
                      setPreviewPos({ top: e.currentTarget.offsetTop })
                      setImgState({})
                    }}
                    onBlur={() => setPreview(null)}
                  >
                    <td>
                      <a
                        className="imgtexto-link imgtexto-link-en"
                        href={img.urlEn}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {img.en}
                      </a>
                    </td>
                    <td>
                      <a
                        className="imgtexto-link imgtexto-link-es"
                        href={img.urlEs}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {img.es}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {preview && (
            <div
              className="imgtexto-preview"
              style={{ top: previewPos.top + 4 }}
              aria-hidden="true"
            >
              <figure>
                <div className="imgtexto-figure">
                  <img
                    key={preview.urlEn}
                    src={preview.urlEn}
                    alt=""
                    loading="lazy"
                    onLoad={() => setImgStateFor(preview.urlEn, 'ready')}
                    onError={() => setImgStateFor(preview.urlEn, 'error')}
                  />
                  {imgState[preview.urlEn] !== 'ready' && (
                    <div className="imgtexto-overlay">
                      {imgState[preview.urlEn] === 'error'
                        ? <img className="imgtexto-noenc" src={IMG_NO_ENC} alt="Imagen no encontrada" />
                        : <span className="imgtexto-spinner" aria-hidden="true" />}
                    </div>
                  )}
                </div>
                <figcaption>Original</figcaption>
              </figure>
              <figure>
                <div className="imgtexto-figure">
                  <img
                    key={preview.urlEs}
                    src={preview.urlEs}
                    alt=""
                    loading="lazy"
                    onLoad={() => setImgStateFor(preview.urlEs, 'ready')}
                    onError={() => setImgStateFor(preview.urlEs, 'error')}
                  />
                  {imgState[preview.urlEs] !== 'ready' && (
                    <div className="imgtexto-overlay">
                      {imgState[preview.urlEs] === 'error'
                        ? <img className="imgtexto-noenc" src={IMG_NO_ENC} alt="Imagen no encontrada" />
                        : <span className="imgtexto-spinner" aria-hidden="true" />}
                    </div>
                  )}
                </div>
                <figcaption>En español</figcaption>
              </figure>
            </div>
          )}
        </div>
      )}
    </div>
  )
}