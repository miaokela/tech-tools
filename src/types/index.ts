export interface Tool {
  id: string
  title: string
  description: string
  icon: string
  component: any
}

export type ToolId = 'json-fixer' | 'picture-converter' | 'encrypt-decrypt'