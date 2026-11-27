import { useState } from 'react'
import { Link } from 'react-router-dom'
import { recruitmentSv } from '../api'

const fechaHoy = () => new Date().toISOString().slice(0, 10)

const LIBROS_COSMERE = [
  'Elantris',
  'La esperanza de Elantris',
  'El alma del emperador',
  'El aliento de los dioses',
  'Sombras por Silencio',
  'Islas de la Ascuaoscura',
  'El Imperio Final',
  'El Pozo de la Ascensión',
  'El Héroe de las Eras',
  'El undécimo metal',
  'Aleación de ley',
  'Sombras de identidad',
  'Brazales de Duelo',
  'Historia secreta',
  'Alomante Jak',
  'El camino de los reyes',
  'Palabras radiantes',
  'Danzante del Filo',
  'Juramentada',
  'Esquirla del Amanecer',
  'El ritmo de la guerra',
  'El metal perdido',
  'Arena Blanca',
  'Trenza del mar Esmeralda',
  'Yumi y el pintor de pesadillas',
  'El hombre Iluminado',
  'Viento y verdad',
]

const LIBROS_FUERA = [
  'Saga Alcatraz (completa)',
  'Saga Reckoners (completa)',
  'Saga Legión (completa)',
  'Saga Citoverso (completa)',
  'La espada infinita',
  'La guía del mago frugal para sobrevivir en la Inglaterra del medievo',
  'El rithmatista',
  'Ninguna',
]

const TEXTO_PRUEBA = [
  'The Rithmatist takes place on an alternate Earth in which North America is composed entirely of islands. The islands were empty of human life when Europeans arrived, but they encountered dangerous "wild chalklings," two-dimensional creatures made of chalk. King Gregory III discovered the magic of Rithmatics, performed by drawing specific shapes with chalk, and with this magic the colonists learned to defend themselves. Several hundred years later, the continued prosperity of the United Isles of America is bought with the efforts of Rithmatists who fight an ongoing battle to contain the chalklings (and other, more mysterious creatures) on the island of Nebrask.',
  'Joel Saxon is a student at the prestigious Armedius Academy in Jamestown, New Britannia. Though not a Rithmatist himself, he is obsessed with Rithmatics and studies the magic as much as he can. The poor son of the campus cleaning lady, Joel doesn’t fit in with the other students who are all either Rithmatists or children of privilege. Joel’s father Trent was the chalk maker for the academy, and shared Joel’s obsession with Rithmatics. Joel believes his father died in a rail accident, but it is implied that there is more to the story than he has been told.',
  'Joel obtains permission to tutor under Professor Fitch during the summer holidays. Professor Fitch is also tutoring Melody Muns, a Rithmatic student struggling in her magical studies. When one of the school’s Rithmatics students disappears and evidence points to foul play by a Rithmatist, Fitch is assigned to help with the investigation. As more students disappear, first Joel then Melody are admitted into Fitch’s confidence to help track down the suspected kidnapper.',
  'Leading the investigation is Inspector Harding, a non-Rithmatist formerly of the military police in Nebrask. He pushes for all Rithmatic students to be kept on campus for protection, and eventually all of the parents agree. Several odd symbols are found drawn in chalk at the crime scenes. Over the course of the investigation, Joel is able to confirm that these symbols are in fact new Rithmatic lines. Previously, only four types of lines were known in the magic of Rithmatics (See article on Rithmatics).',
  'Joel’s own suspicions center on Professor Nalizar, a self-important and condescending man recently arrived from Nebrask. Joel has a particular dislike of the professor, and discovers that he is researching new Rithmatic lines. When Joel shares his suspicions, however, the others each argue against him. They say that while Nalizar is not a likable person, he is an acclaimed war hero from Nebrask who has saved many lives.',
]

function ListaLibros({ titulo, libros, seleccion, onToggle }) {
  return (
    <div className="book-group">
      <h4 className="book-group-title">{titulo}</h4>
      <div className="book-list">
        {libros.map((libro) => (
          <label key={libro} className="book-item">
            <input
              type="checkbox"
              checked={seleccion.has(libro)}
              onChange={() => onToggle(libro)}
            />
            <span>{libro}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default function FormularioUnion() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [motivacion, setMotivacion] = useState('')
  const [cosmere, setCosmere] = useState(new Set())
  const [fuera, setFuera] = useState(new Set())
  const [prueba, setPrueba] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  function alternarObraCosmere(cosmere, setCosmere, libro) {
    const nuevo = new Set(cosmere)
    if (nuevo.has(libro)) nuevo.delete(libro)
    else nuevo.add(libro)
    setCosmere(nuevo)
  }

  function toggleFuera(libro) {
    if (libro === 'Ninguna') {
      setFuera(new Set(fuera.has(libro) ? [] : ['Ninguna']))
      return
    }
    const nuevo = new Set(fuera)
    nuevo.delete('Ninguna')
    if (nuevo.has(libro)) nuevo.delete(libro)
    else nuevo.add(libro)
    setFuera(nuevo)
  }

  async function enviar(e) {
    e.preventDefault()
    setError('')
    const libros = [...cosmere, ...fuera]
    if (libros.length === 0) {
      setError('Marca al menos una obra que hayas leído.')
      return
    }
    if (!prueba.trim()) {
      setError('La prueba de traducción es obligatoria.')
      return
    }
    try {
      await recruitmentSv.crear({
        nombre: nombre.trim(),
        email: email.trim(),
        motivacion: motivacion.trim(),
        libros,
        prueba: prueba.trim(),
        estado: 'nuevo',
        creado_en: fechaHoy(),
      })
      setEnviado(true)
    } catch {
      setError('No se pudo enviar la solicitud. Inténtalo de nuevo.')
    }
  }

  if (enviado) {
    return (
      <div className="site-panel site-panel-ok">
        <span className="material-symbols-outlined site-panel-ok-icon">task_alt</span>
        <div>
          <h3 className="site-panel-title">Solicitud enviada</h3>
          <p className="site-panel-text">
            ¡Gracias por querer unirte a la mentecobre! El equipo revisará tu prueba de
            traducción y te contactará en breve.
          </p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setNombre('')
              setEmail('')
              setMotivacion('')
              setCosmere(new Set())
              setFuera(new Set())
              setPrueba('')
              setEnviado(false)
            }}
          >
            Volver al formulario
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="site-form site-form-wide" onSubmit={enviar}>
      <header className="site-form-head">
        <h3 className="site-form-title">Únete al equipo de traducción</h3>
        <p className="site-form-desc">
          Cuéntanos quién eres, las obras que has leído y prueba tu traducción.
        </p>
      </header>

      <label className="site-field">
        <span className="site-label">Nombre</span>
        <input
          className="site-input"
          type="text"
          placeholder="Tu nombre en la Copper"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </label>

      <label className="site-field">
        <span className="site-label">Email</span>
        <input
          className="site-input"
          type="email"
          placeholder="kokerlii@mentecobre.dev"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="site-field">
        <span className="site-label">Motivación</span>
        <textarea
          className="site-textarea"
          rows={3}
          placeholder="¿Por qué quieres unirte al equipo?"
          value={motivacion}
          onChange={(e) => setMotivacion(e.target.value)}
          required
        />
      </label>

      <h4 className="site-section-title">Lecturas</h4>
      <p className="site-section-text">
        En esta sección, queremos conocer más sobre tu familiaridad con la obra de
        Brandon Sanderson. Indícanos cuáles son los libros que has leído. Es importante
        que hayas leído todas las obras del Cosmere para poder unirte al equipo de
        traducción, ya que una comprensión profunda del material es esencial para
        garantizar la calidad de nuestras traducciones.
      </p>
      <p className="site-section-text">
        Por favor, marca todas las obras de Brandon Sanderson que has leído en la lista
        a continuación.
      </p>

      <ListaLibros
        titulo="Dentro del Cosmere"
        libros={LIBROS_COSMERE}
        seleccion={cosmere}
        onToggle={(l) => alternarObraCosmere(cosmere, setCosmere, l)}
      />
      <ListaLibros
        titulo="Fuera del Cosmere"
        libros={LIBROS_FUERA}
        seleccion={fuera}
        onToggle={toggleFuera}
      />

      <h4 className="site-section-title">Prueba de traducción</h4>
      <p className="site-section-text">
        En esta sección, te pedimos que realices una prueba de traducción para evaluar
        tus habilidades. La calidad de nuestras traducciones es fundamental para ofrecer
        una experiencia fiel y enriquecedora a los fans de Brandon Sanderson.
      </p>
      <p className="site-section-text">
        Recuerda que puedes utilizar{' '}
        <Link className="site-inline-link" to="/glosario">
          el glosario disponible en nuestra app web
        </Link>{' '}
        para ayudarte con los términos específicos del universo de Sanderson. Este
        recurso te será muy útil para mantener la consistencia y precisión en tu
        traducción.
      </p>
      <p className="site-section-text">
        A continuación, encontrarás el texto que debes traducir. Por favor, tómate el
        tiempo necesario para realizar una traducción precisa pero lo más fluida
        posible.
      </p>

      <div className="prueba-passage">
        {TEXTO_PRUEBA.map((parrafo) => (
          <p key={parrafo.slice(0, 24)}>{parrafo}</p>
        ))}
      </div>

      <label className="site-field">
        <span className="site-label">Tu traducción</span>
        <textarea
          className="site-textarea primera"
          rows={12}
          placeholder="Escribe aquí tu traducción del texto anterior…"
          value={prueba}
          onChange={(e) => setPrueba(e.target.value)}
          required
        />
      </label>

      {error && <p className="site-error">{error}</p>}

      <div className="site-actions">
        <button type="submit" className="btn btn-primary">
          Enviar solicitud
        </button>
      </div>
    </form>
  )
}