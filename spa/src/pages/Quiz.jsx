import { useEffect, useMemo, useRef, useState } from 'react'
import './Quiz.css'

const QUESTION_COUNT = 10
const TIME_PER_QUESTION = 15000

const QUESTIONS_URL =
  'https://gist.githubusercontent.com/Ayanyx/f1bb6257c58a4acad74039ebaca7281d/raw/e4bc38e689d58726de0aa4a38ccfcc479223fa4f/CopperQuiz.json'

export default function Quiz() {
  const [phase, setPhase] = useState('loading')
  const [questions, setQuestions] = useState([])
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)
  const [pointsChange, setPointsChange] = useState({ text: '', type: '' })
  const [highScores, setHighScores] = useState([])

  const timeLeftRef = useRef(TIME_PER_QUESTION)
  const timerRef = useRef(null)

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch(QUESTIONS_URL)
        if (!response.ok) throw new Error('Error al cargar las preguntas')
        const data = await response.json()
        const loaded = (data.preguntas || []).map((p) => ({
          question: p.pregunta,
          choices: p.opciones,
          correct: p.correcta,
        }))
        if (loaded.length === 0)
          throw new Error('No se encontraron preguntas en el archivo')
        setQuestions(loaded)
        setPhase('start')
        const stored = JSON.parse(localStorage.getItem('highScores') || '[]')
        setHighScores(stored)
      } catch (error) {
        console.error('Error al cargar las preguntas:', error)
        alert('Error al cargar las preguntas. Por favor, recarga la página.')
        setPhase('start')
      }
    }
    loadQuestions()
  }, [])

  useEffect(() => {
    if (
      phase !== 'playing' ||
      selectedOption !== null ||
      currentIndex >= selectedQuestions.length
    )
      return

    const startedAt = Date.now()
    timeLeftRef.current = TIME_PER_QUESTION
    setTimeLeft(TIME_PER_QUESTION)

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAt
      const left = Math.max(0, TIME_PER_QUESTION - elapsed)
      timeLeftRef.current = left
      setTimeLeft(left)
      if (left <= 0) {
        clearInterval(timerRef.current)
        advance()
      }
    }, 10)

    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentIndex, selectedOption])

  const advance = (finalScore) => {
    setSelectedOption(null)
    if (currentIndex < selectedQuestions.length - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      showResults(finalScore)
    }
  }

  const startGame = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random())
    const picked = shuffled.slice(0, QUESTION_COUNT)
    setSelectedQuestions(picked)
    setCurrentIndex(0)
    setScore(0)
    setSelectedOption(null)
    setHighScores(JSON.parse(localStorage.getItem('highScores') || '[]'))
    setPhase('playing')
  }

  const question = selectedQuestions[currentIndex]
  const progress = ((currentIndex + 1) / QUESTION_COUNT) * 100
  const timerSeconds = Math.ceil(timeLeft / 1000)
  const { choices, correctIndex } = useMemo(() => {
    if (!question) return { choices: [], correctIndex: 0 }
    const shuffledChoices = [...question.choices].sort(
      () => 0.5 - Math.random(),
    )
    return {
      choices: shuffledChoices,
      correctIndex: shuffledChoices.indexOf(question.choices[0]),
    }
  }, [question])

  const selectOption = (selected) => {
    if (selectedOption !== null) return
    setSelectedOption(selected)
    clearInterval(timerRef.current)

    const isCorrect = selected === correctIndex
    if (isCorrect) {
      const gained = timeLeftRef.current
      setScore((s) => s + gained)
      setPointsChange({ text: `+${gained}`, type: 'puntos-positivo' })
      setTimeout(() => advance(score + gained), 1500)
    } else {
      const lost = timeLeftRef.current
      setScore((s) => s - lost)
      setPointsChange({ text: `-${lost}`, type: 'puntos-negativo' })
      setTimeout(() => advance(score - lost), 1500)
    }
  }

  const showResults = (finalScore = score) => {
    const stored = JSON.parse(localStorage.getItem('highScores') || '[]')
    stored.push({
      score: finalScore,
      date: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    })
    stored.sort((a, b) => b.score - a.score)
    const top = stored.slice(0, 10)
    localStorage.setItem('highScores', JSON.stringify(top))
    setHighScores(top)
    setPhase('results')
  }

  return (
    <div className="cuiz">
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">Nuestro ocio</h1>
          <p className="page-sub">
            Pasa un buen rato con nuestras secciones interactivas basadas en el
            Cosmere.
          </p>
        </div>
      </header>

      {phase === 'loading' && (
        <div className="cuiz-card">
          <p className="cuiz-muted">Cargando preguntas…</p>
        </div>
      )}

      {phase === 'start' && (
        <div className="cuiz-card cuiz-center">
          <h2>¡Bienvenidos al CopperQuiz!</h2>
          <p className="cuiz-lead">
            10 preguntas del Cosmere. 15 segundos para responder cada una.
            <br />
            Tu conocimiento será puesto a prueba... y tu velocidad, también.
            <br />
            <br />
            ✅ Si respondes bien = puntos al marcador.
            <br />
            ❌ Si respondes mal = puntos a los abismos.
            <br />
            <br />
            ⏱️ ¡Pero cuidado! El tiempo es un arma de doble filo.⏱️
            <br />
            Cuanto más rápido aciertes, más ganas. Cuanto más rápido falles, más
            pierdes.
            <br />
            <br />
            ¿Estás listo?
            <br />
            ¡Las cotorras te observan!
          </p>

          <button type="button" className="cviz-btn" onClick={startGame}>
            Comenzar
          </button>
        </div>
      )}

      {phase === 'playing' && question && (
        <div className="cuiz-card">
          <div className="cueiz-qheader">
            <div>Pregunta {currentIndex + 1}</div>
            <div>
              {currentIndex + 1}/{QUESTION_COUNT}
            </div>
          </div>

          <div className="cueiz-progress">
            <div
              className="cueiz-progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="cueiz-question">{question.question}</div>

          <div className="cueiz-options">
            {choices.map((choice, index) => {
              let cls = 'cueiz-option'
              if (selectedOption !== null) {
                if (index === correctIndex) cls += ' correct'
                else if (index === selectedOption) cls += ' incorrect'
              }
              return (
                <button
                  key={index}
                  type="button"
                  className={cls}
                  onClick={() => selectOption(index)}
                  disabled={selectedOption !== null}
                >
                  <span className="cueiz-marker">
                    {selectedOption !== null && index === correctIndex && (
                      <span>✓</span>
                    )}
                    {selectedOption !== null &&
                      index === selectedOption &&
                      index !== correctIndex && <span>✕</span>}
                  </span>
                  <span className="cueiz-option-text">{choice}</span>
                </button>
              )
            })}
          </div>

          <div className="cueiz-timer">
            <div className="cueiz-timer-num">{timerSeconds}</div>
            <div className="cueiz-timer-label">Segundos</div>
          </div>

          <div className="cueiz-scorebox">
            {pointsChange.text && (
              <div className={`cueiz-points ${pointsChange.type}`}>
                {pointsChange.text}
              </div>
            )}
            <div className="cueiz-score">Puntuación: {score}</div>
          </div>
        </div>
      )}

      {phase === 'results' && (
        <div className="cuiz-card cuiz-center">
          <h2>¡CopperQuiz terminado!</h2>
          <p>
            Tu puntuación final: <strong>{score}</strong>
          </p>
          <p>
            Puntuación máxima: <strong>{highScores[0]?.score || 0}</strong>
          </p>

          <table className="cueiz-table">
            <thead>
              <tr>
                <th className="cueiz-rank">#</th>
                <th className="cueiz-score">Puntuación</th>
                <th className="cueiz-date">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {highScores.map((entry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entry.score}</td>
                  <td>{entry.date}</td>
                </tr>
              ))}
              {highScores.length === 0 && (
                <tr>
                  <td colSpan="3">Sin puntuaciones todavía</td>
                </tr>
              )}
            </tbody>
          </table>

          <button type="button" className="cviz-btn" onClick={startGame}>
            Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  )
}
