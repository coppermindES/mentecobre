import MonakusShell from '../components/MonakusShell'
import { MONAKUS } from '../data/monakus'
import './Monakus.css'

export default function MonakusMaterial() {
  const { material } = MONAKUS

  return (
    <MonakusShell>
      <main className="mn-inner">
        <section className="mn-seccion">
          <h1 className="mn-titulo">{material.titulo}</h1>

          {material.parrafos.map((p, i) => (
            <p key={i} className="mn-parrafo">
              {p}
            </p>
          ))}

          <div className="mn-articulos">
            {material.articulos.map((a, i) => (
              <figure key={i} className="mn-articulo">
                <img src={a.imagen} alt={a.nombre} loading="lazy" />
                <p>{a.nombre}</p>
              </figure>
            ))}
          </div>
        </section>
      </main>
    </MonakusShell>
  )
}