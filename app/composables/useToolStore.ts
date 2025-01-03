import type { FormData } from '~/types/rental'

export const useToolStore = () => {
  return useState<FormData>('tools', () => ({
    tools: []
  }))
} 