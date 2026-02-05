import { http } from './http'

export async function listDesks(mapId) {
  const res = await http.get('/api/desks', { params: { mapId } })
  return res.data
}

export async function createDesk(payload) {
  const res = await http.post('/api/desks', payload)
  return res.data
}

export async function updateDesk(deskId, payload) {
  const res = await http.put(`/api/desks/${deskId}`, payload)
  return res.data
}
