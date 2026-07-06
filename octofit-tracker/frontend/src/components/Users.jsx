import { useEffect, useState } from 'react'
import { fetchResource, normalizeItems } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadUsers = async () => {
      try {
        setLoading(true)
        const payload = await fetchResource('users')
        if (isMounted) {
          setUsers(normalizeItems(payload))
          setError('')
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load users right now.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 mb-1">Users</h2>
            <p className="text-muted mb-0">Browse the members in OctoFit Tracker.</p>
          </div>
          <span className="badge bg-info-subtle text-info-emphasis">{users.length} users</span>
        </div>

        {loading && <div className="text-muted">Loading users…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && users.length === 0 && (
          <div className="alert alert-info">No users have been added yet.</div>
        )}

        <div className="list-group">
          {users.map((user, index) => (
            <div key={user._id || `${user.email}-${index}`} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <h3 className="h6 mb-1">{user.name}</h3>
                  <p className="mb-1 text-muted">{user.email}</p>
                  <small className="text-muted">Goal: {user.fitnessGoal}</small>
                </div>
                <span className="badge bg-primary-subtle text-primary-emphasis">{user.age} years</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Users
