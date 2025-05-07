<template>
  <div
    class="relative group bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md border border-pink-100"
  >
    <img v-if="props.image"
      :src="image"
      :alt="name"
      width="400"
      height="300"
      class="object-cover w-full aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
    />

    <div class="p-5 h-full flex flex-col justify-between">
      <div class="flex justify-between items-center mb-3">
        <h3 class="font-serif text-xl text-gray-800">{{ name }}</h3>
        <div class="text-pink-600 text-sm font-medium">
          {{ '$' + price.toFixed(2) }}
        </div>
      </div>

      <!-- Diseño con badges para cantidades -->
      <div class="mb-4">
        <h4 class="text-xs uppercase tracking-wider text-gray-500 mb-2">Incluye:</h4>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(item, index) in bouquet"
            :key="index"
            class="flex items-center bg-gradient-to-r from-pink-50 to-rose-50 rounded-full px-3 py-1"
          >
            <span class="text-gray-700 text-sm">{{ item.flower.name }}</span>
            <div class="ml-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {{ item.quantity }}
            </div>
          </div>
        </div>
      </div>
      <ToastMessage type="success" v-if="savingItems">
        <span>{{ name }} Agregado al carrito</span>
      </ToastMessage>
      <Button
        @click="() => addToCart(props)"
        class="w-full mt-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2 border border-pink-200 mt-0"
        variant="outline"
      >
        <ShoppingBag class="h-4 w-4" />
        Añadir al carrito
      </Button>
      <Spinner v-if="spinner"/>
    </div>
  </div>
</template>

<script setup>
import { ShoppingBag } from 'lucide-vue-next'
import Button from '@/components/ui/ButtonBase.vue'
import { ref } from 'vue'
import Spinner from '@/components/ui/SpinnerUi.vue'
import { useCartStore } from '@/features/cart/stores/cartStore.js'
import ToastMessage from '@/components/ui/ToastMessage.vue'


let spinner = ref(false)

const cartStore = useCartStore()
let savingItems = ref(false)
const addToCart = (item) => {
  savingItems.value = true
  cartStore.addSelectedItem({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    bouquet: item.bouquet,
  })
  setTimeout(() => {
    savingItems.value = false
  }, 3000)
}

const props = defineProps({
  id: { type: [String, Number], required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  bouquet: {
    type: Array,
    default: () => []
  }
})
</script>
