import CopperNewsShell from '../components/CopperNewsShell'
import CopperBloques from '../components/CopperBloques'
import { CN_INICIO } from '../data/coppernews'
import { Link } from 'react-router-dom'
import './CopperNews.css'

export default function CopperNews() {
  return (
    <CopperNewsShell>
      <header className="coppernews-masthead">
        <h1>CopperNews</h1>
        <h2>✧ Mantente alerta · Mantente informado · Mantente Investido ✧</h2>
      </header>

      <CopperBloques bloques={CN_INICIO} />

      <div className="cn-btn-row">
        <Link className="cn-btn" to="/ocio/coppernews/ediciones">
          Accede a las ediciones
        </Link>
      </div>
    </CopperNewsShell>
  )
}