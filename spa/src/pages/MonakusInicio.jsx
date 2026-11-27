import { Link } from 'react-router-dom'
import MonakusShell from '../components/MonakusShell'
import { MONAKUS } from '../data/monakus'
import './Monakus.css'

export default function MonakusInicio() {
  const { inicio } = MONAKUS

  return (
    <MonakusShell>
      <main className="mn-inner">
        <section className="mn-seccion mn-seccion-inicio">
          <div className="mn-inicio-cuadro">
            <img
              className="mn-emblem-img"
              src={inicio.emblem}
              alt="Emblema de la Escuela Monakus"
              loading="eager"
            />
            <h1 className="mn-titulo mn-hero-titulo">{inicio.titulo}</h1>

            <div className="mn-inicio-fila">
              <img
                className="mn-hero-img"
                style={{ alignSelf: 'center' }}
                src={inicio.hero}
                alt="Profesor Monakus"
                loading="eager"
              />
              <div className="mn-inicio-texto">
                {inicio.parrafos.map((p, i) => (
                  <p key={i} className="mn-parrafo">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="mn-btn-row">
              <Link className="mn-btn" to="/ocio/escuela-monakus/presentacion">
                Conoce la escuela
              </Link>
              <Link className="mn-btn" to="/ocio/escuela-monakus/oferta/basica">
                Oferta académica
              </Link>
              <Link className="mn-btn" to="/ocio/escuela-monakus/matriculacion">
                Matriculación
              </Link>
            </div>

            <div className="mn-video-group">
              <h2 className="mn-video-titulo">{inicio.video.titulo}</h2>
              <div className="mn-video-wrap">
                <iframe
                  src={inicio.video.preview}
                  title={inicio.video.titulo}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
              <a
                className="mn-video-enlace"
                href="https://drive.google.com/file/d/1r38JA9cr8mSYLOm4eSsx_hOPfG7m0ZJb/view"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  open_in_new
                </span>
                Abrir el vídeo en pestaña nueva
              </a>
            </div>
          </div>
        </section>
      </main>
    </MonakusShell>
  )
}
