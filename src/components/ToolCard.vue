<template>
  <a-card
    class="tech-card cursor-pointer border-0"
    :bordered="true"
    @click="$emit('click')"
  >
    <div class="flex items-center space-x-4">
      <div class="icon-glow">
        <span class="text-xl font-medium">{{ icon }}</span>
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold mb-1">{{ title }}</h3>
        <p class="muted text-sm leading-relaxed">{{ description }}</p>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: string
}>()

defineEmits(['click'])
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 20px;
}
</style>