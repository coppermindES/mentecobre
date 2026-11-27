import MonakusShell from '../components/MonakusShell'
import { MONAKUS } from '../data/monakus'
import './Monakus.css'

export default function MonakusMatriculacion() {
  const { matriculacion } = MONAKUS

  return (
    <MonakusShell>
      <main className="mn-inner">
        <section className="mn-seccion">
          <h1 className="mn-titulo">{matriculacion.titulo}</h1>

          <div className="mn-aviso">
            <p className="mn-aviso-texto">{MONAKUS.aviso}</p>
            <p className="mn-aviso-fecha">{matriculacion.aviso}</p>
          </div>

          <img
            className="mn-matricula-img"
            src={matriculacion.imagen}
            alt="Plazos de matriculación en la Escuela Monakus"
            loading="lazy"
          />
        </section>
      </main>
    </MonakusShell>
  )
}