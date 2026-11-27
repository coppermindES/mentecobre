import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  PREGUNTAS,
  QUIZ_ORIGINAL,
  calcularOrdenes,
} from '../data/quizRadiante'
import './QuizRadiante.css'

const VALOR_INICIAL = 50

function valoresIniciales() {
  return PREGUNTAS.map(() => VALOR_INICIAL)
}

function estiloPolo(intensidad) {
  const pct = Math.round(intensidad * 100)
  return {
    color: `color-mix(in srgb, var(--primary-container) ${pct}%, var(--on-surface-variant))`,
    fontWeight: 400 + Math.round(intensidad * 400),
  }
}

export default function QuizRadiante() {
  const [valores, setValores] = useState(valoresIniciales)
  const [resultado, setResultado] = useState(null)
  const [avisoRepetir, setAvisoRepetir] = useState(false)

  const ganadora = resultado?.[0] ?? null

  const contestadas = useMemo(
    () => valores.filter((v) => v !== VALOR_INICIAL).length,
    [valores],
  )

  function cambiar(indice, valor) {
    setValores((previos) => {
      const copia = [...previos]
      copia[indice] = Number(valor)
      return copia
    })
    setResultado(null)
  }

  function calcular() {
    setResultado(calcularOrdenes(valores))
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function reiniciar() {
    setValores(valoresIniciales())
    setResultado(null)
    setAvisoRepetir(false)
  }

  function editarRespuestas() {
    setResultado(null)
    setAvisoRepetir(false)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="quizrad">
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">Quiz radiante</h1>
          <p className="page-sub">
            Esta es una <strong>adaptación libre y traducción propia</strong> del{' '}
            <a href={QUIZ_ORIGINAL} target="_blank" rel="noreferrer">
              Official Knights Radiant Order Quiz
            </a>{' '}
            de Brandon Sanderson. Las preguntas y descripciones están redactadas
            por el equipo de la Coppermind en español y se reutiliza la lógica de
            puntuación del original.
          </p>
        </div>
      </header>

      {ganadora && (
        <div
          className="quizrad-ganadora glass-panel"
          style={{
            background: ganadora.orden.color,
            color: ganadora.orden.colorTexto,
          }}
        >
          <span className="quizrad-ganadora-eyebrow">Tu Orden más probable</span>
          <h2 className="quizrad-ganadora-title">{ganadora.orden.nombre}</h2>
          <p className="quizrad-ganadora-lema">«{ganadora.orden.lema}»</p>
          <p className="quizrad-ganadora-desc">{ganadora.orden.descripcion}</p>
          <ul className="quizrad-ganadora-datos">
            <li>
              <strong>Heraldo:</strong> {ganadora.orden.heraldo}
            </li>
            <li>
              <strong>Potencias:</strong> {ganadora.orden.potencias.join(' y ')}
            </li>
          </ul>
        </div>
      )}

      {resultado && (
        <div className="glass-panel quizrad-ranking">
          <h3 className="quizrad-ranking-title">
            Así de cerca estás de cada Orden
          </h3>
          {resultado.map(({ orden, indice, porcentaje }) => (
            <div
              key={orden.nombre}
              className={`quizrad-rank-row${
                indice === ganadora?.indice ? ' quizrad-rank-row-top' : ''
              }`}
            >
              <span className="quizrad-rank-name">{orden.nombre}</span>
              <div className="quizrad-rank-track">
                <div
                  className="quizrad-rank-fill"
                  style={{ width: `${porcentaje}%`, background: orden.color }}
                />
              </div>
              <span className="quizrad-rank-pct">{porcentaje}%</span>
            </div>
          ))}
        </div>
      )}

      {resultado && (
        <div className="quizrad-acciones">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setAvisoRepetir(true)}
          >
            Editar respuestas
          </button>
        </div>
      )}

      {avisoRepetir && (
        <div
          className="quizrad-modal-overlay"
          role="presentation"
          onClick={() => setAvisoRepetir(false)}
        >
          <div
            className="glass-panel quizrad-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="quizrad-repetir-title"
            onClick={(ev) => ev.stopPropagation()}
          >
            <h3 id="quizrad-repetir-title">Repetir el quiz</h3>
            <p>
              No recomendamos repetir el quiz radiante hasta pasada una
              temporada, ya que los propios resultados que has visto pueden
              condicionar ahora tus respuestas.
            </p>
            <div className="quizrad-acciones">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setAvisoRepetir(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={editarRespuestas}
              >
                Repetir
              </button>
            </div>
          </div>
        </div>
      )}

      {!resultado && (
        <>
          <div className="quizrad-sliders">
            {PREGUNTAS.map((pregunta, i) => {
              const valor = valores[i]
              const intensidadIzq = Math.max(0, (50 - valor) / 50)
              const intensidadDer = Math.max(0, (valor - 50) / 50)
              return (
                <div className="glass-panel quizrad-item" key={pregunta.trait}>
                  <div className="quizrad-item-head">
                    <span className="quizrad-polo" style={estiloPolo(intensidadIzq)}>
                      {pregunta.izquierda} · {100 - valor}%
                    </span>
                    <button
                      type="button"
                      className="quizrad-mini-help quizrad-pregunta-help"
                      data-tip={pregunta.detalle}
                      aria-label={`Qué significa ${pregunta.izquierda} frente a ${pregunta.derecha}: ${pregunta.detalle}`}
                    >
                      ?
                    </button>
                    <span
                      className="quizrad-polo quizrad-polo-der"
                      style={estiloPolo(intensidadDer)}
                    >
                      {valor}% · {pregunta.derecha}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={valor}
                    onChange={(ev) => cambiar(i, ev.target.value)}
                    className="quizrad-range"
                    aria-label={`${pregunta.izquierda} frente a ${pregunta.derecha}`}
                  />
                </div>
              )
            })}
          </div>

          <div className="quizrad-acciones">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={reiniciar}
              disabled={contestadas === 0}
            >
              Reiniciar
            </button>
            <button type="button" className="btn btn-primary" onClick={calcular}>
              Ver mi Orden
            </button>
          </div>
        </>
      )}

      <div className="quizrad-volver">
        <Link className="btn btn-ghost" to="/ocio/pasatiempos">
          Volver a Pasatiempos
        </Link>
      </div>
    </div>
  )
}
