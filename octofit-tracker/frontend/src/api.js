const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function asCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export async function fetchCollection(endpoint) {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`)
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  return asCollection(await response.json())
}

export async function registerVisit() {
  const response = await fetch(`${API_BASE_URL}/visits`, { method: 'POST' })
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  return response.json()
}

export function displayName(user) {
  return user?.displayName || user?.username || 'Unknown athlete'
}

export function recordId(record) {
  return record?._id || record?.id
}