import { useState } from 'react'
import CopperNewsShell from '../components/CopperNewsShell'
import CopperBloques from '../components/CopperBloques'
import { CN_REDACCION, CN_ORGANIGRAMA } from '../data/coppernews'
import './CopperNews.css'

function Item({ item, activo, onToggle }) {
  return (
    <div className="cn-org-nivel">
      <button
        type="button"
        className={`cn-org-item${activo ? ' selected' : ''}`}
        data-nivel={item.nivel}
        onClick={onToggle}
      >
        <span className="cn-org-etiqueta">
          {item.cargo} - {item.nombre}
        </span>
        {activo && (
          <span className="cn-org-text">
            <p>{item.descripcion}</p>
          </span>
        )}
      </button>
      {activo &&
        item.subordinados &&
        item.subordinados.map((sub) => (
          <Item
            key={sub.id}
            item={sub}
            activo={activo === sub.id}
            onToggle={() => onToggle('sub', sub.id)}
          />
        ))}
    </div>
  )
}

export default function CopperRedaccion() {
  const [seleccionado, setSeleccionado] = useState(null)
  return (
    <CopperNewsShell>
      <header className="coppernews-masthead">
        <h1>La Redacción</h1>
        <h2>✧ El Equipo Detrás de la Verdad ✧</h2>
      </header>
      <CopperBloques bloques={CN_REDACCION} />
      <div className="cn-organigrama">
        {CN_ORGANIGRAMA.map((item) => (
          <Item
            key={item.id}
            item={item}
            activo={seleccionado === item.id}
            onToggle={(tipo, id) => {
              const target = tipo === 'sub' ? id : item.id
              setSeleccionado(seleccionado === target ? null : target)
            }}
          />
        ))}
      </div>
    </CopperNewsShell>
  )
}