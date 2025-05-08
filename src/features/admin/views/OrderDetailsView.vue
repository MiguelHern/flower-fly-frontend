<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Encabezado con botón de regreso -->
    <div class="flex items-center mb-6">
      <router-link
        :to="{ name: 'orders' }"
        class="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft class="h-5 w-5 mr-1" />
        <span>Volver a órdenes</span>
      </router-link>
    </div>

    <!-- Contenido principal -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
      <!-- Encabezado de la orden -->
      <div class="p-6 border-b border-gray-200">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Orden #{{ order.id }}</h1>
            <div class="flex items-center gap-2 mt-2">
              <span
                class="px-2.5 py-1 text-sm rounded-full flex items-center gap-1.5"
                :class="statusColors[order.status]?.badge || 'bg-gray-100 text-gray-600'"
              >
                <component :is="statusIcons[order.status] || Package" class="h-4 w-4" />
                {{ statusText[order.status] || 'Estado desconocido' }}
              </span>
              <span class="text-gray-500">•</span>
              <span class="text-gray-500">{{ formatDate(order.purchaseDate) }}</span>
            </div>
          </div>
          <div class="mt-4 md:mt-0">
            <span class="text-lg text-gray-600">Total:</span>
            <span class="text-2xl font-bold text-gray-900 ml-2"
              >${{ formatPrice(order.total) }}</span
            >
          </div>
        </div>
      </div>

      <!-- Detalles de envío y pago -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b border-gray-200">
        <div>
          <h2 class="text-lg font-semibold mb-3">Información de envío</h2>
          <div class="bg-gray-50 rounded-lg p-4">
            <div v-if="order.shippingAddress" class="flex items-start gap-3">
              <MapPin class="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p class="font-medium">Dirección de envío</p>
                <p class="text-gray-600">{{ order.shippingAddress }}</p>
              </div>
            </div>
            <div v-else class="text-gray-500 italic">No hay información de envío disponible</div>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-3">Información de pago</h2>
          <div class="bg-gray-50 rounded-lg p-4">
            <div v-if="order.paymentMethod" class="flex items-start gap-3">
              <CreditCard class="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p class="font-medium">Método de pago</p>
                <p class="text-gray-600">{{ order.paymentMethod }}</p>
              </div>
            </div>
            <div v-else class="text-gray-500 italic">No hay información de pago disponible</div>
          </div>
        </div>
      </div>

      <!-- Lista de productos -->
      <div class="p-6">
        <h2 class="text-lg font-semibold mb-4">
          Productos ({{ order.items || orderItems.length }})
        </h2>

        <div v-if="orderItems.length === 0" class="text-gray-500 italic">
          No hay productos disponibles para mostrar
        </div>

        <div v-else class="divide-y divide-gray-200">
          <div v-for="(item, index) in orderItems" :key="item.id" class="py-4 flex items-center">
            <div
              class="flex-shrink-0 h-16 w-16 rounded bg-gray-200 flex items-center justify-center"
            >
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.name"
                class="h-full w-full object-cover rounded"
              />
              <Package v-else class="h-6 w-6 text-gray-400" />
            </div>

            <div class="ml-4 flex-1">
              <div class="flex flex-col md:flex-row md:justify-between">
                <div>
                  <h3 class="text-base font-medium text-gray-900">{{ item.name }}</h3>
                  <p v-if="item.isCustomizable" class="text-sm text-indigo-600 mt-0.5">
                    Personalizable
                  </p>
                </div>
                <div class="md:text-right mt-2 md:mt-0">
                  <p class="text-gray-900 font-medium">${{ formatPrice(item.price) }}</p>
                  <p class="text-gray-500 text-sm">Cantidad: {{ item.quantity }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronLeft, Package, CreditCard, MapPin, CheckCircle, Clock } from 'lucide-vue-next'
import { ordersQueries } from '@/api/orders/ordersQueries.js'

const route = useRoute()
const orderId = route.params.id

const loading = ref(true)
const error = ref(null)
const order = ref({})
const orderItems = ref([])

const statusIcons = {
  0: Package,
  1: CheckCircle,
  2: Clock,
}

const statusText = {
  0: 'Pedido',
  1: 'Finalizado',
  2: 'En proceso',
}

const statusColors = {
  0: {
    badge: 'bg-rose-50 text-rose-600',
    accent: 'bg-rose-500',
  },
  1: {
    badge: 'bg-green-50 text-green-600',
    accent: 'bg-green-500',
  },
  2: {
    badge: 'bg-amber-50 text-amber-600',
    accent: 'bg-amber-500',
  },
}

// Funciones de formato
const formatPrice = (price) => {
  return price?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0.00'
}

const formatDate = (date, format = 'long') => {
  if (!date) return ''

  if (!(date instanceof Date)) {
    date = new Date(date)
  }

  const options =
    format === 'short'
      ? { month: 'short', day: 'numeric' }
      : { year: 'numeric', month: 'long', day: 'numeric' }

  return new Intl.DateTimeFormat('es-ES', options).format(date)
}

const loadOrderDetails = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await ordersQueries.getOrderById(orderId)

    if (response) {
      // Asegurarse de que los items sean un array válido
      const items = Array.isArray(response) ? response : (response.items || [])
      
      order.value = response
      orderItems.value = items.map((item) => ({
        id: item.id,
        name: item.name && typeof item.name === 'string' ? item.name : 'Producto sin nombre',
        price: parseFloat(item.price || '0'),
        image: item.image || null,
        quantity: item.quantity || 1,
        isCustomizable: item.isCustomizable || false
      }))
    } else {
      throw new Error('No se encontraron datos de la orden')
    }
  } catch (err) {
    console.error('Error al cargar detalles de la orden:', err)
    error.value = err.message || 'No se pudieron cargar los detalles de la orden'
    orderItems.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadOrderDetails()
})
</script>
