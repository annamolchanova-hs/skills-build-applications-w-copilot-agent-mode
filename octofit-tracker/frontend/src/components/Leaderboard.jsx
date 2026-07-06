import { useEffect, useState } from 'react'
import { fetchResource, normalizeItems } from '../api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadLeaderboard = async () => {
      try {
        setLoading(true)
        const payload = await fetchResource('leaderboard')
        if (isMounted) {
          setEntries(normalizeItems(payload))
          setError('')
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load leaderboard data right now.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadLeaderboard()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 mb-1">Leaderboard</h2>
            <p className="text-muted mb-0">See who is leading the challenge.</p>
          </div>
          <span className="badge bg-warning-subtle text-warning-emphasis">{entries.length} entries</span>
        </div>

        {loading && <div className="text-muted">Loading leaderboard…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && entries.length === 0 && (
          <div className="alert alert-info">No leaderboard entries are available yet.</div>
        )}

        <div className="list-group">
          {entries.map((entry, index) => (
            <div key={entry._id || `${entry.user}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h3 className="h6 mb-1">#{index + 1} {entry.user}</h3>
                <small className="text-muted">Streak: {entry.streak} days</small>
              </div>
              <span className="badge bg-info-subtle text-info-emphasis">Score {entry.score}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Leaderboard
