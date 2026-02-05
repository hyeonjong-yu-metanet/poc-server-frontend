import { http } from './http'

export async function listSensors(mapId) {
  const res = await http.get('/api/sensors', { params: { mapId } })
  return res.data
}

export async function createSensor(payload) {
  const res = await http.post('/api/sensors', payload)
  return res.data
}

export async function updateSensor(sensorId, payload) {
  const res = await http.put(`/api/sensors/${sensorId}`, payload)
  return res.data
}
