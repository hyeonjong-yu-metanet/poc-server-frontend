<template>
  <div class="list">
    <button
      v-for="it in items"
      :key="getKey(it)"
      class="row"
      :class="{ active: isActive(it) }"
      @click="$emit('select', it)"
    >
      <div class="top">
        <b>{{ getTitle(it) }}</b>
        <span class="id">#{{ getId(it) }}</span>
      </div>

      <div class="bottom">
        <span v-if="it.point">({{ it.point.x }}, {{ it.point.y }})</span>
        <span v-else-if="it.polygon?.points?.length">points: {{ it.polygon.points.length }}</span>
        <span v-else class="muted">좌표 없음</span>
      </div>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, required: true },
  selected: { type: Object, default: null },
  kind: { type: String, required: true }, // sensor | oa | desk
})

function getId(it) {
  if (props.kind === 'sensor') return it.sensorId
  if (props.kind === 'oa') return it.oaId
  return it.deskId
}
function getTitle(it) {
  if (props.kind === 'sensor') return it.sensorName || `Sensor ${it.sensorId}`
  if (props.kind === 'oa') return it.oaName || `OA ${it.oaId}`
  return it.deskName || `Desk ${it.deskId}`
}
function getKey(it) {
  return `${props.kind}-${getId(it)}`
}
function isActive(it) {
  if (!props.selected) return false
  return getId(props.selected) === getId(it)
}
</script>

<style scoped>
.list { display: flex; flex-direction: column; gap: 10px; }
.row {
  border: 1px solid #eee; background: #fff; border-radius: 14px;
  padding: 10px 12px; text-align:left; cursor:pointer;
}
.row.active { border-color: #111; }
.top { display:flex; justify-content:space-between; align-items:center; }
.id { color:#666; font-size: 12px; }
.bottom { margin-top: 6px; color:#333; font-size: 13px; }
.muted { color:#999; }
</style>
