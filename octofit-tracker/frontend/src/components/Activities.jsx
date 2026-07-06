import { useEffect, useState } from 'react'
import { fetchResource, normalizeItems } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadActivities = async () => {
      try {
        setLoading(true)
        const payload = await fetchResource('activities')
        if (isMounted) {
          setActivities(normalizeItems(payload))
          setError('')
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load activities right now.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadActivities()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 mb-1">Activities</h2>
            <p className="text-muted mb-0">Track recent training sessions and calorie burn.</p>
          </div>
          <span className="badge bg-success-subtle text-success-emphasis">{activities.length} records</span>
        </div>

        {loading && <div className="text-muted">Loading activities…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && activities.length === 0 && (
          <div className="alert alert-info">No activities have been recorded yet.</div>
        )}

        <div className="list-group">
          {activities.map((activity, index) => (
            <div key={activity._id || `${activity.type}-${index}`} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <h3 className="h6 mb-1">{activity.type}</h3>
                  <p className="mb-1 text-muted">User ID: {activity.userId}</p>
                  <small className="text-muted">Duration: {activity.durationMinutes} minutes</small>
                </div>
                <span className="badge bg-primary-subtle text-primary-emphasis">{activity.calories} kcal</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Activities
