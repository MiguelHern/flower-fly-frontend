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
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        {
            'bg-black text-white hover:bg-black/80 text-primary-foreground shadow': variant === 'default',
            'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90': variant === 'destructive',
            'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80': variant === 'secondary',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'bg-black text-white hover:bg-black/80': variant === 'black',
            'h-9 px-4 py-2': size === 'default',
            'h-7 rounded-md px-3': size === 'sm',
            'h-10 rounded-md px-8': size === 'lg'
        }
    ]">
        <slot />
    </button>
</template>
