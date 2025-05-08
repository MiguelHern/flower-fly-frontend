<script setup>
import { defineProps } from 'vue'

defineProps({
  variant: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'default'
  }
})
</script>

<template>
  <button :class="[
        // Base
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow',

        // Size
        {
            'h-9 px-4 py-2': size === 'default',
            'h-7 rounded-md px-3': size === 'sm',
            'h-10 rounded-md px-8': size === 'lg'
        },

        // Variant
        {
            'bg-rose-500 hover:bg-rose-600 text-white': variant === 'default',
            'bg-red-500 hover:bg-red-600 text-white': variant === 'destructive',
            'border border-gray-300 bg-white hover:bg-gray-100 text-gray-900': variant === 'outline',
            'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
            'bg-transparent text-gray-900 hover:bg-gray-100': variant === 'ghost',
            'bg-black text-white hover:bg-black/80': variant === 'black',
            'bg-white px-5 py-2 text-sm text-gray-700 shadow-sm transition-all hover:bg-gray-50': variant === 'white',
            'bg-rose-50 px-5 py-2 text-sm text-rose-600 shadow-sm transition-all hover:bg-rose-100': variant === 'secondary',
        }
    ]">
    <slot />
  </button>
</template>
