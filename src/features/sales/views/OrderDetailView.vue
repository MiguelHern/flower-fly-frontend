<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <div class="flex w-full justify-between items-center mb-6">
      <ButtonBase @click="() => router.push({ name: 'orders-user' })" class="" variant="outline">
        <ArrowLeft class="h-4 w-4 mr-2" />
        Volver
      </ButtonBase>
      <h1 class="text-2xl font-serif text-gray-800">Detalles del Pedido</h1>
      <div></div>
    </div>

    <div class="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 mb-8 shadow-sm">
      <div class="flex items-center mb-4">
        <Package class="h-6 w-6 text-rose-500 mr-3" />
        <h2 class="text-xl font-medium text-gray-800">Resumen del Pedido</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p class="text-sm text-gray-500 mb-1">Número de Pedido</p>
          <p class="font-medium text-gray-800">ORD-{{ orderNumber }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-1">Fecha</p>
          <p class="font-medium text-gray-800">{{ orderDate }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-1">Estado</p>
          <div
            class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-rose-100 text-rose-600 hover:bg-rose-200"
          >
            Completado
          </div>
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-1">Total de Artículos</p>
          <p class="font-medium text-gray-800">{{ orders.length }} artículos</p>
        </div>
      </div>
    </div>

    <h2 class="text-xl font-medium text-gray-800 mb-4">Artículos del Pedido</h2>

    <div v-if="loading" class="flex justify-center items-center h-40">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rose-500"></div>
    </div>

    <div v-else class="space-y-4">
      <ProductCard
        v-for="product in orders"
        :key="product.id"
        :id="product.id"
        :name="product.name"
        :price="product.price"
        :image="product.image"
        :stock="product.stock"
        :is-customizable="product.isCustomizable"
        :quantity="product.quantity"
      />
    </div>

    <div class="mt-8 bg-white rounded-xl border border-pink-100 p-6 shadow-sm">
      <h3 class="text-lg font-medium text-gray-800 mb-4">Resumen de Costos</h3>

      <div class="space-y-2 mb-4">
        <div class="flex justify-between">
          <span class="text-gray-600">Subtotal</span>
          <span class="font-medium">${{ calculateTotal().toFixed(2) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Envío</span>
          <span class="font-medium">$0.00</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Impuestos</span>
          <span class="font-medium">$0.00</span>
        </div>
      </div>

      <div class="my-4 h-px bg-gray-200"></div>

      <div class="flex justify-between items-center">
        <span class="text-lg font-medium text-gray-800">Total</span>
        <span class="text-xl font-bold text-rose-600">${{ calculateTotal().toFixed(2) }}</span>
      </div>
    </div>

    <div class="mt-8 flex justify-center">
      <button
        class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow bg-rose-500 hover:bg-rose-600 text-white h-9 px-4 py-2"
      >
        <Package class="h-4 w-4 mr-2" />
        Ver Estado del Envío
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Package, ArrowLeft } from 'lucide-vue-next'
import ProductCard from '../components/CardDetailOrder.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
const orderNumber = ref(
  Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0'),
)
const orderDate = ref(new Date().toLocaleDateString())
import router from '@/router'
import { useRoute } from 'vue-router'
import { ordersQueries } from '@/api/orders/ordersQueries.js'

const orders = ref([])
const loading = ref(true)
const error = ref(false)

const route = useRoute()
const orderId = route.params.id

const fetchOrderDetail = async () => {
  try {
    loading.value = true
    error.value = false

    const response = await ordersQueries.getOrderById(orderId)

    if (response) {
      // Asegurarse de que los items sean un array válido
      const items = Array.isArray(response) ? response : response.items || []

      orders.value = items.map((item) => ({
        ...item,
        price: parseFloat(item.price || '0'),
        isCustomizable: item.isCustomizable ?? false,
        quantity: item.quantity ?? 1,
      }))
    }
  } catch (err) {
    console.error('Error fetching order details:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  fetchOrderDetail()
})

const calculateTotal = () => {
  return orders.value.reduce((total, product) => total + product.price * product.quantity, 0)
}
</script>
