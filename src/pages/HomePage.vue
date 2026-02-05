<template>
  <div class="page">
    <header class="header">
      <div class="title">POC Admin</div>
      <div class="sub">Map 선택 → Sensor/OA/Desk 추가/수정</div>
    </header>

    <main class="main">
      <div class="card">
        <div class="cardTitle">Maps</div>

        <div v-if="loading" class="muted">불러오는 중...</div>
        <div v-else-if="maps.length === 0" class="muted">map이 없습니다. map_info 넣어줘요.</div>

        <div class="grid">
          <button
            v-for="m in maps"
            :key="m.mapId"
            class="mapBtn"
            @click="go(m.mapId)"
          >
            <div class="mapName">{{ m.mapName }}</div>
            <div class="meta">#{{ m.mapId }} · useYn: {{ m.useYn }}</div>
          </button>
        </div>
      </div>
    </main>

    <ToastBar :message="toast" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ToastBar from '../components/ToastBar.vue'
import { listMaps } from '../api/mapApi'

const router = useRouter()

const maps = ref([])
const loading = ref(false)
const toast = ref('')

function show(msg) {
  toast.value = msg
  setTimeout(() => (toast.value = ''), 1600)
}

function go(mapId) {
  router.push(`/maps/${mapId}`)
}

onMounted(async () => {
  loading.value = true
  try {
    maps.value = await listMaps()
  } catch (e) {
    console.error(e)
    show('map 목록 불러오기 실패. 백엔드 확인 ㄱㄱ')
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page { min-height: 100vh; background: #f6f6f6; }
.header { padding: 18px 20px; background: #fff; border-bottom: 1px solid #eee; }
.title { font-size: 18px; font-weight: 900; }
.sub { margin-top: 6px; color: #666; font-size: 13px; }

.main { padding: 20px; }
.card { background:#fff; border:1px solid #eee; border-radius: 16px; padding: 16px; }
.cardTitle { font-weight: 900; margin-bottom: 12px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }

.mapBtn {
  border:1px solid #eee; border-radius: 14px; padding: 14px; background:#fff;
  text-align:left; cursor:pointer;
}
.mapBtn:hover { border-color: #111; }
.mapName { font-weight: 900; }
.meta { margin-top: 6px; color:#666; font-size: 12px; }
.muted { color:#888; font-size: 13px; }
</style>
