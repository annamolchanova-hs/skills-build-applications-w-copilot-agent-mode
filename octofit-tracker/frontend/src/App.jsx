import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function Home() {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h2 className="h4 mb-3">Welcome to OctoFit Tracker</h2>
        <p className="text-muted mb-4">
          Explore users, teams, workouts, and progress through the React 19 presentation tier.
        </p>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="border rounded p-3 h-100">
              <h3 className="h6">Live API integration</h3>
              <p className="small text-muted mb-0">Each section loads data from the backend through environment-aware API URLs.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="border rounded p-3 h-100">
              <h3 className="h6">Codespaces ready</h3>
              <p className="small text-muted mb-0">Set VITE_CODESPACE_NAME in .env.local to enable the hosted API endpoint.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiBaseLabel = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://127.0.0.1:8000/api'

  return (
    <main className="container py-5">
      <div className="row g-4">
        <aside className="col-lg-3">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h1 className="h3 fw-bold mb-2">OctoFit Tracker</h1>
              <p className="text-muted mb-4">A modern multi-tier fitness tracking experience.</p>
              <nav className="d-grid gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `btn text-start ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-4 small text-muted">
                <p className="fw-semibold mb-1">API target</p>
                <p className="mb-2">{apiBaseLabel}</p>
                {!codespaceName && (
                  <p className="mb-0">Define VITE_CODESPACE_NAME in .env.local for Codespaces URLs.</p>
                )}
              </div>
            </div>
          </div>
        </aside>

        <section className="col-lg-9">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </section>
      </div>
    </main>
  )
}

export default App
