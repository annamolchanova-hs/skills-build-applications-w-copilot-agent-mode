import { useEffect, useState } from 'react'
import { fetchResource, normalizeItems } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadWorkouts = async () => {
      try {
        setLoading(true)
        const payload = await fetchResource('workouts')
        if (isMounted) {
          setWorkouts(normalizeItems(payload))
          setError('')
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load workout suggestions right now.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadWorkouts()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 mb-1">Workouts</h2>
            <p className="text-muted mb-0">Suggested routines tailored for each goal.</p>
          </div>
          <span className="badge bg-danger-subtle text-danger-emphasis">{workouts.length} plans</span>
        </div>

        {loading && <div className="text-muted">Loading workouts…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && workouts.length === 0 && (
          <div className="alert alert-info">No workout suggestions are available yet.</div>
        )}

        <div className="list-group">
          {workouts.map((workout, index) => (
            <div key={workout._id || `${workout.title}-${index}`} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <h3 className="h6 mb-1">{workout.title}</h3>
                  <p className="mb-1 text-muted">Target: {workout.target}</p>
                  <small className="text-muted">Duration: {workout.durationMinutes} minutes</small>
                </div>
                <span className="badge bg-warning-subtle text-warning-emphasis">{workout.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Workouts
