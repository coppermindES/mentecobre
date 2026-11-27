import MonakusShell from '../components/MonakusShell'
import { MONAKUS } from '../data/monakus'
import './Monakus.css'

export default function MonakusMastrell() {
  const { mastrell } = MONAKUS

  return (
    <MonakusShell>
      <main className="mn-inner">
        <section className="mn-seccion">
          <h1 className="mn-titulo">{mastrell.titulo}</h1>

          {mastrell.parrafos.map((p, i) => (
            <p key={i} className="mn-parrafo">
              {p}
            </p>
          ))}
        </section>
      </main>
    </MonakusShell>
  )
}