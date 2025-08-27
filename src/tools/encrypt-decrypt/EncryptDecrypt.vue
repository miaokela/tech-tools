<template>
  <div class="p-6">
    <a-card title="加解密工具" class="tech-card">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 加密区域 -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-white">加密</h3>
          
          <a-select v-model:value="encryptAlgorithm" class="w-full" placeholder="选择加密算法">
            <a-select-option value="base64">Base64</a-select-option>
            <a-select-option value="md5">MD5</a-select-option>
            <a-select-option value="sha256">SHA-256</a-select-option>
            <a-select-option value="aes">AES</a-select-option>
          </a-select>

          <a-textarea
            v-model:value="encryptInput"
            placeholder="输入要加密的文本..."
            :rows="4"
            class="font-mono"
          />

          <div v-if="encryptAlgorithm === 'aes'" class="space-y-2">
            <a-input v-model:value="aesKey" placeholder="AES密钥（可选）" />
            <a-input v-model:value="aesIv" placeholder="AES IV（可选）" />
          </div>

          <a-button type="primary" :disabled="!encryptInput" @click="encryptText">
            加密
          </a-button>

          <a-textarea
            v-model:value="encryptOutput"
            placeholder="加密结果将显示在这里..."
            :rows="4"
            readonly
            class="font-mono"
          />
        </div>

        <!-- 解密区域 -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-white">解密</h3>
          
          <a-select v-model:value="decryptAlgorithm" class="w-full" placeholder="选择解密算法">
            <a-select-option value="base64">Base64</a-select-option>
            <a-select-option value="aes">AES</a-select-option>
          </a-select>

          <a-textarea
            v-model:value="decryptInput"
            placeholder="输入要解密的文本..."
            :rows="4"
            class="font-mono"
          />

          <div v-if="decryptAlgorithm === 'aes'" class="space-y-2">
            <a-input v-model:value="decryptAesKey" placeholder="AES密钥" />
            <a-input v-model:value="decryptAesIv" placeholder="AES IV" />
          </div>

          <a-button type="primary" :disabled="!decryptInput" @click="decryptText">
            解密
          </a-button>

          <a-textarea
            v-model:value="decryptOutput"
            placeholder="解密结果将显示在这里..."
            :rows="4"
            readonly
            class="font-mono"
          />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CryptoJS from 'crypto-js'

const encryptAlgorithm = ref('base64')
const decryptAlgorithm = ref('base64')
const encryptInput = ref('')
const encryptOutput = ref('')
const decryptInput = ref('')
const decryptOutput = ref('')
const aesKey = ref('')
const aesIv = ref('')
const decryptAesKey = ref('')
const decryptAesIv = ref('')

const encryptText = () => {
  try {
    let result = ''
    
    switch (encryptAlgorithm.value) {
      case 'base64':
        result = btoa(unescape(encodeURIComponent(encryptInput.value)))
        break
      case 'md5':
        result = CryptoJS.MD5(encryptInput.value).toString()
        break
      case 'sha256':
        result = CryptoJS.SHA256(encryptInput.value).toString()
        break
      case 'aes':
        if (!aesKey.value) {
          result = '请提供AES密钥'
          break
        }
        const key = CryptoJS.enc.Utf8.parse(aesKey.value.padEnd(16, '0').substring(0, 16))
        const iv = aesIv.value ? CryptoJS.enc.Utf8.parse(aesIv.value.padEnd(16, '0').substring(0, 16)) : undefined
        const encrypted = iv 
          ? CryptoJS.AES.encrypt(encryptInput.value, key, { iv })
          : CryptoJS.AES.encrypt(encryptInput.value, key)
        result = encrypted.toString()
        break
      default:
        result = '不支持的算法'
    }
    
    encryptOutput.value = result
  } catch (error) {
    encryptOutput.value = `加密失败: ${error instanceof Error ? error.message : '未知错误'}`
  }
}

const decryptText = () => {
  try {
    let result = ''
    
    switch (decryptAlgorithm.value) {
      case 'base64':
        result = decodeURIComponent(escape(atob(decryptInput.value)))
        break
      case 'aes':
        if (!decryptAesKey.value) {
          result = '请提供AES密钥'
          break
        }
        const key = CryptoJS.enc.Utf8.parse(decryptAesKey.value.padEnd(16, '0').substring(0, 16))
        const iv = decryptAesIv.value ? CryptoJS.enc.Utf8.parse(decryptAesIv.value.padEnd(16, '0').substring(0, 16)) : undefined
        const decrypted = iv
          ? CryptoJS.AES.decrypt(decryptInput.value, key, { iv })
          : CryptoJS.AES.decrypt(decryptInput.value, key)
        result = decrypted.toString(CryptoJS.enc.Utf8)
        break
      default:
        result = '不支持的算法'
    }
    
    decryptOutput.value = result
  } catch (error) {
    decryptOutput.value = `解密失败: ${error instanceof Error ? error.message : '未知错误'}`
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