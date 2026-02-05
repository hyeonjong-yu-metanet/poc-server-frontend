<template>
  <div class="section">
    <div class="sectionHeader">
      <div class="sectionTitle">{{ title }}</div>
      <button class="addBtn" @click="startCreate">+ 추가</button>
    </div>

    <div class="body">
      <div class="left">
        <EntityList
          :items="items"
          :selected="selected"
          :kind="kind"
          @select="selectItem"
        />
      </div>

      <div class="right">
        <div v-if="mode === 'none'" class="empty">
          항목 선택하거나 “추가” 누르셈 ✍️
        </div>

        <div v-else class="card">
          <component
            :is="formComponent"
            :mapId="mapId"
            :item="mode === 'edit' ? selected : null"
            @saved="onSaved"
          />
          <button v-if="mode === 'edit'" class="mini" @click="startCreate">새로 추가 모드로</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import EntityList from './EntityList.vue'
import SensorForm from './SensorForm.vue'
import OaForm from './OaForm.vue'
import DeskForm from './DeskForm.vue'

const props = defineProps({
  title: String,
  kind: String, // sensor | oa | desk
  mapId: Number,
  items: Array,
})

const emit = defineEmits(['refresh'])

const selected = ref(null)
const mode = ref('none') // none | edit | create

const formComponent = computed(() => {
  if (props.kind === 'sensor') return SensorForm
  if (props.kind === 'oa') return OaForm
  return DeskForm
})

function selectItem(it) {
  selected.value = it
  mode.value = 'edit'
}

function startCreate() {
  selected.value = null
  mode.value = 'create'
}

async function onSaved() {
  await emit('refresh')
  mode.value = 'none'
}
</script>

<style scoped>
.section { background:#fff; border:1px solid #eee; border-radius: 18px; padding: 14px; }
.sectionHeader { display:flex; align-items:center; justify-content:space-between; margin-bottom: 12px; }
.sectionTitle { font-size: 16px; font-weight: 900; }
.addBtn {
  padding: 8px 10px; border:1px solid #ddd; background:#fafafa;
  border-radius: 12px; cursor:pointer;
}
.addBtn:hover { border-color:#111; }

.body { display:grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.empty {
  border: 1px dashed #ddd;
  border-radius: 16px;
  padding: 14px;
  color: #777;
  background: #fafafa;
}
.card { border: 1px solid #eee; border-radius: 16px; padding: 14px; }
.mini { margin-top: 10px; padding: 8px 10px; border: 1px solid #ddd; background: #fff; border-radius: 12px; cursor:pointer; }
</style>
