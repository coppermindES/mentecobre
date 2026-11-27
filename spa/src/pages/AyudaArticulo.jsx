import { Link, useParams } from 'react-router-dom'
import { ARTICULOS } from '../data/ayuda'

function renderBloque(bloque, i) {
  switch (bloque.tipo) {
    case 'p':
      return <p key={i} className="ayuda-articulo-p">{bloque.texto}</p>
    case 'h3':
      return <h3 key={i} className="ayuda-articulo-h3">{bloque.texto}</h3>
    case 'nota':
      return (
        <div key={i} className="ayuda-articulo-nota">
          <span className="material-symbols-outlined">lightbulb</span>
          <p>{bloque.texto}</p>
        </div>
      )
    case 'code':
      return <pre key={i} className="ayuda-articulo-code">{bloque.texto}</pre>
    case 'imagen':
      return (
        <figure key={i} className="ayuda-articulo-imagen">
          <img src={bloque.src} alt={bloque.pie || ''} loading="lazy" />
          {bloque.pie && <figcaption>{bloque.pie}</figcaption>}
        </figure>
      )
    case 'imagenes':
      return (
        <div key={i} className="ayuda-articulo-imagenes">
          {bloque.items.map(([src, pie], j) => (
            <figure key={j} className="ayuda-articulo-imagen">
              <img src={src} alt={pie || ''} loading="lazy" />
              {pie && <figcaption>{pie}</figcaption>}
            </figure>
          ))}
        </div>
      )
    case 'tabla':
      return (
        <div key={i} className="table-scroll">
          <table className="ayuda-articulo-tabla">
            <thead>
              <tr>
                {bloque.columnas.map((c, j) => {
                  if (c && typeof c === 'object') {
                    return (
                      <th key={j} colSpan={c.colSpan} rowSpan={c.rowSpan}>{c.t}</th>
                    )
                  }
                  return <th key={j} rowSpan={bloque.subColumnas ? 2 : undefined}>{c}</th>
                })}
              </tr>
              {bloque.subColumnas && (
                <tr>
                  {bloque.subColumnas.map((c, j) => {
                    if (c && typeof c === 'object') {
                      return <th key={j} colSpan={c.colSpan}>{c.t}</th>
                    }
                    return <th key={j}>{c}</th>
                  })}
                </tr>
              )}
            </thead>
            <tbody>
              {bloque.filas.map((fila, j) => (
                <tr key={j}>
                  {fila.filter((c) => c !== null).map((celda, k) => {
                    if (celda && typeof celda === 'object') {
                      return (
                        <td
                          key={k}
                          rowSpan={celda.rowSpan}
                          colSpan={celda.colSpan}
                          className={
                            celda.cat ? 'ayuda-tabla-cat' :
                            celda.negrita ? 'ayuda-tabla-negrita' : undefined
                          }
                        >
                          {renderCeldaTexto(celda)}
                        </td>
                      )
                    }
                    return <td key={k}>{celda}</td>
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'ul':
    case 'ol':
      return bloque.ol ? (
        <ol key={i} className="ayuda-articulo-lista">
          {bloque.items.map((item, j) => renderItem(item, j))}
        </ol>
      ) : (
        <ul key={i} className="ayuda-articulo-lista">
          {bloque.items.map((item, j) => renderItem(item, j))}
        </ul>
      )
    default:
      return null
  }
}

function renderCeldaTexto(celda) {
  if (celda.t && Array.isArray(celda.t)) {
    return celda.t.map((run, k) =>
      run.negrita ? (
        <strong key={k}>{run.t}</strong>
      ) : (
        <span key={k}>{run.t}</span>
      )
    )
  }
  const contenido = celda.t ?? celda
  return celda.negrita ? <strong>{contenido}</strong> : contenido
}

function renderItem(item, j) {
  if (Array.isArray(item)) {
    return (
      <li key={j}>
        <strong>{item[0]}: </strong>
        {item[1]}
      </li>
    )
  }
  return <li key={j}>{item}</li>
}

export default function AyudaArticulo() {
  const { slug } = useParams()
  const articulo = ARTICULOS[slug]

  if (!articulo) {
    return (
      <div>
        <header className="page-header">
          <span className="accent-bar"></span>
          <div>
            <h1 className="page-title">No encontrado</h1>
          </div>
        </header>
        <div className="glass-panel login-card">
          <span className="material-symbols-outlined login-icon">
            search_off
          </span>
          <h2 className="login-title">Este apartado no existe</h2>
          <p className="login-text">Vuelve a la sección de Ayuda.</p>
          <Link className="btn btn-primary" to="/ayuda">
            <span className="material-symbols-outlined">arrow_back</span>
            Volver a Ayuda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">{articulo.titulo}</h1>
          <p className="page-sub">{articulo.sub}</p>
        </div>
      </header>

      <div className="ayuda-articulo">
        {articulo.secciones.map((seccion, i) => (
          <section key={i} className="ayuda-articulo-seccion glass-panel">
            {seccion.h && <h2 className="ayuda-articulo-h2">{seccion.h}</h2>}
            {seccion.cuerpo.map(renderBloque)}
          </section>
        ))}
      </div>

      <div className="ayuda-back">
        <Link className="btn btn-primary" to="/ayuda">
          <span className="material-symbols-outlined">arrow_back</span>
          Volver a Ayuda
        </Link>
      </div>
    </div>
  )
}