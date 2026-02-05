import { http } from './http'

export async function listMaps() {
  const res = await http.get('/api/maps')
  return res.data
}

export async function getMap(mapId) {
  const res = await http.get(`/api/maps/${mapId}`)
  return res.data
}
