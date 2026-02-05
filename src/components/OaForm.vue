<template>
  <div class="form">
    <div class="formTitle">{{ isEdit ? 'OA 수정' : 'OA 추가' }}</div>

    <label>OA명</label>
    <input v-model="form.oaName" placeholder="예: OA-1" />

    <label>연결 Sensor ID</label>
    <input v-model.number="form.sensorId" type="number" placeholder="예: 1" />

    <label>X</label>
    <input v-model.number="form.x" type="number" />

    <label>Y</label>
    <input v-model.number="form.y" type="number" />

    <button class="btn" @click="save">{{ isEdit ? '수정 저장' : '추가 저장' }}</button>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import { createOa, updateOa } from '../api/oaApi'

const props = defineProps({
  mapId: { type: Number, required: true },
  item: { type: Object, default: null },
})
const emit = defineEmits(['saved'])

const isEdit = computed(() => !!props.item)
const form = reactive({ oaName: '', sensorId: null, x: null, y: null })

watch(() => props.item, (v) => {
  if (!v) {
    form.oaName = ''
    form.sensorId = null
    form.x = null
    form.y = null
    return
  }
  form.oaName = v.oaName || ''
  form.sensorId = v.sensorId ?? null
  form.x = v.point?.x ?? null
  form.y = v.point?.y ?? null
}, { immediate: true })

async function save() {
  if (form.sensorId == null) throw new Error('sensorId 필수')
  if (form.x == null || form.y == null) throw new Error('좌표 필수')

  if (isEdit.value) {
    await updateOa(props.item.oaId, {
      oaName: form.oaName,
      sensorId: form.sensorId,
      x: form.x,
      y: form.y,
    })
  } else {
    await createOa({
      mapId: props.mapId,
      oaName: form.oaName,
      sensorId: form.sensorId,
      x: form.x,
      y: form.y,
    })
  }
  emit('saved')
}
</script>

<style scoped>
.form { display:flex; flex-direction:column; gap:8px; }
.formTitle { font-weight: 900; margin-bottom: 6px; }
label { font-size: 12px; color:#666; }
input { padding: 10px 12px; border: 1px solid #ddd; border-radius: 12px; outline: none; }
.btn { margin-top: 8px; padding: 10px 12px; border: 1px solid #111; background: #111; color:#fff; border-radius: 12px; cursor:pointer; }
</style>
