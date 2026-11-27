import MonakusShell from '../components/MonakusShell'
import { MONAKUS } from '../data/monakus'
import './Monakus.css'

export default function MonakusAvanzada() {
  const { avanzada } = MONAKUS

  return (
    <MonakusShell>
      <main className="mn-inner">
        <section className="mn-seccion">
          <h1 className="mn-titulo">{avanzada.titulo}</h1>

          {avanzada.parrafos.map((p, i) => (
            <p key={i} className="mn-parrafo">
              {p}
            </p>
          ))}

          {avanzada.ramas.map((r, i) => (
            <article key={i} className="mn-rama">
              <h2 className="mn-rama-titulo">{r.nombre}</h2>
              <div>
                <img
                  src={r.imagen}
                  alt={r.nombre}
                  loading="lazy"
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="mn-rama-fila">
                <div className="mn-rama-col">
                  <h4>Troncales</h4>
                  <ul className="mn-lista">
                    {r.troncales.map((t, j) => (
                      <li key={j}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="mn-rama-col">
                  <h4>Optativas</h4>
                  <ul className="mn-lista">
                    {r.optativas.map((t, j) => (
                      <li key={j}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}

          <h2 className="mn-subtitulo">{avanzada.lecturas.titulo}</h2>
          <ul className="mn-libros">
            {avanzada.lecturas.libros.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </section>
      </main>
    </MonakusShell>
  )
}