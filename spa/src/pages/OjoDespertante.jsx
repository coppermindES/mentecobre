import { useState } from 'react'
import { Link } from 'react-router-dom'
import './OjoDespertante.css'

function getRandomHexColor() {
  const rand = () => Math.floor(30 + Math.random() * 196)
  const r = rand()
  const g = rand()
  const b = rand()
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

const STAGE_NAMES = [
  'Apagado',
  'Primera Elevación',
  'Segunda Elevación',
  'Tercera Elevación',
  'Cuarta Elevación',
  'Quinta Elevación',
  'Sexta Elevación',
  'Séptima Elevación',
  'Octava Elevación',
  'Novena Elevación',
  'Décima Elevación',
]

function getStageName(level) {
  const mainStage = Math.floor((level - 1) / 10)
  return STAGE_NAMES[Math.min(mainStage, STAGE_NAMES.length - 1)]
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0]
}

const MAX_DIFF = 240
const MIN_DIFF = 4
const DECAY_RATE = 0.045

function getBaseDifference(level) {
  return MIN_DIFF + (MAX_DIFF - MIN_DIFF) * Math.exp(-DECAY_RATE * (level - 1))
}

function getSimilarColor(baseColor, level) {
  const rgb = hexToRgb(baseColor)
  const baseDiff = getBaseDifference(level)

  const jitter = 0.85 + Math.random() * 0.3
  const diff = Math.max(2, Math.round(baseDiff * jitter))

  const newRgb = rgb.map((value) =>
    value > 127 ? Math.max(0, value - diff) : Math.min(255, value + diff),
  )
  return `rgb(${newRgb[0]}, ${newRgb[1]}, ${newRgb[2]})`
}

const DIFFICULTIES = {
  easy: { label: 'FÁCIL', size: 4, columns: 4 },
  medium: { label: 'MEDIO', size: 9, columns: 3 },
  hard: { label: 'DIFÍCIL', size: 25, columns: 5 },
}

function createRound(currentLevel, size) {
  const baseColor = getRandomHexColor()
  const differentIndex = Math.floor(Math.random() * size)
  const differentColor = getSimilarColor(baseColor, currentLevel)
  const stageName = getStageName(currentLevel)
  const squares = []
  for (let i = 0; i < size; i++) {
    squares.push(i === differentIndex ? differentColor : baseColor)
  }
  return { squares, differentIndex, difficultyName: stageName }
}

export default function OjoDespertante() {
  const [phase, setPhase] = useState('difficulty')
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(null)
  const [difficulty, setDifficulty] = useState('easy')
  const [finalScore, setFinalScore] = useState(0)

  const startGame = (key) => {
    const size = DIFFICULTIES[key].size
    setDifficulty(key)
    setLevel(1)
    setScore(0)
    setFinalScore(0)
    setRound(createRound(1, size))
    setPhase('playing')
  }

  const handleClick = (index) => {
    if (phase !== 'playing' || !round) return
    if (index === round.differentIndex) {
      const newScore = score + level * 10
      const newLevel = level + 1
      setScore(newScore)
      setLevel(newLevel)
      setRound(createRound(newLevel, DIFFICULTIES[difficulty].size))
    } else {
      setFinalScore(score)
      setPhase('over')
    }
  }

  return (
    <div className="ojo-wrap">
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">Ojo de despertante</h1>
          <p className="page-sub">
            Pon a prueba tu elevación encontrando el cuadrado de distinto color.
          </p>
        </div>
      </header>

      <div className="ojo glass-panel">
        {phase === 'difficulty' && (
          <div>
            <p className="ojo-lead">
              Entre los cuadrados hay uno de color ligeramente distinto.
              Encuéntralo para subir de nivel y de elevación. Elige el tamaño
              de la cuadrícula según el reto que quieras.
            </p>
            <div className="ojo-difficulty">
              <p className="ojo-hint">Selecciona la dificultad</p>
              <div className="ojo-options">
                {Object.keys(DIFFICULTIES).map((key) => (
                  <button
                    key={key}
                    className="btn btn-primary"
                    onClick={() => startGame(key)}
                  >
                    {DIFFICULTIES[key].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="ojo-console">
              <Link className="btn btn-ghost" to="/ocio/pasatiempos">
                Volver a Pasatiempos
              </Link>
            </div>
          </div>
        )}

        {phase === 'playing' && round && (
          <div>
            <div className="ojo-info">
              Nivel: <b>{level}</b>
            </div>
            <div className="ojo-score">
              Puntuación: <b>{score}</b>
            </div>
            <div className="ojo-difficulty">{round.difficultyName}</div>

            <div
              className="ojo-container"
              style={{
                gridTemplateColumns: `repeat(${DIFFICULTIES[difficulty].columns}, 1fr)`,
              }}
            >
              {round.squares.map((color, i) => (
                <div
                  key={`${level}-${i}`}
                  className="ojo-square"
                  style={{ backgroundColor: color }}
                  onClick={() => handleClick(i)}
                />
              ))}
            </div>

            <div className="ojo-console">
              <Link className="btn btn-ghost" to="/ocio/pasatiempos">
                Volver a Pasatiempos
              </Link>
            </div>
          </div>
        )}

        {phase === 'over' && (
          <div>
            <div className="ojo-info">¡Perdiste!</div>
            <div className="ojo-score">
              Puntuación final: <b>{finalScore}</b>
            </div>
            <div className="ojo-score">Nivel alcanzado: <b>{level - 1}</b></div>
            <div className="ojo-console">
              <button className="btn btn-primary" onClick={() => setPhase('difficulty')}>
                Jugar de nuevo
              </button>
              <Link className="btn btn-ghost" to="/ocio/pasatiempos">
                Volver a Pasatiempos
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}