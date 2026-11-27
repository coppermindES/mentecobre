import { useParams } from 'react-router-dom'
import CopperNewsShell from '../components/CopperNewsShell'
import CopperEdicion1HTML from '../pages/CopperEdicion1HTML'
import CopperEdicion2HTML from '../pages/CopperEdicion2HTML'
import CopperEdicion3HTML from '../pages/CopperEdicion3HTML'
import './CopperNews.css'

export default function CopperEdicion() {
  const { edicion } = useParams()

  let contenido
  if (edicion === 'n1-noviembre-2022') {
    contenido = <CopperEdicion1HTML />
  } else if (edicion === 'n2-diciembre-2022') {
    contenido = <CopperEdicion2HTML />
  } else if (edicion === 'n3-abril-2023') {
    contenido = <CopperEdicion3HTML />
  } else {
    contenido = (
      <div className="cn-content">
        <h3 className="cn-h1">Edición no encontrada</h3>
        <p className="cn-paragraph">No hemos encontrado la edición solicitada.</p>
      </div>
    )
  }

  return <CopperNewsShell>{contenido}</CopperNewsShell>
}