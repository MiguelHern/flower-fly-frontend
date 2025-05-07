<script setup>
import { defineProps, computed } from 'vue'
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-vue-next'

const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
  size: {
    type: String,
    default: 'default',
  },
})

const iconComponent = computed(() => {
  switch (props.type) {
    case 'success':
      return CheckCircle
    case 'error':
      return XCircle
    case 'info':
      return Info
    case 'warning':
      return AlertCircle
    default:
      return Info
  }
})

const typeClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-100 text-pink-800 border border-pink-100'
    case 'error':
      return 'bg-red-100 text-red-800 border border-red-300'
    case 'info':
      return 'bg-blue-100 text-blue-800 border border-blue-300'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-300'
    default:
      return 'bg-white text-gray-800 border border-gray-300'
  }
})
</script>

<template>
  <div
    :class="[
      'fixed bottom-6 right-6 p-4 rounded-md flex items-center gap-3 animate-fadeIn bg-white text-gray-800 border border-pink-200 animate-fadeIn z-10',
      {
        'h-9 px-4 py-2': size === 'default',
        'h-7 rounded-md px-3': size === 'sm',
        'h-10 rounded-md px-8': size === 'lg',
      },
      typeClasses,
    ]"
  >
    <slot name="icon">
      <component :is="iconComponent" class="h-5 w-5" />
    </slot>
    <slot />
  </div>
</template>
