<template>
  <div class="p-6">
    <a-card title="图片转换器" class="tech-card">
      <template #extra>
        <a-button type="primary" :disabled="!selectedFiles.length" @click="convertImages">
          开始转换
        </a-button>
      </template>

      <div class="mb-4">
        <a-upload
          v-model:file-list="fileList"
          :before-upload="beforeUpload"
          multiple
          accept="image/*"
          :show-upload-list="false"
        >
          <a-button>
            <template #icon>
              <UploadOutlined />
            </template>
            选择图片文件
          </a-button>
        </a-upload>
        
        <div class="mt-2 text-sm text-gray-400">
          支持 PNG, JPG, JPEG, WEBP, ICNS 等格式
        </div>
      </div>

      <a-select
        v-model:value="targetFormat"
        class="w-full mb-4"
        placeholder="选择目标格式"
      >
        <a-select-option value="png">PNG</a-select-option>
        <a-select-option value="jpg">JPG</a-select-option>
        <a-select-option value="jpeg">JPEG</a-select-option>
        <a-select-option value="webp">WEBP</a-select-option>
        <a-select-option value="icns">ICNS</a-select-option>
      </a-select>

      <div v-if="selectedFiles.length" class="mb-4">
        <h4 class="mb-2">已选择文件:</h4>
        <div class="space-y-2">
          <div
            v-for="file in selectedFiles"
            :key="file.name"
            class="flex items-center justify-between p-2 glass-border rounded"
          >
            <span class="muted">{{ file.name }}</span>
            <CloseOutlined class="text-red-400 cursor-pointer" @click="removeFile(file)" />
          </div>
        </div>
      </div>

      <a-progress
        v-if="converting"
        :percent="progress"
        status="active"
        class="mb-4"
      />

      <div v-if="convertedFiles.length" class="mt-4">
        <h4 class="mb-2">转换完成:</h4>
        <div class="space-y-2">
          <div
            v-for="file in convertedFiles"
            :key="file.name"
            class="flex items-center justify-between p-2 glass-border rounded"
          >
            <span class="text-green-500">{{ file.name }}</span>
            <a-button size="small" @click="downloadFile(file)">下载</a-button>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadOutlined, CloseOutlined } from '@ant-design/icons-vue'

interface FileItem {
  name: string
  file: File
}

const fileList = ref([])
const selectedFiles = ref<FileItem[]>([])
const targetFormat = ref('png')
const converting = ref(false)
const progress = ref(0)
const convertedFiles = ref<FileItem[]>([])

const beforeUpload = (file: File) => {
  selectedFiles.value.push({ name: file.name, file })
  return false
}

const removeFile = (fileToRemove: FileItem) => {
  selectedFiles.value = selectedFiles.value.filter(f => f !== fileToRemove)
}

const convertImages = async () => {
  converting.value = true
  progress.value = 0
  
  for (let i = 0; i < selectedFiles.value.length; i++) {
    const fileItem = selectedFiles.value[i]
    // 模拟转换过程
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newName = fileItem.name.split('.')[0] + '.' + targetFormat.value
    convertedFiles.value.push({
      name: newName,
      file: new File([fileItem.file], newName, { type: `image/${targetFormat.value}` })
    })
    
    progress.value = ((i + 1) / selectedFiles.value.length) * 100
  }
  
  converting.value = false
}

const downloadFile = (fileItem: FileItem) => {
  const url = URL.createObjectURL(fileItem.file)
  const a = document.createElement('a')
  a.href = url
  a.download = fileItem.name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
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