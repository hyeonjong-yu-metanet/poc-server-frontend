<template>
  <div class="form">
    <div class="formTitle">{{ isEdit ? '센서 수정' : '센서 추가' }}</div>

    <label>센서명</label>
    <input v-model="form.sensorName" placeholder="예: S1" />

    <label>X</label>
    <input v-model.number="form.x" type="number" placeholder="예: 50" />

    <label>Y</label>
    <input v-model.number="form.y" type="number" placeholder="예: 80" />

    <button class="btn" @click="save">{{ isEdit ? '수정 저장' : '추가 저장' }}</button>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import { createSensor, updateSensor } from '../api/sensorApi'

const props = defineProps({
  mapId: { type: Number, required: true },
  item: { type: Object, default: null },
})
const emit = defineEmits(['saved'])

const isEdit = computed(() => !!props.item)
const form = reactive({ sensorName: '', x: null, y: null })

watch(() => props.item, (v) => {
  if (!v) {
    form.sensorName = ''
    form.x = null
    form.y = null
    return
  }
  form.sensorName = v.sensorName || ''
  form.x = v.point?.x ?? null
  form.y = v.point?.y ?? null
}, { immediate: true })

async function save() {
  if (form.x == null || form.y == null) throw new Error('좌표 필수')

  if (isEdit.value) {
    await updateSensor(props.item.sensorId, {
      sensorName: form.sensorName,
      x: form.x,
      y: form.y,
    })
  } else {
    await createSensor({
      mapId: props.mapId,
      sensorName: form.sensorName,
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
.btn { margin-top: 8px; padding: 10px 12px; border: 1px solid #111; background: #111; color: #fff; border-radius: 12px; cursor:pointer; }
</style>
