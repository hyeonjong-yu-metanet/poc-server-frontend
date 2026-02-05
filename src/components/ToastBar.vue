<template>
  <div v-if="message" class="toast">{{ message }}</div>
</template>

<script setup>
defineProps({ message: { type: String, default: '' } })
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  background: rgba(20, 20, 20, 0.92);
  color: white;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 13px;
  z-index: 9999;
}
</style>
