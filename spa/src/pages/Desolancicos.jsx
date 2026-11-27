import { useState } from 'react'
import { anuncio, canciones } from '../data/canciones'

export default function Desolancicos() {
  const [activa, setActiva] = useState({
    tipo: 'cancion',
    numero: canciones[0].numero,
  })
  const [letraAbierta, setLetraAbierta] = useState(false)

  const seleccionada =
    activa.tipo === 'anuncio'
      ? { numero: 0, titulo: anuncio.titulo, video: anuncio.video, letra: null }
      : canciones.find((c) => c.numero === activa.numero)

  const esAnuncio = activa.tipo === 'anuncio'
  const claseNumero =
    'deso-card-num' + (esAnuncio ? ' deso-card-num-anuncio' : '')

  return (
    <div>
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">Desolancicos</h1>
          <p className="page-sub">
            Los mejores villancicos ambientados en el Cosmere.
          </p>
        </div>
      </header>

      <div className="advance-note">
        <span className="material-symbols-outlined">music_note</span>
        <p>
          Los Desolancicos son la colección de villancicos ambientados en el
          Cosmere que no te puedes perder. Surgidos durante la Navidad del 2023,
          cada canción captura la esencia del universo de Brandon Sanderson con
          un toque festivo y humorístico.
        </p>
      </div>

      <div className="deso-layout">
        <aside className="deso-side">
          <button
            className={`deso-side-item glass-panel${esAnuncio ? ' activa' : ''}`}
            onClick={() => setActiva({ tipo: 'anuncio' })}
          >
            <span className={`deso-card-num deso-card-num-anuncio`}>
              <span className="material-symbols-outlined">campaign</span>
            </span>
            <span className="deso-card-titulo">Anuncio 2023</span>
          </button>

          {canciones.map((c) => (
            <button
              key={c.numero}
              className={`deso-side-item glass-panel${
                !esAnuncio && activa.numero === c.numero ? ' activa' : ''
              }`}
              onClick={() => setActiva({ tipo: 'cancion', numero: c.numero })}
            >
              <span className="deso-card-num">{c.numero}</span>
              <span className="deso-card-titulo">{c.titulo}</span>
            </button>
          ))}
        </aside>

        <div className="deso-panel glass-panel">
          <div className="deso-detalle-cabecera">
            <span className={`${claseNumero} deso-card-num-grande`}>
              {esAnuncio ? (
                <span className="material-symbols-outlined">campaign</span>
              ) : (
                seleccionada.numero
              )}
            </span>
            <h2 className="deso-titulo">{seleccionada.titulo}</h2>
            {seleccionada.letra && (
              <button
                className="btn btn-primary"
                onClick={() => setLetraAbierta(true)}
              >
                <span className="material-symbols-outlined">menu_book</span>
                Ver letra
              </button>
            )}
          </div>

          <div className="deso-video-wrapper">
            <iframe
              className="deso-video"
              src={`https://www.youtube-nocookie.com/embed/${seleccionada.video}`}
              title={seleccionada.titulo}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {letraAbierta && seleccionada.letra && (
        <div className="modal-backdrop" onClick={() => setLetraAbierta(false)}>
          <div
            className="modal-card deso-letra-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="deso-detalle-cabecera">
              <span className={`${claseNumero} deso-card-num-grande`}>
                {esAnuncio ? (
                  <span className="material-symbols-outlined">campaign</span>
                ) : (
                  seleccionada.numero
                )}
              </span>
              <h3 className="modal-title">{seleccionada.titulo}</h3>
            </div>
            <pre className="deso-letra">{seleccionada.letra}</pre>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setLetraAbierta(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
