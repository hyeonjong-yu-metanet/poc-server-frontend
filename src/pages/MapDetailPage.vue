<template>
  <div class="page">
    <header class="header">
      <button class="back" @click="goHome">←</button>
      <div>
        <div class="title">Map #{{ mapId }}</div>
        <div class="sub" v-if="mapData">{{ mapData.mapName }} · useYn: {{ mapData.useYn }}</div>
      </div>
    </header>

    <main class="main">
      <div class="grid">
        <EntitySection
          title="Sensors"
          kind="sensor"
          :mapId="mapIdNum"
          :items="sensors"
          @refresh="refreshAll"
        />
        <EntitySection
          title="OAs"
          kind="oa"
          :mapId="mapIdNum"
          :items="oas"
          @refresh="refreshAll"
        />
        <EntitySection
          title="Desks"
          kind="desk"
          :mapId="mapIdNum"
          :items="desks"
          @refresh="refreshAll"
        />
      </div>
    </main>

    <ToastBar :message="toast" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import EntitySection from '../components/EntitySection.vue'
import ToastBar from '../components/ToastBar.vue'

import { getMap } from '../api/mapApi'
import { listSensors } from '../api/sensorApi'
import { listOas } from '../api/oaApi'
import { listDesks } from '../api/deskApi'

const props = defineProps({ mapId: String })
const router = useRouter()

const mapIdNum = computed(() => Number(props.mapId))

const mapData = ref(null)
const sensors = ref([])
const oas = ref([])
const desks = ref([])

const toast = ref('')
function show(msg) {
  toast.value = msg
  setTimeout(() => (toast.value = ''), 1600)
}

function goHome() {
  router.push('/')
}

async function refreshAll() {
  try {
    const [m, s, o, d] = await Promise.all([
      getMap(mapIdNum.value),
      listSensors(mapIdNum.value),
      listOas(mapIdNum.value),
      listDesks(mapIdNum.value),
    ])
    mapData.value = m
    sensors.value = s
    oas.value = o
    desks.value = d
    show('새로고침 완료')
  } catch (e) {
    console.error(e)
    show('불러오기 실패… 백엔드 확인 ㄱㄱ')
  }
}

onMounted(refreshAll)
</script>

<style scoped>
.page { min-height: 100vh; background:#f6f6f6; }
.header {
  display:flex; gap: 12px; align-items:center;
  padding: 14px 18px;
  background:#fff;
  border-bottom:1px solid #eee;
}
.back {
  width: 40px; height: 40px;
  border:1px solid #eee;
  border-radius: 12px;
  background:#fff;
  cursor:pointer;
}
.title { font-size: 18px; font-weight: 900; }
.sub { margin-top: 4px; font-size: 13px; color:#666; }
.main { padding: 16px; }
.grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
</style>
