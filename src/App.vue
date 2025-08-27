<template>
  <a-config-provider :theme="theme">
    <div class="app-root">
      <header class="app-header">
        <h1 class="app-title" @click="backToHome">
          🚀 Tech Tools
        </h1>

        <div class="muted text-sm">
          {{ currentTool ? '工具模式' : '科技感小工具集合' }}
        </div>

        <a-button v-if="currentTool" type="primary" @click="backToHome" class="shadow-md">
          <template #icon>
            <HomeOutlined />
          </template>
          返回首页
        </a-button>
      </header>
      
  <main class="p-6">
        <div v-if="!currentTool" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <ToolCard
            v-for="tool in tools"
            :key="tool.id"
            :title="tool.title"
            :description="tool.description"
            :icon="tool.icon"
            @click="openTool(tool.id as any)"
          />
        </div>
        
  <div v-else class="max-w-6xl mx-auto">
          <component :is="currentTool" />
        </div>
      </main>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import ToolCard from '@/components/ToolCard.vue'
import { getAllTools, getToolById } from '@/utils/toolManager'
import type { ToolId } from '@/types'
import { HomeOutlined } from '@ant-design/icons-vue'

const currentTool = shallowRef<any>(null)
const tools = ref(getAllTools())

const theme = {
  token: {
    colorPrimary: '#6366f1',
    colorBgBase: '#ffffff',
    colorTextBase: '#1f2937',
    colorBorder: '#e5e7eb',
    borderRadius: 12,
    fontSize: 14,
    wireframe: false,
  },
  components: {
    Card: {
      colorBgContainer: '#ffffff',
      colorBorderSecondary: '#f3f4f6',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      boxShadowTertiary: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    Button: {
      colorPrimary: '#6366f1',
      colorPrimaryHover: '#4f46e5',
      colorPrimaryActive: '#4338ca',
    }
  }
}

const openTool = async (toolId: ToolId) => {
  const tool = getToolById(toolId)
  if (tool) {
    const component = await tool.component()
    currentTool.value = component.default || component
  }
}

const backToHome = () => {
  currentTool.value = null
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
</style>