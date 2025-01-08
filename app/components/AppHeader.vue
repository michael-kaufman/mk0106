<template>
  <header
    :class="[
      'bg-blue-600 shadow-sm',
      $attrs.class
    ]"
  >
    <nav class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-semibold text-white">Tool Rental System</h1>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AppHeader'
})

</script> 