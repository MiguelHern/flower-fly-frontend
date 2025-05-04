<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  link: {
    type: String,
    default: '#'
  }
})
</script>

<template>
  <RouterLink :to="link" class="group relative cursor-default overflow-hidden rounded-4xl bg-stone-100">
    <div class="overflow-hidden">
      <img :src="imageUrl" :alt="title"
        class="object-cover aspect-[3/4] w-full  transition-transform duration-500 group-hover:scale-105" />
      <div
        class="absolute inset-0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
        <h3 class="text-white font-serif text-2xl">{{ title }}</h3>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped></style>
