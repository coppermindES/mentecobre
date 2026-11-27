import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'

const LOGO_COUNT = 11

const LOGOS = Array.from({ length: LOGO_COUNT }, (_, i) => ({
  id: i,
  top: 2 + Math.random() * 92,
  size: 30 + Math.random() * 15,
  opacity: 0.12 + Math.random() * 0.12,
  delay: -Math.random() * 40,
  duration: 30 + Math.random() * 25,
  bob: 2 + Math.random() * 3,
  bobDelay: -Math.random() * 3,
}))

export default function Layout() {
  return (
    <div className="app-shell">
      <div className="birds-bg" aria-hidden="true">
        {LOGOS.map((l) => (
          <span
            key={l.id}
            className="bird"
            style={{
              top: `${l.top}%`,
              animationDelay: `${l.delay}s`,
              animationDuration: `${l.duration}s`,
            }}
          >
            <img
              src="/Logo.png"
              alt=""
              width={l.size}
              height={l.size}
              className="bird-svg"
              style={{
                opacity: l.opacity,
                animationDuration: `${l.bob}s`,
                animationDelay: `${l.bobDelay}s`,
              }}
            />
          </span>
        ))}
      </div>
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}