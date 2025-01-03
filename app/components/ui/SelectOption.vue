<script setup lang="ts">
const props = defineProps<{
  option: {
    value: string
    label: string
  }
}>()
</script>

<template>
  <ListboxOption
    :value="props.option.value"
    v-slot="{ active, selected }"
    as="template"
  >
    <li :class="[
      active ? 'bg-blue-600 text-white' : 'text-gray-900',
      'relative cursor-default select-none py-2 pl-3 pr-9'
    ]">
      <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
        {{ props.option.label }}
      </span>
    </li>
  </ListboxOption>
</template> 