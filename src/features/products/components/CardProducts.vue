<script setup>
import { RouterLink } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'

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
  },
  price: {
    type: Number,
    required: true
  },
  previousPrice: {
    type: Number,
    default: null
  },
  buttonText: {
    type: String,
    default: 'Ver más'
  }
})
</script>

<template>
  <RouterLink :to="link"  class="group bg-stone-100 rounded-4xl overflow-hidden p-4 cursor-default">
    <div class="overflow-hidden mb-4">
      <img :src="imageUrl" :alt="title"
        class="object-cover w-full aspect-[4/4] transition-transform duration-500 group-hover:scale-105" />
    </div>
    <div class="space-y-2">
      <h3 class="font-serif text-xl font-light">{{ title }}</h3>
      <p class="text-sm text-muted-foreground">{{ description }}</p>
      <div class="flex justify-between items-center pt-2">
        <div class="flex items-center space-x-2">
          <span class="font-light">${{ price }}</span>
          <span v-if="previousPrice" class="text-sm text-gray-500 line-through">${{ previousPrice }}</span>
          <span v-if="previousPrice" class="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
            {{ Math.round(((previousPrice - price) / previousPrice) * 100) }}% OFF
          </span>
        </div>
        <span class="text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          {{ buttonText }}
          <ChevronRight class="h-4 w-4 ml-1" />
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped></style>
