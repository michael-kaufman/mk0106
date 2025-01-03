<template>
  <Listbox v-model="props.modelValue">
    <ListboxLabel v-if="props.label" class="block text-sm font-medium text-gray-700">{{ props.label }}</ListboxLabel>
    <div class="relative mt-1">
      <!-- ... ListboxButton stays the same ... -->
      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <SelectOption
            v-for="option in props.options"
            :key="option.value"
            :option="option"
          />
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template> 

<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import SelectOption from '~/components/ui/SelectOption.vue'

const props = defineProps<{
  modelValue: string
  options: Array<{ value: string; label: string }>
  label?: string
  error?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<script lang="ts">
export default {
  name: 'Select'
}
</script>

