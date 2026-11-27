import { useCallback, useEffect, useRef, useState } from 'react'
import './Hopper.css'

const API = 'https://es.coppermind.net/w/api.php'
const WIKI = 'https://es.coppermind.net/wiki/'

const popularArticles = [
  'Kaladin',
  'Dalinar_Kholin',
  'Vin',
  'Kelsier',
  'Sazed',
  'Waxillium_Ladrian',
  'Wayne',
  'Hoid',
  'Jasnah_Kholin',
  'Shallan_Davar',
  'Adolin_Kholin',
  'Szeth',
  'Lift',
  'Marsh',
  'Elend_Venture',
]

const disallowedPrefixes = [
  'Coppermind:',
  'Cite:',
  'Categoría:',
  'Archivo:',
  'Plantilla:',
  'Usuario:',
  'Discusión:',
  'Ayuda:',
  'Portal:',
  'Especial:',
  'Wikipedia:',
  'Wikia:',
  'Fandom:',
  'MediaWiki:',
  'Module:',
]

const disallowedSubstrings = [
  '://',
  '(desambiguación)',
  '(desambigüación)',
  'desambiguación',
  'desambigüación',
  'redirección',
  'redirect',
  'categoría',
  'categoría:',
  'plantilla:',
  'usuario:',
  'discusión:',
  'ayuda:',
  'portal:',
  'especial:',
  'wikipedia:',
  'wikia:',
  'fandom:',
  'mediawiki:',
  'module:',
  'cite:',
]

const planetKeywords = {
  Roshar: ['Roshar'],
  Scadrial: ['Scadrial'],
  Sel: ['Sel'],
  Nalthis: ['Nalthis'],
  Taldain: ['Taldain'],
  'Primero del Sol': ['Primero del Sol'],
  Lumar: ['Lumar'],
  Komashi: ['Komashi'],
  UTol: ['UTol'],
  Vax: ['Vax'],
  Yolen: ['Yolen'],
  Braize: ['Braize'],
  Ashyn: ['Ashyn'],
  Cántico: ['Cántico'],
  Dhatri: ['Dhatri'],
  Bjendal: ['Bjendal'],
  Mythos: ['Mythos'],
  Obrodai: ['Obrodai'],
  Treno: ['Treno'],
}

function isDisallowed(link) {
  const lower = link.toLowerCase()
  if (disallowedPrefixes.some((prefix) => lower.startsWith(prefix.toLowerCase()))) return true
  if (disallowedSubstrings.some((sub) => lower.includes(sub))) return true
  if (link.includes('://') || link.includes('(') || link.includes(')')) return true
  return false
}

async function fetchAPI(params) {
  const url = new URL(API)
  Object.entries({ format: 'json', origin: '*', ...params }).forEach(([k, v]) =>
    url.searchParams.set(k, v),
  )
  const res = await fetch(url)
  return res.json()
}

async function getTranslatedArticles() {
  try {
    const [translatedData, inProgressData] = await Promise.all([
      fetchAPI({
        action: 'query',
        list: 'categorymembers',
        cmtitle: 'Categoría:Artículos ya traducidos',
        cmlimit: '500',
      }),
      fetchAPI({
        action: 'query',
        list: 'categorymembers',
        cmtitle: 'Categoría:En proceso',
        cmlimit: '500',
      }),
    ])

    const t = translatedData.query?.categorymembers || []
    const p = inProgressData.query?.categorymembers || []
    return [...t, ...p]
      .map((m) => m.title)
      .filter((title) => !isDisallowed(title))
  } catch (e) {
    console.error('Error al obtener artículos:', e)
    return popularArticles
  }
}

async function getArticleCategories(article) {
  try {
    const data = await fetchAPI({
      action: 'query',
      prop: 'categories',
      titles: article,
    })
    const pageId = Object.keys(data.query?.pages || {})[0]
    const page = data.query?.pages?.[pageId]
    return page?.categories?.map((c) => c.title) || null
  } catch (e) {
    console.error(`Error al obtener categorias de ${article}:`, e)
    return null
  }
}

function getUniverseAndPlanetFromCategories(categories) {
  if (!categories) return { universe: 'unknown', planet: null }
  const cosmereMatch = categories.find((c) => c.includes('Cosmere'))
  const citoversoMatch = categories.find((c) => c.includes('Citoverso'))
  let universe = 'unknown'
  if (cosmereMatch) universe = 'Cosmere'
  else if (citoversoMatch) universe = 'Citoverso'
  if (universe !== 'Cosmere') return { universe, planet: null }
  for (const [planet, keywords] of Object.entries(planetKeywords)) {
    if (categories.some((cat) => keywords.some((kw) => cat.includes(kw)))) {
      return { universe, planet }
    }
  }
  return { universe, planet: null }
}

async function getArticleInfo(article) {
  try {
    const categories = await getArticleCategories(article)
    if (!categories) return { universe: 'Desconocido', planet: 'Desconocido' }
    const { universe, planet } = getUniverseAndPlanetFromCategories(categories)
    return { universe: universe === 'unknown' ? 'Desconocido' : universe, planet: planet || 'Desconocido' }
  } catch (e) {
    console.error(`Error al obtener info de ${article}:`, e)
    return { universe: 'Desconocido', planet: 'Desconocido' }
  }
}

async function getArticleLinks(title) {
  try {
    const data = await fetchAPI({
      action: 'query',
      prop: 'links',
      plnamespace: '0',
      pllimit: '500',
      titles: title,
    })
    const pageId = Object.keys(data.query?.pages || {})[0]
    const links = data.query?.pages?.[pageId]?.links || []
    return links
      .map((link) => link.title.trim())
      .filter((link) => !isDisallowed(link))
  } catch (e) {
    console.error('Error al obtener enlaces:', e)
    return []
  }
}

async function getBacklinks(title) {
  try {
    const data = await fetchAPI({
      action: 'query',
      list: 'backlinks',
      bltitle: title,
      bllimit: '50',
    })
    const backlinks = data.query?.backlinks || []
    return backlinks.map((link) => link.title.trim()).filter((link) => !isDisallowed(link))
  } catch (e) {
    console.error('Error al obtener backlinks:', e)
    return []
  }
}

async function loadArticleInfo(title) {
  try {
    const redirectData = await fetchAPI({ action: 'query', titles: title, redirects: '1' })
    if (redirectData.query?.redirects?.length) {
      title = redirectData.query.redirects[0].to
    }

    const data = await fetchAPI({
      action: 'query',
      prop: 'extracts',
      exintro: '1',
      explaintext: '1',
      titles: title,
    })
    const pageId = Object.keys(data.query?.pages || {})[0]
    const page = data.query?.pages?.[pageId]
    if (!page || page.missing) throw new Error('Artículo no encontrado')

    const { universe, planet } = await getArticleInfo(title)

    let extract = page.extract
    if (!extract || extract.trim() === '') {
      extract = `Este artículo no tiene extracto disponible. Es un artículo sobre ${
        universe !== 'unknown' ? `el universo de ${universe}` : 'Brandon Sanderson'
      }.`
      if (planet && planet !== 'Desconocido') extract += ` Se encuentra en el planeta ${planet}.`
      extract += ' Puedes hacer clic en los enlaces disponibles para explorar más información.'
    }

    return {
      title: page.title,
      extract,
      universe: universe === 'unknown' ? 'Desconocido' : universe,
      planet: planet || 'Desconocido',
    }
  } catch (e) {
    console.error(`Error al cargar información para ${title}:`, e)
    throw e
  }
}

function truncateExtract(text, max = 600) {
  if (text.length <= max) return text
  const lastPeriod = text.substring(0, max).lastIndexOf('.')
  if (lastPeriod > 0) return text.substring(0, lastPeriod + 1) + ' [...]'
  const lastSpace = text.substring(0, max).lastIndexOf(' ')
  return text.substring(0, lastSpace) + ' [...]'
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export default function Hopper() {
  const [phase, setPhase] = useState('welcome')
  const [wantTutorial, setWantTutorial] = useState(false)
  const [loading, setLoading] = useState(false)
  const [articleLoading, setArticleLoading] = useState(false)
  const [startInfo, setStartInfo] = useState(null)
  const [targetInfo, setTargetInfo] = useState(null)
  const [currentInfo, setCurrentInfo] = useState(null)
  const [links, setLinks] = useState([])
  const [linksReady, setLinksReady] = useState(false)
  const [linkError, setLinkError] = useState(false)
  const [search, setSearch] = useState('')
  const [moves, setMoves] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [path, setPath] = useState([])
  const [hintsTotal, setHintsTotal] = useState(0)
  const [hints, setHints] = useState([])
  const [hintsReady, setHintsReady] = useState(false)
  const [canGoBack, setCanGoBack] = useState(false)
  const [victory, setVictory] = useState(null)
  const [surrenderPath, setSurrenderPath] = useState(null)
  const [surrenderStatus, setSurrenderStatus] = useState('loading')

  const stateRef = useRef({
    startArticle: null,
    targetArticle: null,
    currentArticle: null,
    path: [],
    hintsUsed: 0,
    secondaryHintsUsed: 0,
  })
  const secondsRef = useRef(0)
  const movesRef = useRef(0)

  const linkCache = useRef(new Map())
  const backlinkCache = useRef(new Map())

  const getCachedLinks = useCallback(async (title, isBacklink = false) => {
    const cache = isBacklink ? backlinkCache.current : linkCache.current
    if (cache.has(title)) return cache.get(title)
    const links = isBacklink ? await getBacklinks(title) : await getArticleLinks(title)
    cache.set(title, links)
    return links
  }, [])

  const timerRef = useRef(null)
  const helpTimerRef = useRef(null)

  const stopTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (helpTimerRef.current) clearInterval(helpTimerRef.current)
    timerRef.current = null
    helpTimerRef.current = null
  }, [])

  useEffect(() => {
    return () => stopTimers()
  }, [stopTimers])

  const findBidirectionalPath = useCallback(
    async (start, target) => {
      const forwardQueue = [start]
      const backwardQueue = [target]
      const forwardVisited = new Set([start])
      const backwardVisited = new Set([target])
      const forwardParent = new Map([[start, null]])
      const backwardParent = new Map([[target, null]])

      const reconstructPath = (meetingPoint) => {
        const fwd = []
        let cur = meetingPoint
        while (cur !== null) {
          fwd.unshift(cur)
          cur = forwardParent.get(cur)
        }
        const bwd = []
        cur = meetingPoint
        while (cur !== null) {
          bwd.push(cur)
          cur = backwardParent.get(cur)
        }
        const full = [...fwd, ...bwd]
        const unique = []
        const seen = new Set()
        for (const a of full) {
          if (!seen.has(a)) {
            seen.add(a)
            unique.push(a)
          }
        }
        const ti = unique.indexOf(target)
        if (ti !== -1) unique.splice(ti + 1)
        if (!seen.has(start)) unique.unshift(start)
        if (!unique.includes(target)) unique.push(target)
        return unique
      }

      while (forwardQueue.length > 0 && backwardQueue.length > 0) {
        const curF = forwardQueue.shift()
        const curB = backwardQueue.shift()

        if (backwardVisited.has(curF)) return reconstructPath(curF)
        if (forwardVisited.has(curB)) return reconstructPath(curB)
        if (curF === target) return reconstructPath(curF)

        const fwdLinks = await getCachedLinks(curF)
        for (const link of fwdLinks) {
          if (!forwardVisited.has(link)) {
            forwardVisited.add(link)
            forwardParent.set(link, curF)
            forwardQueue.push(link)
            if (backwardVisited.has(link)) return reconstructPath(link)
          }
        }

        const bwdLinks = await getBacklinks(curB)
        for (const link of bwdLinks) {
          if (!backwardVisited.has(link)) {
            backwardVisited.add(link)
            backwardParent.set(link, curB)
            backwardQueue.push(link)
            if (forwardVisited.has(link)) return reconstructPath(link)
          }
        }
      }
      return null
    },
    [getCachedLinks],
  )

  const verifyPath = useCallback(
    async (path) => {
      for (let i = 0; i < path.length - 1; i++) {
        const links = await getCachedLinks(path[i])
        if (!links.includes(path[i + 1])) return false
      }
      return true
    },
    [getCachedLinks],
  )

  const calculateOptimalPath = useCallback(
    async (start, target) => {
      if (!start || !target) return null
      const startInfoRaw = await getArticleInfo(start)
      const targetInfoRaw = await getArticleInfo(target)
      const sUni = startInfoRaw.universe
      const tUni = targetInfoRaw.universe
      const sPlanet = startInfoRaw.planet
      const tPlanet = targetInfoRaw.planet

      let predefined = []

      if (sUni === 'Cosmere' && tUni === 'Cosmere') {
        if (sPlanet && tPlanet && sPlanet === tPlanet) {
          return await findBidirectionalPath(start, target)
        }
        if (!tPlanet) {
          predefined = [start, 'Cosmere', target]
        } else {
          predefined = [start, 'Cosmere', tPlanet, target]
        }
        if (await verifyPath(predefined)) return predefined
        return await findBidirectionalPath(tPlanet, target)
      }
      if (sUni === 'Citoverso' && tUni === 'Citoverso') {
        return await findBidirectionalPath(start, target)
      }
      if (sUni === 'Cosmere' && tUni === 'Citoverso') {
        predefined = [start, 'Cosmere', 'Brandon Sanderson', 'Citoverso', target]
        if (await verifyPath(predefined)) return predefined
        return await findBidirectionalPath('Citoverso', target)
      }
      if (sUni === 'Citoverso' && tUni === 'Cosmere') {
        predefined = tPlanet
          ? [start, 'Citoverso', 'Brandon Sanderson', 'Cosmere', tPlanet, target]
          : [start, 'Citoverso', 'Brandon Sanderson', 'Cosmere', target]
        if (await verifyPath(predefined)) return predefined
        return await findBidirectionalPath('Cosmere', target)
      }

      return await findBidirectionalPath(start, target)
    },
    [findBidirectionalPath, verifyPath],
  )

  const updateTimer = useCallback(() => {
    secondsRef.current += 1
    setSeconds(secondsRef.current)
    if (secondsRef.current >= 30) setHintsReady(true)
  }, [])

  const startTimer = useCallback(() => {
    stopTimers()
    secondsRef.current = 0
    setSeconds(0)
    timerRef.current = setInterval(() => updateTimer(), 1000)
  }, [stopTimers, updateTimer])

  const showAvailableLinks = useCallback(async (state) => {
    setLinksReady(false)
    setLinkError(false)
    try {
      const linksList = await getArticleLinks(state.currentArticle)
      if (linksList.length === 0) {
        setLinks([])
        setLinksReady(true)
        return
      }
      setLinks(linksList)
      setLinksReady(true)
    } catch (e) {
      console.error('Error al cargar los enlaces:', e)
      setLinkError(true)
      setLinksReady(true)
    }
  }, [])

  const startGame = useCallback(
    async (state) => {
      setLoading(true)
      stopTimers()
      linkCache.current.clear()
      backlinkCache.current.clear()
      const fresh = { startArticle: null, targetArticle: null, currentArticle: null, path: [],
        hintsUsed: 0, secondaryHintsUsed: 0, optimalPath: null }
      try {
        const translated = await getTranslatedArticles()
        fresh.startArticle = translated[Math.floor(Math.random() * translated.length)]
        do {
          fresh.targetArticle = translated[Math.floor(Math.random() * translated.length)]
        } while (fresh.targetArticle === fresh.startArticle)

        const [sInfo, tInfo] = await Promise.all([
          loadArticleInfo(fresh.startArticle),
          loadArticleInfo(fresh.targetArticle),
        ])

        fresh.currentArticle = fresh.startArticle
        fresh.path = [fresh.startArticle]

        Object.assign(state, fresh)
        secondsRef.current = 0
        movesRef.current = 0
        setStartInfo(sInfo)
        setTargetInfo(tInfo)
        setCurrentInfo(sInfo)
        setMoves(0)
        setSeconds(0)
        setArticleLoading(false)
        setHints([])
        setPath(fresh.path ? [...fresh.path] : [fresh.startArticle])
        setHintsTotal(0)
        setHintsReady(false)
        setSurrenderPath(null)
        setSurrenderStatus('loading')
        setCanGoBack(false)

        startTimer()
        await showAvailableLinks(state)
        setLoading(false)
        setPhase('playing')

        calculateOptimalPath(fresh.startArticle, fresh.targetArticle)
          .then((path) => {
            state.optimalPath = path
          })
          .catch((e) => console.error('Error al calcular la ruta óptima:', e))
      } catch {
        alert('Error al iniciar el juego. Por favor, intenta de nuevo.')
        setLoading(false)
      }
    },
    [calculateOptimalPath, showAvailableLinks, startTimer, stopTimers],
  )

  const navigateToArticle = useCallback(
    async (title, state) => {
      setArticleLoading(true)
      try {
        const info = await loadArticleInfo(title)
        if (state.path.length > 1 && title === state.path[state.path.length - 2]) {
          state.path.pop()
        } else {
          state.path.push(title)
        }
        if (title !== state.currentArticle) {
          movesRef.current += 1
          setMoves(movesRef.current)
        }
        state.currentArticle = title
        setCurrentInfo(info)
        setCanGoBack(state.path.length > 1)
        setPath([...state.path])
        await showAvailableLinks(state)

        if (title === state.targetArticle) {
          const hintsUsed = state.hintsUsed + state.secondaryHintsUsed
          const penaltyTime = hintsUsed * 30
          const finalTime = secondsRef.current
          const baseTime = Math.max(0, finalTime - penaltyTime)
          stopTimers()
          setVictory({
            start: state.startArticle,
            target: state.targetArticle,
            moves: movesRef.current,
            baseTime,
            hints: hintsUsed,
            penaltyTime,
            finalTime,
          })
          setPhase('victory')
        }
      } catch {
        alert('Error al cargar el artículo. Por favor, intenta de nuevo.')
      }
      setArticleLoading(false)
    },
    [showAvailableLinks, stopTimers],
  )

  const showHint = useCallback(async (state) => {
    if (secondsRef.current < 30) {
      alert('Las pistas están disponibles después de 30 segundos de juego.')
      return
    }
    try {
      const backlinks = await getBacklinks(state.targetArticle)
      if (backlinks.length === 0) {
        setHints([{ type: 'empty' }])
      } else {
        const random = backlinks.sort(() => 0.5 - Math.random()).slice(0, 3)
        setHints(random.map((link) => ({ type: 'link', article: link, revealed: null })))
      }
      state.hintsUsed++
      setHintsTotal(state.hintsUsed + state.secondaryHintsUsed)
    } catch {
      alert('Error al mostrar la pista. Por favor, intenta de nuevo.')
    }
  }, [])

  const showSecondaryHint = useCallback(async (selectedArticle, state) => {
    try {
      const links = await getArticleLinks(selectedArticle)
      let revealed = 'No hay enlaces disponibles'
      const relevant = links.filter(
        (l) => l !== state.currentArticle && l !== state.targetArticle,
      )
      if (relevant.length > 0) {
        revealed = relevant[Math.floor(Math.random() * relevant.length)]
      } else {
        revealed = 'No hay enlaces relevantes'
      }
      setHints((prev) =>
        prev.map((h) => (h.type === 'link' && h.article === selectedArticle ? { ...h, revealed } : h)),
      )
      state.secondaryHintsUsed++
      setHintsTotal(state.hintsUsed + state.secondaryHintsUsed)
    } catch {
      alert('Error al mostrar la pista secundaria. Por favor, intenta de nuevo.')
    }
  }, [])

  const surrender = useCallback(async (state) => {
    stopTimers()
    setSurrenderStatus('loading')
    setPhase('surrender')
    try {
      if (state.optimalPath) {
        setSurrenderPath(state.optimalPath)
        setSurrenderStatus('path')
      } else {
        const path = await calculateOptimalPath(state.startArticle, state.targetArticle)
        setSurrenderPath(path)
        setSurrenderStatus(path ? 'path' : 'none')
      }
    } catch {
      setSurrenderStatus('error')
    }
  }, [calculateOptimalPath, stopTimers])

  const goBack = useCallback(
    async (state) => {
      if (state.path.length > 1) {
        const previous = state.path[state.path.length - 2]
        state.path.pop()
        movesRef.current += 1
        setMoves(movesRef.current)
        await navigateToArticle(previous, state)
      }
    },
    [navigateToArticle],
  )

  const filteredLinks = links.filter((l) => l.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="hopper">
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">CopperHopper</h1>
          <p className="page-sub">
            Viaja por la Coppermind en español de artículo en artículo hasta llegar al objetivo.
          </p>
        </div>
      </header>

      {loading && phase !== 'playing' && (
        <div className="hopper-loading">
          <div className="hopper-spinner"></div>
          <p>Cargando CopperHopper…</p>
        </div>
      )}

      {phase === 'welcome' && !loading && (
        <div className="hopper-card hopper-card-center">
          <h2>COPPERHOPPER</h2>
          <h3>¿Qué es CopperHopper?</h3>
          <p>
            CopperHopper es un juego de navegación por la Coppermind en español, inspirado en el
            WikiRace. Empezarás en un artículo de la wiki y tendrás que llegar, artículo a artículo,
            hasta el artículo objetivo. Cada salto se hace clicando en uno de los enlaces de la
            página actual. Creado por las cotorras y bautizado por El Club de las Tormentas.
          </p>
          <h3>Novedades en v2:</h3>
          <ul>
            <li>Sistema de puntuación basado en movimientos y tiempo</li>
            <li>Pistas disponibles después de 30 segundos</li>
            <li>Buscador de enlaces para encontrar rápidamente lo que necesitas</li>
            <li>Diseño mejorado para una mejor experiencia</li>
          </ul>
          <div className="hopper-actions">
            <button
              className="cviz-btn hopper-secondary"
              type="button"
              onClick={() => setWantTutorial(true)}
            >
              Cómo jugar
            </button>
            <button className="cviz-btn" type="button" onClick={() => startGame(stateRef.current)}>
              Empezar
            </button>
          </div>
        </div>
      )}

      {wantTutorial && !loading && (
        <div className="hopper-card hopper-card-center">
          <h3>Cómo jugar a CopperHopper</h3>
          <h4>Objetivo</h4>
          <p>
            Navega desde el artículo de inicio hasta el artículo objetivo en el menor número de
            clics posible.
          </p>
          <h4>¿Cómo funciona?</h4>
          <ol>
            <li>En la parte superior aparecerán dos artículos, el inicial y el objetivo, con un pequeño extracto</li>
            <li>Bajo el artículo de inicio, aparecerán los enlaces disponibles</li>
            <li>Haz clic en un enlace que creas que te acercará al objetivo</li>
            <li>El artículo de inicio se actualizará con el nuevo artículo</li>
            <li>Continúa navegando hasta llegar al objetivo</li>
            <li>¡Cada clic cuenta como un movimiento!</li>
          </ol>
          <h4>Ejemplo</h4>
          <p>Si tuvieras que viajar de "alta tormenta" a "germinador":</p>
          <div className="hopper-example">Alta tormenta → Roshar → Cosmere → Lumar → Germinador</div>
          <p className="hopper-tip">¡A veces los extractos de los artículos pueden contener pistas!</p>
          <div className="hopper-actions">
            <button
              className="cviz-btn"
              type="button"
              onClick={() => {
                setWantTutorial(false)
                startGame(stateRef.current)
              }}
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {phase === 'playing' && startInfo && targetInfo && (
        <div className="hopper-board">
          <div className="hopper-row">
            <div className="hopper-article hopper-article-current">
              <span className="hopper-badge">Inicio · Actual</span>
              <h3 className="hopper-article-title">
                <span>{currentInfo?.title}</span>
                <a
                  className="hopper-external"
                  href={`${WIKI}${encodeURIComponent(currentInfo?.title || '')}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  ⧉
                </a>
              </h3>
              {articleLoading ? (
                <div className="hopper-card-loading">
                  <div className="hopper-spinner small"></div>
                  <p>Cargando artículo…</p>
                </div>
              ) : (
                <>
                  {currentInfo && (
                    <div className="hopper-meta">
                      <span className="hopper-chip">{currentInfo.universe}</span>
                      <span className="hopper-chip">{currentInfo.planet}</span>
                    </div>
                  )}
                  {currentInfo && (
                    <p className="hopper-extract">
                      {truncateExtract(currentInfo.extract)}
                    </p>
                  )}
                  <div className="hopper-toolbar">
                    <div className="hopper-search">
                      <input
                        type="text"
                        placeholder="Buscar enlaces..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="hopper-counter">
                    {filteredLinks.length} de {links.length} enlaces
                  </div>
                  <div className="hopper-links">
                    {!linksReady && <div className="hopper-spinner small"></div>}
                    {linksReady && linkError && (
                      <div className="hopper-link-error">Error al cargar los enlaces. Intenta de nuevo.</div>
                    )}
                    {linksReady && !linkError && links.length === 0 && (
                      <div>
                        <p className="hopper-link-error">No se encontraron enlaces disponibles.</p>
                        {canGoBack && (
                          <button
                            className="cviz-btn hopper-secondary"
                            type="button"
                            onClick={() => goBack(stateRef.current)}
                          >
                            ← Volver atrás
                          </button>
                        )}
                      </div>
                    )}
                    {filteredLinks.length > 0 &&
                      filteredLinks.map((link) => (
                        <button
                          key={link}
                          type="button"
                          className="hopper-link"
                          onClick={() => navigateToArticle(link, stateRef.current)}
                        >
                          {link}
                        </button>
                      ))}
                  </div>
                </>
              )}
            </div>

            <div className="hopper-article hopper-article-target">
              <span className="hopper-badge">Objetivo · Meta</span>
              <h3 className="hopper-article-title">
                <span>{targetInfo.title}</span>
                <a
                  className="hopper-external"
                  href={`${WIKI}${encodeURIComponent(targetInfo.title)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  ⧉
                </a>
              </h3>
              <div className="hopper-meta">
                <span className="hopper-chip">{targetInfo.universe}</span>
                <span className="hopper-chip">{targetInfo.planet}</span>
              </div>
              <p className="hopper-extract">{truncateExtract(targetInfo.extract)}</p>

              <div className="hopper-stats">
                <button
                  className="cviz-btn hopper-secondary"
                  type="button"
                  disabled={!hintsReady}
                  onClick={() => showHint(stateRef.current)}
                >
                  {hintsReady ? 'Pista' : `Pista en ${Math.max(0, 30 - seconds)}s`}
                </button>
                <span className="hopper-moves" title="Movimientos">
                  <span className="hopper-moves-count">{moves}</span>
                  <span className="hopper-moves-label">{moves === 1 ? 'movimiento' : 'movimientos'}</span>
                </span>
                <div className="hopper-timer" title={`Tiempo · ${hintsTotal} pista(s) (+30s c/u)`}>
                  {formatTime(seconds)}
                </div>
                <button
                  className="cviz-btn hopper-secondary"
                  type="button"
                  onClick={() => surrender(stateRef.current)}
                >
                  Rendirse
                </button>
              </div>

              {hints.length > 0 && (
                <div className="hopper-hints">
                  <h4>Pistas</h4>
                  {hints.some((h) => h.type === 'empty') && (
                    <div className="hopper-hint">No se encontraron artículos que enlacen al objetivo.</div>
                  )}
                  {hints
                    .filter((h) => h.type === 'link')
                    .map((h) => (
                      <div className="hopper-hint" key={h.article}>
                        <span>{h.article}</span>
                        <span>|</span>
                        {h.revealed === null ? (
                          <button
                            type="button"
                            className="hopper-hint-btn"
                            onClick={() => showSecondaryHint(h.article, stateRef.current)}
                          >
                            ¿Obtener pista?
                          </button>
                        ) : (
                          <span>{h.revealed}</span>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {(path || []).length > 0 && (
            <div className="hopper-path-bar">
              {path.map((p, i) => (
                <span key={`${p}-${i}`} className={`hopper-path-item${targetInfo?.title === p ? ' target' : ''}`}>
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {phase === 'surrender' && (
        <div className="hopper-card">
          <h3>Te has rendido</h3>
          <p>
            No has llegado desde <strong>{startInfo?.title}</strong> hasta{' '}
            <strong>{targetInfo?.title}</strong>.
          </p>
          {surrenderStatus === 'loading' && (
            <div className="hopper-loading-inline">
              <div className="hopper-spinner small"></div>
              <p>Analizando posibles rutas...</p>
            </div>
          )}
          {surrenderStatus === 'path' && surrenderPath && (
            <div className="hopper-route">
              <span className="hopper-route-label">Ruta óptima sugerida</span>
              {surrenderPath.map((p, i) => (
                <span key={`${p}-${i}`}>
                  {i > 0 && <span className="hopper-route-arrow">→</span>}
                  <a href={`${WIKI}${encodeURIComponent(p)}`} target="_blank" rel="noreferrer">
                    {p}
                  </a>
                </span>
              ))}
            </div>
          )}
          {surrenderStatus === 'none' && (
            <p>No hemos podido encontrar una ruta disponible. Pregunta a alguna de las cotorras.</p>
          )}
          {surrenderStatus === 'error' && <p>Hubo un error al calcular la ruta óptima.</p>}
          <div className="hopper-actions">
            <button
              className="cviz-btn"
              type="button"
              onClick={() => startGame(stateRef.current)}
            >
              Nuevo Juego
            </button>
          </div>
        </div>
      )}

      {phase === 'victory' && victory && (
        <div className="hopper-card hopper-winning">
          <div className="hopper-win-icon">🏆</div>
          <h3>¡Felicidades!</h3>
          <p>
            Has llegado desde <strong>{victory.start}</strong> hasta <strong>{victory.target}</strong>{' '}
            en <strong>{victory.moves}</strong> movimientos.
          </p>
          <div className="hopper-win-grid">
            <div className="hopper-win-item">
              <span className="hopper-win-value">{victory.moves}</span>
              <span className="hopper-win-label">Movimientos</span>
            </div>
            <div className="hopper-win-item">
              <span className="hopper-win-value">{formatTime(victory.baseTime)}</span>
              <span className="hopper-win-label">Sin pistas</span>
            </div>
            <div className="hopper-win-item">
              <span className="hopper-win-value">{victory.hints}</span>
              <span className="hopper-win-label">Pistas</span>
            </div>
            <div className="hopper-win-item">
              <span className="hopper-win-value">{formatTime(victory.penaltyTime)}</span>
              <span className="hopper-win-label">Penalización</span>
            </div>
          </div>
          <p className="hopper-win-final">
            Tiempo final: <strong>{formatTime(victory.finalTime)}</strong>
          </p>
          <div className="hopper-actions">
            <button
              className="cviz-btn"
              type="button"
              onClick={() => startGame(stateRef.current)}
            >
              Nuevo Juego
            </button>
          </div>
        </div>
      )}
    </div>
  )
}