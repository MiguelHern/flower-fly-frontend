<template>
  <div class="space-y-8 pt-0 rounded-xl">

    <!-- Filtros y contenedor principal -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Columna de contenido -->
      <div class="md:col-span-4">
        <!-- Flowers grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
  v-for="item in selectedItems"
  :key="item.id"
  class="h-full flex flex-col relative group bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md border border-pink-100"
>
  <img
    v-if="item.image"
    :src="item.image"
    :alt="item.name"
    width="400"
    height="300"
    class="object-cover w-full aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
  />

  <div class="p-5 flex flex-col grow">
    <div class="flex justify-between items-center mb-3">
      <h3 class="font-serif text-xl text-gray-800">{{ item.name }}</h3>
      <div class="text-pink-600 text-sm font-medium">
        {{ '$' + item.price.toFixed(2) }}
      </div>
    </div>

    <div class="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto py-4">
      <span class="text-gray-600 text-sm">Cantidad</span>
      <div class="flex items-center space-x-4">
        <button
          class="h-8 w-8 bg-white hover:bg-pink-50 border border-gray-200 rounded-md flex items-center justify-center transition-all duration-200"
          @click="updateItemQuantity(item.id, getItemQuantity(item.id) - 1)"
          :disabled="getItemQuantity(item.id) === 0"
          :class="{ 'opacity-50 cursor-not-allowed': getItemQuantity(item.id) === 0 }"
        >
          <Minus class="h-3 w-3 text-gray-600" />
        </button>
        <span class="w-6 text-center font-medium text-gray-800">
          {{ getItemQuantity(item.id) }}
        </span>
        <button
          class="h-8 w-8 bg-white hover:bg-pink-50 border border-gray-200 rounded-md flex items-center justify-center transition-all duration-200"
          @click="updateItemQuantity(item.id, getItemQuantity(item.id) + 1)"
          :disabled="getItemQuantity(item.id) >= item.stock"
          :class="{ 'opacity-50 cursor-not-allowed': getItemQuantity(item.id) >= item.stock }"
        >
          <Plus class="h-3 w-3 text-gray-600" />
        </button>
      </div>
    </div>

    <ButtonBase
      class="w-full  py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2 border border-rose-500"
      @click="removeSelectedItem(item.id)"
      variant=""
      :disabled="getItemQuantity(item.id) === 0"
      :class="{ 'opacity-50 cursor-not-allowed': getItemQuantity(item.id) === 0 }"
    >
      <ShoppingBag class="h-4 w-4" />
      Eliminar del carrito
    </ButtonBase>
  </div>
</div>

        </div>

        <div v-if="selectedItems.length === 0" class="bg-gray-50 p-8 rounded-lg text-center">
          <SearchX class="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <h3 class="text-lg font-medium text-gray-700 mb-1">No encontramos resultados</h3>
          <p class="text-gray-500 mb-4">Agrega mas elementos a tu carrito</p>
          <button
            @click="router.push({ name: 'products' })"
            class="px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-md transition-colors"
          >
            Seleccionar productos
          </button>
        </div>

        <ToastMessage type="success" v-if="showNotification">
          <span>Agregado al carrito</span>
        </ToastMessage>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Minus, Plus, ShoppingBag, SearchX } from 'lucide-vue-next'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { useCartStore } from '@/features/cart/stores/cartStore.js'
import ToastMessage from '@/components/ui/ToastMessage.vue'
import router from '@/router/index.js'

const cartStore = useCartStore()

const showNotification = ref(false)

const selectedItems = computed(() => cartStore.selectedItems)

const getItemQuantity = cartStore.getItemQuantity;
const updateItemQuantity = cartStore.updateItemQuantity;
const removeSelectedItem = cartStore.removeSelectedItem;

</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
