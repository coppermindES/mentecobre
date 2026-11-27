import CotorraViajesShell from '../components/CotorraViajesShell'
import { CV_DESCARGAS } from '../data/cotorraviajes'
import './CotorraViajes.css'

export default function CotorraViajesCatalogo() {
  return (
    <CotorraViajesShell>
      <main className="cv-inner">
        <section className="cv-seccion cv-seccion-descargas">
          <h2 className="cv-titulo">{CV_DESCARGAS.titulo}</h2>
          <p className="cv-descargas-texto">{CV_DESCARGAS.texto}</p>
          <div className="cv-pdf-wrap">
            <iframe
              className="cv-pdf"
              src={CV_DESCARGAS.pdf.preview}
              title="Catálogo de Cotorra Viajes"
              allow="autoplay"
              loading="lazy"
            />
            <a
              className="cv-pdf-enlace"
              href={CV_DESCARGAS.pdf.enlace}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir el catálogo en una nueva pestaña
            </a>
          </div>
        </section>
      </main>
    </CotorraViajesShell>
  )
}