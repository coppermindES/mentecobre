import MonakusShell from '../components/MonakusShell'
import { MONAKUS } from '../data/monakus'
import './Monakus.css'

export default function MonakusPresentacion() {
  const { presentacion } = MONAKUS

  return (
    <MonakusShell>
      <main className="mn-inner">
        <section className="mn-seccion">
          <h1 className="mn-titulo">{presentacion.titulo}</h1>

          <div className="mn-himno">
            <h2 className="mn-subtitulo">{presentacion.himno.titulo}</h2>
            <pre>{presentacion.himno.versos.join('\n')}</pre>
          </div>

          {presentacion.parrafos.map((p, i) => (
            <p key={i} className="mn-parrafo">
              {p}
            </p>
          ))}

          <h2 className="mn-subtitulo">{presentacion.tríptico.titulo}</h2>
          <div className="mn-triptico">
            <img
              src={presentacion.tríptico.imagenes[0]}
              alt="Tríptico de la Escuela Monakus"
              loading="lazy"
            />
            <img
              src={presentacion.tríptico.imagenes[1]}
              alt="Tríptico de la Escuela Monakus"
              loading="lazy"
            />
            <img
              src={presentacion.tríptico.imagenes[2]}
              alt="Tríptico de la Escuela Monakus"
              loading="lazy"
            />
            </div>
            <div className="mn-triptico">
            <img
              src={presentacion.tríptico.imagenes[3]}
              alt="Tríptico de la Escuela Monakus"
              loading="lazy"
            />
            <img
              src={presentacion.tríptico.imagenes[4]}
              alt="Tríptico de la Escuela Monakus"
              loading="lazy"
            />
            <img
              src={presentacion.tríptico.imagenes[5]}
              alt="Tríptico de la Escuela Monakus"
              loading="lazy"
            />
          </div>
        </section>
      </main>
    </MonakusShell>
  )
}