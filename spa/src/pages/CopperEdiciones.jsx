import { Link } from 'react-router-dom'
import CopperNewsShell from '../components/CopperNewsShell'
import CopperBloques from '../components/CopperBloques'
import { CN_EDICIONES_INTRO, CN_EDICIONES_META } from '../data/coppernews'
import './CopperNews.css'

export default function CopperEdiciones() {
  return (
    <CopperNewsShell>
      <header className="coppernews-masthead">
        <h1>Ediciones</h1>
        <h2>✧ La verdad es un viaje, no un destino ✧</h2>
      </header>
      <CopperBloques bloques={CN_EDICIONES_INTRO} />

      <p className="cn-lede cn-paragraph">
        <strong>Nuestros números</strong>
      </p>

      <div className="cn-ediciones-grid">
        {CN_EDICIONES_META.map((e) => (
          <div className="cn-edicion-card" key={e.slug}>
            <span className="cn-edicion-nombre">{e.numero}</span>
            <span className="cn-edicion-accion">
              <Link className="cn-btn" to={`/ocio/coppernews/ediciones/${e.slug}`}>
                Acceder
              </Link>
            </span>
          </div>
        ))}
      </div>
    </CopperNewsShell>
  )
}