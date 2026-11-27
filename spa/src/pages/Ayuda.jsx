import { Link } from 'react-router-dom'

export default function Ayuda() {
  return (
    <div>
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">Ayuda</h1>
          <p className="page-sub">Guía de traducción de la Coppermind al español.</p>
        </div>
      </header>

      <div className="advance-note">
        <span className="material-symbols-outlined">translate</span>
        <p>
          Te damos la bienvenida a la guía de traducción de la Coppermind al
          español. Llevamos ya más de cuatro años traduciendo y trabajando
          (tanto en artículos como en la web) y, a medida que avanzamos, surgen
          nuevas necesidades, por lo que nuestros métodos de trabajo también
          variarán y evolucionarán. Esperamos que esta página sirva como apoyo
          y herramienta de trabajo y para resolver las dudas más frecuentes que
          suelen surgir a la hora de llevar a cabo la traducción.
        </p>
      </div>

      <section className="ayuda-apartados">
        <h2 className="ayuda-apartados-titulo">Guía del traductor</h2>
        <p className="ayuda-apartados-sub">
          Los apartados que te ayudarán a traducir y trabajar en la Coppermind
          en español.
        </p>

        <div className="ayuda-grid">
          <Link to="/ayuda/introduccion" className="ayuda-card glass-panel">
            <span className="material-symbols-outlined ayuda-card-icon">
              menu_book
            </span>
            <h3 className="ayuda-card-titulo">Introducción</h3>
            <p className="ayuda-card-texto">
              Cómo funciona el proyecto, quién lo organiza y cuál es el flujo
              de trabajo de la traducción.
            </p>
          </Link>

          <Link to="/ayuda/como-traducir" className="ayuda-card glass-panel">
            <span className="material-symbols-outlined ayuda-card-icon">
              translate
            </span>
            <h3 className="ayuda-card-titulo">Cómo traducir</h3>
            <p className="ayuda-card-texto">
              Pasos y buenas prácticas para traducir un artículo al castellano.
            </p>
          </Link>

          <Link to="/ayuda/como-actualizar" className="ayuda-card glass-panel">
            <span className="material-symbols-outlined ayuda-card-icon">
              update
            </span>
            <h3 className="ayuda-card-titulo">Cómo actualizar</h3>
            <p className="ayuda-card-texto">
              Cómo mantener al día las ediciones y novedades de la Coppermind.
            </p>
          </Link>

          <Link to="/ayuda/como-revisar" className="ayuda-card glass-panel">
            <span className="material-symbols-outlined ayuda-card-icon">
              fact_check
            </span>
            <h3 className="ayuda-card-titulo">Cómo revisar</h3>
            <p className="ayuda-card-texto">
              El proceso de revisión para garantizar la coherencia y calidad.
            </p>
          </Link>

          <Link to="/ayuda/dudas" className="ayuda-card glass-panel">
            <span className="material-symbols-outlined ayuda-card-icon">
              quiz
            </span>
            <h3 className="ayuda-card-titulo">Dudas</h3>
            <p className="ayuda-card-texto">
              Check de traducción, mayúsculas y minúsculas, formatos de la wiki
              e imágenes con texto.
            </p>
          </Link>

          <Link to="/ayuda/recursos" className="ayuda-card glass-panel">
            <span className="material-symbols-outlined ayuda-card-icon">
              star
            </span>
            <h3 className="ayuda-card-titulo">Recursos interesantes</h3>
            <p className="ayuda-card-texto">
              Periódicos Era 2, Nacidos del metal y Caballeros Radiantes.
            </p>
          </Link>
        </div>
      </section>
    </div>
  )
}