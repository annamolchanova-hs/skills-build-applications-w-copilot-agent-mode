const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }

  return 'http://127.0.0.1:8000/api'
}

export const getApiUrl = (resource) => {
  const normalizedResource = String(resource).replace(/^\/+|\/+$/g, '')
  return `${getApiBaseUrl()}/${normalizedResource}/`
}

export const normalizeItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items
  }

  return []
}

export const fetchResource = async (resource) => {
  const response = await fetch(getApiUrl(resource))

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}
