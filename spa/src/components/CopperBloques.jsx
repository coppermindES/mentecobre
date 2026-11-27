import { Link } from 'react-router-dom'

function BloquesArticle({ block }) {
  return (
    <div className="cn-article">
      {block.titulo && <h3 className="cn-article-title">{block.titulo}</h3>}
      {block.lede && <p className="cn-lede cn-paragraph">{block.lede}</p>}
      {block.p && <p className="cn-paragraph">{block.p}</p>}
      {block.p2 && <p className="cn-paragraph">{block.p2}</p>}
      {block.p3 && <p className="cn-paragraph">{block.p3}</p>}
      {block.p4 && <p className="cn-paragraph">{block.p4}</p>}
      {block.p5 && <p className="cn-paragraph">{block.p5}</p>}
    </div>
  )
}

function BloquesBox({ block }) {
  return (
    <div className="cn-box">
      {block.titulo && <h3 className="cn-box-title">{block.titulo}</h3>}
      {(block.contenido || []).map((linea, i) => (
        <p key={i} className="cn-paragraph">
          {linea}
        </p>
      ))}
      {block.firma && (
        <p className="cn-firma">
          <em>{block.firma}</em>
        </p>
      )}
    </div>
  )
}

function BloquesReceta({ block }) {
  return (
    <div className="cn-recipe">
      <h3 className="cn-recipe-nombre">{block.titulo}</h3>
      <h4>Ingredientes</h4>
      <ul>
        {(block.ingredientes || []).map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <h4>Instrucciones</h4>
      <ol>
        {(block.instrucciones || []).map((inst, i) => (
          <li key={i}>{inst}</li>
        ))}
      </ol>
      {block.nota && <p className="cn-nota">{block.nota}</p>}
    </div>
  )
}

function BloquesHoroscopo({ block }) {
  return (
    <div className="cn-horoscopo">
      {block.items.map(([signo, fechas, texto], i) => (
        <div className="cn-signo" key={i}>
          <p className="cn-signo-nombre">
            {signo} <span className="cn-signo-fechas">{fechas}</span>
          </p>
          <p className="cn-signo-texto">{texto}</p>
        </div>
      ))}
    </div>
  )
}

function BloquesModal({ block }) {
  return (
    <div className="cn-modal">
      <p className="cn-paragraph">{block.titulo}</p>
      {block.lineas.map(([quien, texto], i) => (
        <p key={i} className="cn-linea">
          <span className="cn-quien">{quien}.</span> {texto}
        </p>
      ))}
    </div>
  )
}

function BloquesSuceso({ block }) {
  return (
    <div className="cn-suceso">
      <h4 className="cn-suceso-titulo">{block.titulo}</h4>
      <p className="cn-paragraph">{block.p}</p>
    </div>
  )
}

function BloquesAnuncio({ block }) {
  return (
    <div className="cn-anuncio">
      <h3 className="cn-anuncio-h">{block.h}</h3>
      <p className="cn-anuncio-t">{block.t1}</p>
      <p className="cn-anuncio-f">{block.f}</p>
    </div>
  )
}

function RenderCol({ col }) {
  switch (col.t) {
    case 'box':
      return <BloquesBox block={col} />
    case 'anuncio':
      return <BloquesAnuncio block={col} />
    case 'imagen_texto':
      return (
        <div className="cn-box">
          {col.titulo && <h3 className="cn-box-title">{col.titulo}</h3>}
          <p className="cn-paragraph">{col.texto}</p>
        </div>
      )
    default:
      return <div className="cn-box">{JSON.stringify(col)}</div>
  }
}

export default function CopperBloques({ bloques }) {
  return (
    <div className="cn-content">
      {bloques.map((b, i) => {
        switch (b.t) {
          case 'kicker':
            return (
              <p key={i} className="cn-kicker">
                {b.v}
              </p>
            )
          case 'h1':
            return (
              <h2 key={i} className={b.rojo ? 'cn-h1 cn-h1-rojo' : 'cn-h1'}>
                {b.v}
              </h2>
            )
          case 'p':
            return (
              <p key={i} className={b.lede ? 'cn-lede cn-paragraph' : 'cn-paragraph'}>
                {b.v}
              </p>
            )
          case 'img':
            return (
              <figure className="cn-img" key={i}>
                <img src={b.src} alt={b.alt || ''} loading="lazy" />
                {b.caption && <figcaption className="cn-img-caption">{b.caption}</figcaption>}
              </figure>
            )
          case 'dateline':
            return (
              <p key={i} className="cn-dateline">
                {b.v} · {b.s}
              </p>
            )
          case 'articulo':
            return <BloquesArticle key={i} block={b} />
          case 'box':
            return <BloquesBox key={i} block={b} />
          case 'receta':
            return <BloquesReceta key={i} block={b} />
          case 'horoscopo':
            return <BloquesHoroscopo key={i} block={b} />
          case 'modal':
            return <BloquesModal key={i} block={b} />
          case 'suceso':
            return <BloquesSuceso key={i} block={b} />
          case 'section':
            return (
              <div key={i}>
                <h3 className="cn-section-title">{b.titulo}</h3>
                {b.sub && <p className="cn-kicker">{b.sub}</p>}
              </div>
            )
          case 'cols':
            return (
              <div className="cn-cols" key={i}>
                {b.cols.map((col, j) => (
                  <RenderCol key={j} col={col} />
                ))}
              </div>
            )
          case 'btnrow':
            return (
              <div className="cn-btn-row" key={i}>
                <Link className="cn-btn" to={b.to}>
                  {b.texto}
                </Link>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}