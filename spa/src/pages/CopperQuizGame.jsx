import { useEffect, useMemo, useState } from "react";

const QUIZ_URL =
  "https://gist.githubusercontent.com/Ayanyx/f1bb6257c58a4acad74039ebaca7281d/raw/e4bc38e689d58726de0aa4a38ccfcc479223fa4f/CopperQuiz.json";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const C = {
  bg: "#F5F0E8",
  card: "#FFFFFF",
  borde: "#E0D5C5",
  cobre: "#B5451A",
  dorado: "#D4960A",
  texto: "#1A1008",
  textoSec: "#6B5240"
};

export default function CopperQuizGame() {
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | start | playing | finished
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15.0);
  const [best, setBest] = useState(() => Number(localStorage.getItem("copperquiz_best") || 0));

  useEffect(() => {
    let mounted = true;
    fetch(QUIZ_URL)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const parsed = (data.preguntas || []).map((p) => ({
          question: p.pregunta,
          choices: p.opciones
        }));
        setQuestions(parsed);
        setStatus("start");
      })
      .catch(() => setStatus("start"));
    return () => {
      mounted = false;
    };
  }, []);

  const quizSet = useMemo(() => shuffle(questions).slice(0, 10), [questions]);
  const q = quizSet[index];
  const options = useMemo(() => (q ? shuffle(q.choices) : []), [q]);
  const correctAnswer = q?.choices?.[0];

  useEffect(() => {
    if (status !== "playing") return;
    if (timeLeft <= 0) {
      nextQuestion(false);
      return;
    }
    const t = setTimeout(
      () => setTimeLeft((v) => Math.max(0, Number((v - 0.1).toFixed(1)))),
      100
    );
    return () => clearTimeout(t);
  }, [status, timeLeft]);

  function startGame() {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setTimeLeft(15.0);
    setStatus("playing");
  }

  function nextQuestion(correct) {
    const delta = Math.round(timeLeft * 100) * (correct ? 1 : -1);
    setScore((prev) => {
      const next = Math.max(0, prev + delta);
      if (index >= 9) {
        setStatus("finished");
        if (next > best) {
          setBest(next);
          localStorage.setItem("copperquiz_best", String(next));
        }
      }
      return next;
    });
    setSelected(null);
    if (index >= 9) {
      return;
    }
    setIndex((i) => i + 1);
    setTimeLeft(15.0);
  }

  function onPick(choice) {
    if (selected || status !== "playing") return;
    setSelected(choice);
    setTimeout(() => nextQuestion(choice === correctAnswer), 700);
  }

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: 24, minHeight: "75vh", fontFamily: "'Segoe UI', sans-serif", color: C.texto }}>
      <div style={{ color: C.dorado, fontFamily: "Georgia, serif", fontStyle: "italic", marginBottom: 6 }}>
        Juego del Cosmere
      </div>
      <h1 style={{ marginTop: 0, marginBottom: 16, color: C.texto, textTransform: "uppercase" }}>CopperQuiz</h1>
      <div style={{ background: C.card, border: `1px solid ${C.borde}`, borderRadius: 12, padding: 20 }}>

        {status === "loading" && <p>Cargando preguntas...</p>}

        {status === "start" && (
          <>
            <p style={{ color: C.textoSec }}>10 preguntas del Cosmere, 15 segundos por pregunta.</p>
            <button onClick={startGame} style={{ background: C.cobre, color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 700 }}>
              Comenzar
            </button>
          </>
        )}

        {status === "playing" && q && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, color: C.textoSec, fontWeight: 600 }}>
              <span>Pregunta {index + 1}/10</span>
              <span>Tiempo: {timeLeft.toFixed(1)}s</span>
              <span>Puntos: {score}</span>
            </div>
            <div style={{ height: 8, background: "#ede5d5", borderRadius: 4, marginBottom: 16 }}>
              <div style={{ width: `${((index + 1) / 10) * 100}%`, height: "100%", background: C.cobre, borderRadius: 4 }} />
            </div>
            <h3 style={{ color: C.texto }}>{q.question}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {options.map((o) => {
                const isSel = selected === o;
                const isCorrect = selected && o === correctAnswer;
                const bg = isCorrect ? "rgba(46,125,82,.16)" : isSel ? "rgba(181,69,26,.16)" : "#fff";
                return (
                  <button key={o} onClick={() => onPick(o)} style={{ textAlign: "left", padding: 12, border: `1px solid ${C.borde}`, background: bg, color: C.texto, borderRadius: 8 }}>
                    {o}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {status === "finished" && (
          <>
            <h2 style={{ color: C.texto }}>Resultado final: {score}</h2>
            <p style={{ color: C.textoSec }}>Mejor puntuación: {best}</p>
            <button onClick={startGame} style={{ background: C.cobre, color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 700 }}>
              Jugar de nuevo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
