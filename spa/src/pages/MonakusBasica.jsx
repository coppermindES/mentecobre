import MonakusShell from '../components/MonakusShell'
import { MONAKUS } from '../data/monakus'
import './Monakus.css'

export default function MonakusBasica() {
  const { basica } = MONAKUS

  return (
    <MonakusShell>
      <main className="mn-inner">
        <section className="mn-seccion">
          <h1 className="mn-titulo">{basica.titulo}</h1>

          {basica.parrafos.map((p, i) => (
            <p key={i} className="mn-parrafo">
              {p}
            </p>
          ))}

          <h2 className="mn-subtitulo">{basica.asignaturas.titulo}</h2>
          <div className="mn-grid-cards">
            {basica.asignaturas.items.map((a, i) => (
              <div key={i} className="mn-card">
                <h3>{a.nombre}</h3>
                <p>{a.texto}</p>
                {a.sublistas && (
                  <ul className="mn-lista">
                    {a.sublistas.map((s, j) => (
                      <li key={j}>{s}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <h2 className="mn-subtitulo">{basica.horario.titulo}</h2>
          <img
            className="mn-horario-img"
            src={basica.horario.imagen}
            alt="Horario de la Escuela Monakus"
            loading="lazy"
          />

          <h2 className="mn-subtitulo">{basica.recursos.titulo}</h2>
          <ul className="mn-libros">
            {basica.recursos.libros.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </section>
      </main>
    </MonakusShell>
  )
}