<template>
  <div class="overflow-hidden border border-pink-100 bg-white rounded-xl group">
    <div class="p-5 flex flex-col sm:flex-row gap-4">
      <div
        class="w-full sm:w-24 h-24 bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg flex items-center justify-center"
      >
        <img
          v-if="image"
          :src="image"
          :alt="name"
          class="object-cover w-full h-full rounded-lg"
        />
        <ShoppingBag v-else class="h-10 w-10 text-rose-300" />
      </div>

      <div class="flex-1">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-serif text-lg text-gray-800">{{ name }}</h3>
          <div class="text-rose-600 font-medium">${{ price.toFixed(2) }}</div>
        </div>

        <div class="flex flex-wrap gap-2 mb-2">
          <div
            class="flex items-center bg-gradient-to-r from-pink-50 to-rose-50 rounded-full px-3 py-1"
          >
            <span class="text-gray-700 text-sm">Cantidad</span>
            <div
              class="ml-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
            >
              {{ quantity }}
            </div>
          </div>

          <div
            v-if="isCustomizable"
            class="flex items-center bg-gradient-to-r from-pink-50 to-rose-50 rounded-full px-3 py-1"
          >
            <span class="text-gray-700 text-sm">Personalizado</span>
          </div>
        </div>

        <div class="text-sm text-gray-500">ID: {{ id.substring(0, 8) }}...</div>

        <div class="text-sm text-gray-500 mt-2">
          Subtotal:
          <span class="text-rose-600">${{ (price * quantity).toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ShoppingBag } from 'lucide-vue-next'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: [String, null],
    default: null,
  },
  stock: {
    type: Number,
    required: true,
  },
  isCustomizable: {
    type: Boolean,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
})
</script>
