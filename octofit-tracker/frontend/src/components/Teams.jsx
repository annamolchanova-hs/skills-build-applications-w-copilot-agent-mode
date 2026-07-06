import { useEffect, useState } from 'react'
import { fetchResource, normalizeItems } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadTeams = async () => {
      try {
        setLoading(true)
        const payload = await fetchResource('teams')
        if (isMounted) {
          setTeams(normalizeItems(payload))
          setError('')
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load teams right now.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadTeams()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 mb-1">Teams</h2>
            <p className="text-muted mb-0">Coordinate squads and shared goals.</p>
          </div>
          <span className="badge bg-secondary-subtle text-secondary-emphasis">{teams.length} teams</span>
        </div>

        {loading && <div className="text-muted">Loading teams…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && teams.length === 0 && (
          <div className="alert alert-info">No teams are available yet.</div>
        )}

        <div className="list-group">
          {teams.map((team, index) => (
            <div key={team._id || `${team.name}-${index}`} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <h3 className="h6 mb-1">{team.name}</h3>
                  <p className="mb-1 text-muted">Goal: {team.goal}</p>
                  <small className="text-muted">Members: {team.members?.length || 0}</small>
                </div>
                <span className="badge bg-success-subtle text-success-emphasis">{team.members?.join(', ') || 'No members'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Teams
