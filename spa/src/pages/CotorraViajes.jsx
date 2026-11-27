import { Link } from 'react-router-dom'
import CotorraViajesShell from '../components/CotorraViajesShell'
import { CV_INICIO } from '../data/cotorraviajes'
import logo from '../assets/images/cotorraviajes/logo.png'
import hero from '../assets/images/cotorraviajes/hero.png'
import regalos from '../assets/images/cotorraviajes/regalos.png'
import './CotorraViajes.css'

export default function CotorraViajes() {
  return (
    <CotorraViajesShell>
      <main className="cv-inner">
        <section className="cv-seccion cv-seccion-inicio">
          <img className="cv-inicio-logo" src={logo} alt="Cotorra Viajes" />
          <h1 className="cv-titulo cv-hero-titulo">{CV_INICIO.hero.titulo}</h1>
          {CV_INICIO.hero.parrafos.map((p, i) => (
            <p key={i} className="cv-parrafo">
              {p}
            </p>
          ))}
          <div className="cv-puntos">
            {CV_INICIO.hero.puntos.map((p, i) => (
              <div key={i} className="cv-punto-card">
                <span className="cv-punto-icono material-symbols-outlined" aria-hidden="true">
                  {p.icono}
                </span>
                <h3 className="cv-punto-titulo">{p.titulo}</h3>
                <p className="cv-punto-texto">{p.texto}</p>
              </div>
            ))}
          </div>
          <p className="cv-parrafo cv-cierre">{CV_INICIO.hero.cierre}</p>

          <div className="cv-btn-row">
            <Link className="cv-btn" to="/ocio/cotorraviajes/destinos">
              Explora nuestros destinos
            </Link>
          </div>

          <div className="cv-rega-group">
            <h2 className="cv-rega-titulo">{CV_INICIO.regalos.titulo}</h2>
            <p className="cv-rega-texto">{CV_INICIO.regalos.texto}</p>
            <div className="cv-rega-fila">
              <img className="cv-rega-img" src={regalos} alt="Bolsas y botellas oficiales de Cotorra Viajes" />
              <img className="cv-rega-img" src={hero} alt="Aventura en el Cosmere" />
            </div>
            <p className="cv-rega-aviso">
              <img className="cv-rega-aviso-logo" src={logo} alt="" />
              {CV_INICIO.regalos.aviso}
            </p>
          </div>
        </section>
      </main>
    </CotorraViajesShell>
  )
}