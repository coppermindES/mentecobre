import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Metaldoku.css'

const IMAGES = [
  'https://i.ibb.co/0jcKh6Qb/Zinc.png',
  'https://i.ibb.co/84KhQgm1/Tin.png',
  'https://i.ibb.co/mFvKxG3Z/Steel.png',
  'https://i.ibb.co/nqDbJvCF/Pewter.png',
  'https://i.ibb.co/RG0MTYFZ/Iron.png',
  'https://i.ibb.co/gZRpLFXf/Copper.png',
  'https://i.ibb.co/nNLgWCCH/Bronze.png',
  'https://i.ibb.co/tTCcQr7R/Atium.png',
  'https://i.ibb.co/G4CBC5Wz/Brass.png',
]

const N = 3
const NN = N * N
const CELLS = NN * NN

const DIFFICULTIES = {
  easy: { label: 'FÁCIL', fixCells: 45 },
  medium: { label: 'MEDIO', fixCells: 35 },
  hard: { label: 'DIFÍCIL', fixCells: 25 },
}

function shuffle(array) {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generateSolution() {
  let idx = 0
  const base = []
  for (let i = 0; i < NN; i++)
    for (let j = 0; j < NN; j++)
      base[idx++] = Math.floor((i * N + Math.floor(i / N) + j) % NN + 1)

  let bands = shuffle([1, 2, 3])
  const hTmp = []
  idx = 0
  for (const b of bands) {
    const start = (b - 1) * N * NN
    const stop = b * N * NN
    for (let j = start; j < stop; j++) hTmp[idx++] = base[j]
  }

  bands = shuffle([1, 2, 3])
  const vTmp = []
  idx = 0
  for (let k = 0; k < NN; k++)
    for (const b of bands) {
      const start = (b - 1) * N
      const stop = b * N
      for (let j = start; j < stop; j++) vTmp[idx++] = hTmp[j + k * NN]
    }
  return vTmp
}

function buildBoard(fixCells) {
  const solution = generateSolution()
  const board = Array(CELLS).fill(0)
  const fixed = Array(CELLS).fill(false)
  shuffle([...Array(CELLS).keys()])
    .slice(0, fixCells)
    .forEach((i) => {
      board[i] = solution[i]
      fixed[i] = true
    })
  return { board, solution, fixed }
}

export default function Metaldoku() {
  const [phase, setPhase] = useState('difficulty')
  const [board, setBoard] = useState([])
  const [fixed, setFixed] = useState([])
  const [solution, setSolution] = useState([])
  const [selected, setSelected] = useState(null)
  const [correct, setCorrect] = useState([])
  const [incorrect, setIncorrect] = useState([])
  const [highlightSame, setHighlightSame] = useState([])
  const [seconds, setSeconds] = useState(0)
  const [cellsComplete, setCellsComplete] = useState(0)
  const [, setDifficulty] = useState('medium')

  const timerRef = useRef(null)
  const secondsRef = useRef(0)
  const stateRef = useRef({})

  useEffect(() => {
    stateRef.current = { board, solution, fixed, correct, incorrect }
  })

  useEffect(() => {
    if (phase === 'playing') {
      timerRef.current = setInterval(() => {
        secondsRef.current += 1
        setSeconds(secondsRef.current)
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [phase])

  const start = useCallback((key) => {
    const { fixCells } = DIFFICULTIES[key]
    const { board, solution, fixed } = buildBoard(fixCells)
    let complete = 0
    board.forEach((v) => {
      if (v > 0) complete++
    })
    secondsRef.current = 0
    setDifficulty(key)
    setBoard(board)
    setFixed(fixed)
    setSolution(solution)
    setCorrect([])
    setIncorrect([])
    setSelected(null)
    setHighlightSame([])
    setCellsComplete(complete)
    setSeconds(0)
    setPhase('playing')
  }, [])

  const handleCellClick = useCallback(
    (index) => {
      if (phase !== 'playing') return
      const { board: b, fixed: fx } = stateRef.current
      if (fx[index]) {
        const v = b[index]
        const same = []
        b.forEach((bv, bi) => {
          if (bv === v && bv > 0) same.push(bi)
        })
        setHighlightSame(same)
        return
      }
      setSelected((s) => (s === index ? null : index))
      setHighlightSame([])
    },
    [phase],
  )

  const addValue = useCallback(
    (value) => {
      if (selected === null || phase !== 'playing') return
      const { solution: sol, fixed: fx } = stateRef.current
      const correctArr = [...correct]
      const incorrectArr = [...incorrect]
      const newBoard = [...board]

      if (value === 0) {
        newBoard[selected] = 0
        const ci = correctArr.indexOf(selected)
        if (ci >= 0) correctArr.splice(ci, 1)
        const ii = incorrectArr.indexOf(selected)
        if (ii >= 0) incorrectArr.splice(ii, 1)
      } else {
        newBoard[selected] = value
        if (value === sol[selected]) {
          if (!correctArr.includes(selected)) correctArr.push(selected)
          const ii = incorrectArr.indexOf(selected)
          if (ii >= 0) incorrectArr.splice(ii, 1)
        } else {
          if (!incorrectArr.includes(selected)) incorrectArr.push(selected)
          const ci = correctArr.indexOf(selected)
          if (ci >= 0) correctArr.splice(ci, 1)
        }
      }

      setBoard(newBoard)
      setCorrect(correctArr)
      setIncorrect(incorrectArr)
      setSelected(null)
      setHighlightSame([])

      const complete = fx.reduce(
        (acc, isFix, i) => acc + (isFix || correctArr.includes(i) ? 1 : 0),
        0,
      )
      setCellsComplete(complete)
      if (complete >= CELLS) setPhase('over')
    },
    [board, correct, incorrect, phase, selected],
  )

  const solve = useCallback(() => {
    clearInterval(timerRef.current)
    const c = []
    for (let i = 0; i < CELLS; i++) {
      const { fixed: fx } = stateRef.current
      if (!fx[i]) c.push(i)
    }
    setCorrect(c)
    setIncorrect([])
    setSelected(null)
    setHighlightSame([])
    setCellsComplete(CELLS)
    setPhase('over')
  }, [])

  const formatTime = () => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m} minutos y ${s} segundos`
  }

  const cells = []
  for (let i = 0; i < CELLS; i++) {
    const x = (i % NN) + 1
    const y = Math.floor(i / NN) + 1
    const value = board[i] || 0
    const isCorrect = correct.includes(i)
    const isWrong = incorrect.includes(i)
    const isNone = value === 0 && !isCorrect

    const inGroup =
      selected !== null &&
      (i % NN === selected % NN ||
        Math.floor(i / NN) === Math.floor(selected / NN) ||
        Math.floor((i % NN) / N) === Math.floor((selected % NN) / N) &&
          Math.floor(Math.floor(i / NN) / N) === Math.floor(Math.floor(selected / NN) / N))

    const cls = [
      'metaldoku-cell',
      x % N === 0 && x !== NN ? 'border_v' : '',
      y % N === 0 && y !== NN ? 'border_h' : '',
      fixed[i] ? 'fix' : '',
      isCorrect ? 'correct' : '',
      isWrong ? 'incorrect' : '',
      highlightSame.includes(i) ? 'highlight-same' : '',
      selected === i ? 'selected current' : '',
      inGroup ? 'group' : '',
    ]
      .filter(Boolean)
      .join(' ')

    cells.push(
      <div
        key={i}
        className={cls}
        data-x={x}
        data-y={y}
        onClick={() => handleCellClick(i)}
      >
        {!isNone && (
          <img
            className="sudoku-image"
            src={IMAGES[value - 1]}
            alt={value}
            draggable={false}
          />
        )}
      </div>,
    )
  }

  return (
    <div className="metaldoku-wrap">
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">Metaldoku</h1>
          <p className="page-sub">Sudoku del Cosmere con los metales alománticos.</p>
        </div>
      </header>

      <div className="metaldoku glass-panel">
        {phase === 'difficulty' && (
          <div>
            <p className="metaldoku-difficulty-hint">
              Selecciona la dificultad y completa el tablero con los 9 metales
            </p>
            <div className="metaldoku-difficulty">
              {Object.keys(DIFFICULTIES).map((key) => (
                <button
                  key={key}
                  className="btn btn-primary"
                  onClick={() => start(key)}
                >
                  {DIFFICULTIES[key].label}
                </button>
              ))}
            </div>
            <p className="metaldoku-empty">
              Ninguna fila, columna ni bloque de 3×3 puede repetir metal.
            </p>
            <div className="metaldoku-toolbar">
              <Link className="material-symbols-outlined" to="/ocio/pasatiempos">
                Volver a Pasatiempos
              </Link>
            </div>
          </div>
        )}

        {phase !== 'difficulty' && (
          <div className="metaldoku-center">
            <div className="metaldoku-stat">
              <span>
                Correctas: <b>{cellsComplete}/{CELLS}</b>
              </span>
              <span>
                Tiempo: <b>{seconds}s</b>
              </span>
            </div>

            <div className="metaldoku-board">{cells}</div>

            <div className="metaldoku-console metaldoku-metal-buttons">
              {IMAGES.map((img, i) => (
                <div
                  key={img}
                  className="metaldoku-num"
                  onClick={() => addValue(i + 1)}
                >
                  <img src={img} alt={i + 1} draggable={false} />
                </div>
              ))}
              <div
                className="metaldoku-num metaldoku-erase"
                onClick={() => addValue(0)}
              >
                BORRAR
              </div>
            </div>

            <div className="metaldoku-toolbar">
              <button className="btn btn-primary" onClick={solve}>
                Resolver
              </button>
              <Link className="material-symbols-outlined" to="/ocio/pasatiempos">
                Volver a Pasatiempos
              </Link>
            </div>
          </div>
        )}
      </div>

      {phase === 'over' && (
        <div className="metaldoku-gameover">
          <div className="metaldoku-dialog">
            <h2>Has completado el Metaldoku</h2>
            <p>
              Tiempo: <b>{formatTime()}</b>
            </p>
            <div className="metaldoku-toolbar">
              <button className="btn btn-primary" onClick={() => setPhase('difficulty')}>
                Jugar de nuevo
              </button>
              <Link className="btn btn-ghost" to="/ocio/pasatiempos">
                Volver a Pasatiempos
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}