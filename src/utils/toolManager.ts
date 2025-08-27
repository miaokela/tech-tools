import { Tool, ToolId } from '@/types'

export const tools: Record<ToolId, Tool> = {
  'json-fixer': {
    id: 'json-fixer',
    title: 'JSON修复器',
    description: '修复JSON文件中的None、True、False、单引号等问题',
    icon: '📝',
    component: () => import('@/tools/json-fixer/JsonFixer.vue')
  },
  'picture-converter': {
    id: 'picture-converter',
    title: '图片转换器',
    description: '批量转换图片格式，支持PNG、JPG、ICNS等格式',
    icon: '🖼️',
    component: () => import('@/tools/picture-converter/PictureConverter.vue')
  },
  'encrypt-decrypt': {
    id: 'encrypt-decrypt',
    title: '加解密工具',
    description: '支持常见的加密解密算法',
    icon: '🔒',
    component: () => import('@/tools/encrypt-decrypt/EncryptDecrypt.vue')
  }
}

export const getToolById = (id: ToolId): Tool | undefined => {
  return tools[id]
}

export const getAllTools = (): Tool[] => {
  return Object.values(tools)
}