import { http } from './http'

export async function listOas(mapId) {
  const res = await http.get('/api/oas', { params: { mapId } })
  return res.data
}

export async function createOa(payload) {
  const res = await http.post('/api/oas', payload)
  return res.data
}

export async function updateOa(oaId, payload) {
  const res = await http.put(`/api/oas/${oaId}/point`, payload)
  return res.data
}