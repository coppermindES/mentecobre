import { useState } from 'react'
import MonakusShell from '../components/MonakusShell'
import { MONAKUS } from '../data/monakus'
import './Monakus.css'

export default function MonakusInstalaciones() {
  const { instalaciones } = MONAKUS
  const total = instalaciones.bloques.length
  const [indice, setIndice] = useState(0)

  const anterior = () => setIndice((i) => (i - 1 + total) % total)
  const siguiente = () => setIndice((i) => (i + 1) % total)
  const ir = (i) => setIndice(i)

  return (
    <MonakusShell>
      <main className="mn-inner">
        <section className="mn-seccion">
          <h1 className="mn-titulo">{instalaciones.titulo}</h1>

          <div
            className="mn-carrusel"
            tabIndex={0}
            aria-roledescription="carrusel"
            aria-label="Instalaciones"
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') anterior()
              if (e.key === 'ArrowRight') siguiente()
            }}
          >
            <div className="mn-carrusel-vista">
              <div
                className="mn-carrusel-pista"
                style={{ transform: `translateX(-${indice * 100}%)` }}
              >
                {instalaciones.bloques.map((b, i) => (
                  <article
                    key={i}
                    className="mn-tarjeta"
                    aria-hidden={i !== indice}
                  >
                    <img
                      className="mn-tarjeta-img"
                      src={b.imagen}
                      alt={b.titulo}
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="mn-tarjeta-cuerpo">
                      <h2>{b.titulo}</h2>
                      {b.parrafos.map((p, j) => (
                        <p key={j} className="mn-parrafo">
                          {p}
                        </p>
                      ))}
                      {b.lista && (
                        <ul className="mn-lista">
                          {b.lista.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      )}
                      {b.parrafosDespues &&
                        b.parrafosDespues.map((p, j) => (
                          <p key={`pd-${j}`} className="mn-parrafo">
                            {p}
                          </p>
                        ))}
                      {b.pasos && (
                        <ol className="mn-lista">
                          {b.pasos.map((p, j) => (
                            <li key={j}>{p}</li>
                          ))}
                        </ol>
                      )}
                      {b.notaFinal && <p className="mn-nota">{b.notaFinal}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="mn-carrusel-flecha mn-carrusel-anterior"
              onClick={anterior}
              aria-label="Instalación anterior"
            >
              ‹
            </button>
            <button
              type="button"
              className="mn-carrusel-flecha mn-carrusel-siguiente"
              onClick={siguiente}
              aria-label="Siguiente instalación"
            >
              ›
            </button>

            <div className="mn-carrusel-pie">
              <span className="mn-carrusel-contador">
                {indice + 1} / {total}
              </span>
              <div className="mn-carrusel-puntos">
                {instalaciones.bloques.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`mn-punto${i === indice ? ' mn-punto-activo' : ''}`}
                    onClick={() => ir(i)}
                    aria-label={`Instalación ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </MonakusShell>
  )
}