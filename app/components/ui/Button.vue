<script setup lang="ts">
const props = defineProps<{
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
}>()
</script>

<script lang="ts">
export default {
  name: 'Button'
}
</script>

<template>
  <button
    :type="props.type || 'button'"
    :disabled="props.disabled || props.loading"
    class="relative inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    :class="[
      props.variant === 'secondary' && 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      props.variant === 'outline' && 'border border-gray-300 bg-transparent hover:bg-gray-50',
      props.variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
      props.size === 'sm' && 'h-8 px-3 text-sm',
      props.size === 'lg' && 'h-11 px-8',
      props.size === 'md' && 'h-10 px-4'
    ]"
  >
    <span :class="{ 'opacity-0': props.loading }">
      <slot />
    </span>
    <div
      v-if="props.loading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <svg
        class="h-5 w-5 animate-spin text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </div>
  </button>
</template> 