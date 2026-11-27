import { useState } from 'react'
import CotorraViajesShell from '../components/CotorraViajesShell'
import { CV_DESTINOS_INTRO, CV_DESTINOS } from '../data/cotorraviajes'
import roshar from '../assets/images/cotorraviajes/Roshar.jpg'
import islasReshi from '../assets/images/cotorraviajes/IslasReshi.jpg'
import scadrial from '../assets/images/cotorraviajes/Scadrial.png'
import imperioRosa from '../assets/images/cotorraviajes/ImperioRosa.jpg'
import treno from '../assets/images/cotorraviajes/Treno.jpg'
import primeroDelSol from '../assets/images/cotorraviajes/PrimeroDelSol.webp'
import lumar from '../assets/images/cotorraviajes/Lumar.png'
import './CotorraViajes.css'

const IMAGENES = {
  roshar,
  'islas-reshi': islasReshi,
  scadrial,
  'imperio-rosa': imperioRosa,
  treno,
  'primero-del-sol': primeroDelSol,
  lumar,
}

export default function CotorraViajesDestinos() {
  const [activo, setActivo] = useState('roshar')
  const destino = CV_DESTINOS.find((d) => d.slug === activo)

  return (
    <CotorraViajesShell fondo={IMAGENES[activo]}>
      <main className="cv-inner">
        <section className="cv-seccion">
          <h1 className="cv-titulo">{CV_DESTINOS_INTRO.titulo}</h1>
          <p className="cv-parrafo">{CV_DESTINOS_INTRO.nota}</p>

          <div className="cv-tabs" role="tablist" aria-label="Destinos">
            {CV_DESTINOS.map((d) => (
              <button
                key={d.slug}
                type="button"
                role="tab"
                aria-selected={d.slug === activo}
                className={`cv-tab${d.slug === activo ? ' active' : ''}`}
                onClick={() => setActivo(d.slug)}
              >
                {d.nombre}
              </button>
            ))}
          </div>

          {destino && (
            <article className="cv-destino" role="tabpanel">
              <h2 className="cv-destino-nombre">{destino.nombre}</h2>
              {destino.intro.map((p, i) => (
                <p key={i} className="cv-parrafo">
                  {p}
                </p>
              ))}
              {destino.listas.map((l, i) => (
                <div key={i} className="cv-destino-grupo">
                  <h3>{l.titulo}</h3>
                  <ul>
                    {l.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="cv-destino-promo">
                <div className="cv-destino-promo-texto-wrap">
                  <p className="cv-destino-promo-texto">{destino.promo.texto}</p>
                  {destino.promo.notaPromo && (
                    <p className="cv-destino-promo-nota">{destino.promo.notaPromo}</p>
                  )}
                </div>
              </div>
              <p className="cv-destino-disclaimer">{destino.promo.disclaimer}</p>
            </article>
          )}
        </section>
      </main>
    </CotorraViajesShell>
  )
}