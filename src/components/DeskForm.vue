<template>
  <div class="form">
    <div class="formTitle">{{ isEdit ? 'Desk 수정' : 'Desk 추가' }}</div>

    <label>Desk명</label>
    <input v-model="form.deskName" placeholder="예: Desk-01" />

    <label>연결 Sensor ID</label>
    <input v-model.number="form.sensorId" type="number" placeholder="예: 1" />

    <label>Polygon points(JSON)</label>
    <textarea v-model="form.pointsJson" rows="8" />

    <div class="hint">
      예시: [{"x":10,"y":10},{"x":60,"y":10},{"x":60,"y":40},{"x":10,"y":40}]
    </div>

    <button class="btn" @click="save">{{ isEdit ? '수정 저장' : '추가 저장' }}</button>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import { createDesk, updateDesk } from '../api/deskApi'

const props = defineProps({
  mapId: { type: Number, required: true },
  item: { type: Object, default: null },
})
const emit = defineEmits(['saved'])

const isEdit = computed(() => !!props.item)
const form = reactive({ deskName: '', sensorId: null, pointsJson: '[]' })

watch(() => props.item, (v) => {
  if (!v) {
    form.deskName = ''
    form.sensorId = null
    form.pointsJson = '[]'
    return
  }
  form.deskName = v.deskName || ''
  form.sensorId = v.sensorId ?? null
  const pts = v.polygon?.points || []
  form.pointsJson = JSON.stringify(pts)
}, { immediate: true })

async function save() {
  if (form.sensorId == null) throw new Error('sensorId 필수')

  let points
  try {
    points = JSON.parse(form.pointsJson)
  } catch {
    throw new Error('points JSON 파싱 실패')
  }
  if (!Array.isArray(points) || points.length < 3) throw new Error('points는 최소 3개')

  if (isEdit.value) {
    await updateDesk(props.item.deskId, {
      deskName: form.deskName,
      sensorId: form.sensorId,
      points,
    })
  } else {
    await createDesk({
      mapId: props.mapId,
      deskName: form.deskName,
      sensorId: form.sensorId,
      points,
    })
  }
  emit('saved')
}
</script>

<style scoped>
.form { display:flex; flex-direction:column; gap:8px; }
.formTitle { font-weight: 900; margin-bottom: 6px; }
label { font-size: 12px; color:#666; }
input, textarea {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  outline: none;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
.hint { font-size: 12px; color:#666; line-height: 1.4; }
.btn { margin-top: 8px; padding: 10px 12px; border: 1px solid #111; background: #111; color:#fff; border-radius: 12px; cursor:pointer; }
</style>
