<template>
  <button
    :class="[
      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
      '',
      selected
        ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90'
        : 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
})
</script>
