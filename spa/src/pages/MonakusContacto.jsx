import MonakusShell from '../components/MonakusShell'
import { MONAKUS } from '../data/monakus'
import './Monakus.css'

export default function MonakusContacto() {
  const { contacto } = MONAKUS

  return (
    <MonakusShell>
      <main className="mn-inner">
        <section className="mn-seccion">
          <h1 className="mn-titulo">{contacto.titulo}</h1>

          <ul className="mn-lista">
            {contacto.vias.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>

          {contacto.parrafos.map((p, i) => (
            <p key={i} className="mn-parrafo">
              {p}
            </p>
          ))}

          <p className="mn-gracias">{contacto.gracias}</p>

          <p className="mn-secreto">{contacto.secreto}</p>
        </section>
      </main>
    </MonakusShell>
  )
}