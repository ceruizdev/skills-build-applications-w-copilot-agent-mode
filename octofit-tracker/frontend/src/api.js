const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const API_BASE_URL = `${apiOrigin}/api`
export const API_ENDPOINTS = Object.freeze({
  users: `${API_BASE_URL}/users`,
  teams: `${API_BASE_URL}/teams`,
  activities: `${API_BASE_URL}/activities`,
  leaderboard: `${API_BASE_URL}/leaderboard`,
  workouts: `${API_BASE_URL}/workouts`,
  visits: `${API_BASE_URL}/visits`,
})

export function asCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export async function fetchCollection(endpoint) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  return asCollection(await response.json())
}

export async function registerVisit() {
  const response = await fetch(API_ENDPOINTS.visits, { method: 'POST' })
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  return response.json()
}

export function displayName(user) {
  return user?.displayName || user?.username || 'Unknown athlete'
}

export function recordId(record) {
  return record?._id || record?.id
}