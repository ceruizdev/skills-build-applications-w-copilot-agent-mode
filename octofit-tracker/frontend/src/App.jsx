import { useEffect, useRef, useState } from 'react'
import { NavLink, Route, Routes, Link } from 'react-router-dom'
import { registerVisit } from './api.js'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const SITE_ROUTES = Object.freeze({
  activities: '/api/activities',
  leaderboard: '/api/leaderboard',
  teams: '/api/teams',
  users: '/api/users',
  workouts: '/api/workouts',
})

function App() {
  const [visitCount, setVisitCount] = useState(null)
  const visitRegistered = useRef(false)

  useEffect(() => {
    if (visitRegistered.current) return
    visitRegistered.current = true
    registerVisit().then((result) => setVisitCount(result.visits)).catch(() => {})
  }, [])

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>OctoFit <em>Tracker</em></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to={SITE_ROUTES.activities}>Activities</NavLink>
          <NavLink to={SITE_ROUTES.leaderboard}>Leaderboard</NavLink>
          <NavLink to={SITE_ROUTES.teams}>Teams</NavLink>
          <NavLink to={SITE_ROUTES.users}>People</NavLink>
          <NavLink to={SITE_ROUTES.workouts}>Workouts</NavLink>
        </nav>
        <div className="header-status"><span className="status-dot" /> API online</div>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path={SITE_ROUTES.activities} element={<Activities />} />
          <Route path={SITE_ROUTES.leaderboard} element={<Leaderboard />} />
          <Route path={SITE_ROUTES.teams} element={<Teams />} />
          <Route path={SITE_ROUTES.users} element={<Users />} />
          <Route path={SITE_ROUTES.workouts} element={<Workouts />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <span>Mergington High School</span>
        <span>•</span>
        <span>Move with purpose.</span>
        {visitCount !== null && <span className="visit-counter">Visits: {visitCount.toLocaleString()}</span>}
      </footer>
    </div>
  )
}

function Dashboard() {
  const cards = [
    ['Activities', 'Log movement and watch your momentum build.', SITE_ROUTES.activities, '01'],
    ['Leaderboard', 'A little friendly pressure goes a long way.', SITE_ROUTES.leaderboard, '02'],
    ['Workouts', 'Find a session that matches your energy today.', SITE_ROUTES.workouts, '03'],
  ]

  return (
    <section className="dashboard">
      <div className="dashboard-intro">
        <p className="eyebrow">Mergington / PE program</p>
        <h1>Make your <span>move.</span></h1>
        <p className="intro-copy">One place to log your activity, find your people, and keep the whole school moving forward.</p>
      </div>
      <div className="dashboard-grid">
        {cards.map(([title, description, path, number]) => (
          <Link className="feature-tile" to={path} key={path}>
            <span className="tile-number">{number}</span>
            <h2>{title}</h2>
            <p>{description}</p>
            <span className="tile-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default App
