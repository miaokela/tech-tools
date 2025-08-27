<template>
  <div class="p-6">
    <a-card title="JSON修复器" class="tech-card">
      <template #extra>
        <a-button type="primary" @click="fixJson">修复JSON</a-button>
      </template>
      
      <a-textarea
        v-model:value="inputJson"
        placeholder="请输入需要修复的JSON内容..."
        :rows="10"
        class="mb-4 font-mono"
      />
      
      <a-textarea
        v-model:value="outputJson"
        placeholder="修复后的JSON将显示在这里..."
        :rows="10"
        readonly
        class="font-mono"
      />
      
      <div class="mt-4 flex items-center space-x-4">
        <a-checkbox v-model:checked="replaceNone">替换None为null</a-checkbox>
        <a-checkbox v-model:checked="replaceBool">替换True/False为true/false</a-checkbox>
        <a-checkbox v-model:checked="replaceQuotes">替换单引号为双引号</a-checkbox>
        <a-checkbox v-model:checked="removeEscapes">移除多余转义斜杠</a-checkbox>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputJson = ref('')
const outputJson = ref('')
const replaceNone = ref(true)
const replaceBool = ref(true)
const replaceQuotes = ref(true)
const removeEscapes = ref(true)

const fixJson = () => {
  try {
    let fixed = inputJson.value
    
    if (replaceNone.value) {
      fixed = fixed.replace(/\bNone\b/g, 'null')
    }
    
    if (replaceBool.value) {
      fixed = fixed.replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false')
    }
    
    if (replaceQuotes.value) {
      fixed = fixed.replace(/'([^']*)'/g, '"$1"')
    }
    
    if (removeEscapes.value) {
      fixed = fixed.replace(/\\+/g, '\\')
    }
    
    // 验证JSON格式
    JSON.parse(fixed)
    outputJson.value = JSON.stringify(JSON.parse(fixed), null, 2)
  } catch (error) {
    outputJson.value = `修复失败: ${error instanceof Error ? error.message : '未知错误'}`
  }
}
</script>

<style scoped>
:deep(.ant-card-head) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.ant-card-body) {
  padding: 20px;
}
</style>