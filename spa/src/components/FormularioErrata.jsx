import { useState } from 'react'
import { erratasSv } from '../api'

const fechaHoy = () => new Date().toISOString().slice(0, 10)

const CHECK_TRADUCIDO =
  'Confirmo que el artículo en el que he encontrado el fallo está traducido al español.'
const CHECK_REVISADO =
  'Confirmo que el artículo está revisado (no aparece el aviso «Este artículo está en proceso de traducción. Por favor, sigan circulando.»).'

export default function FormularioErrata() {
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [articulo, setArticulo] = useState('')
  const [texto, setTexto] = useState('')
  const [checkTraducido, setCheckTraducido] = useState(false)
  const [checkRevisado, setCheckRevisado] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  async function enviar(e) {
    e.preventDefault()
    setError('')
    if (!checkTraducido || !checkRevisado) {
      setError('Debes confirmar las dos condiciones antes de enviar la errata.')
      return
    }
    try {
      await erratasSv.crear({
        articulo: articulo.trim(),
        texto: texto.trim(),
        email: email.trim(),
        usuario: nombre.trim(),
        checks: [CHECK_TRADUCIDO, CHECK_REVISADO],
        estado: 'nuevo',
        creado_en: fechaHoy(),
      })
      setEnviado(true)
    } catch {
      setError('No se pudo enviar la errata. Inténtalo de nuevo.')
    }
  }

  if (enviado) {
    return (
      <div className="site-panel site-panel-ok">
        <span className="material-symbols-outlined site-panel-ok-icon">task_alt</span>
        <div>
          <h3 className="site-panel-title">Errata enviada</h3>
          <p className="site-panel-text">
            Gracias por ayudarnos a mejorar la Coppermind en español. El equipo revisará
            tu aviso.
          </p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setEmail('')
              setNombre('')
              setArticulo('')
              setTexto('')
              setCheckTraducido(false)
              setCheckRevisado(false)
              setEnviado(false)
            }}
          >
            Notificar otra errata
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="site-form" onSubmit={enviar}>
      <header className="site-form-head">
        <h3 className="site-form-title">Notificar una errata</h3>
        <p className="site-form-desc">
          Cuéntanos el fallo que has encontrado para que el equipo pueda subsanarlo.
          Solo aceptamos avisos sobre artículos traducidos y revisados.
        </p>
      </header>

      <label className="site-field">
        <span className="site-label">Correo electrónico</span>
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
        <span className="site-label">Nombre o apodo</span>
        <input
          className="site-input"
          type="text"
          placeholder="Cómo queremos referirnos a ti"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </label>

      <label className="site-field">
        <span className="site-label">¿En qué artículo has encontrado el error?</span>
        <input
          className="site-input"
          type="text"
          placeholder="Artículo en el que aparece el fallo"
          value={articulo}
          onChange={(e) => setArticulo(e.target.value)}
          required
        />
      </label>

      <label className="site-field">
        <span className="site-label">Describe el fallo</span>
        <textarea
          className="site-textarea"
          rows={4}
          placeholder="Explícanos con tus propias palabras y, si es posible, el extracto del texto que deberíamos subsanar."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          required
        />
      </label>

      <div className="site-checks">
        <label className="site-check">
          <input
            type="checkbox"
            checked={checkTraducido}
            onChange={(e) => setCheckTraducido(e.target.checked)}
          />
          <span>{CHECK_TRADUCIDO}</span>
        </label>
        <label className="site-check">
          <input
            type="checkbox"
            checked={checkRevisado}
            onChange={(e) => setCheckRevisado(e.target.checked)}
          />
          <span>{CHECK_REVISADO}</span>
        </label>
      </div>

      {error && <p className="site-error">{error}</p>}

      <div className="site-actions">
        <button type="submit" className="btn btn-primary">
          Enviar errata
        </button>
      </div>
    </form>
  )
}