<script setup>
import { ref, computed } from 'vue'
import CartItem from '../components/CartItem.vue'
import OrderSummary from '../components/OrderSummary.vue'

// Datos de ejemplo del carrito
const cartItems = ref([
  {
    id: 1,
    name: 'Rosa Roja',
    image: '/images/rosa-roja.jpg',
    price: 15.99,
    quantity: 1,
    inStock: true,
    color: 'Rojo'
  },
  {
    id: 2,
    name: 'Tulipán',
    image: '/images/tulipan.jpg',
    price: 12.99,
    quantity: 2,
    inStock: true,
    color: 'Amarillo'
  }
])

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const shipping = computed(() => 5.99)
const tax = computed(() => subtotal.value * 0.1)
const total = computed(() => subtotal.value + shipping.value + tax.value)

const removeItem = (itemId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemId)
}

const updateQuantity = (itemId, newQuantity) => {
  const item = cartItems.value.find(item => item.id === itemId)
  if (item) {
    item.quantity = newQuantity
  }
}
</script>

<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Carrito de compras</h1>

      <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <div class="lg:col-span-7">
          <div v-if="cartItems.length === 0" class="text-center">
            <h2 class="text-2xl font-bold text-gray-900">Tu carrito está vacío</h2>
            <p class="mt-4 text-gray-500">Agrega algunos productos para comenzar</p>
          </div>

          <div v-else>
            <CartItem v-for="item in cartItems" :key="item.id" :item="item" @remove="removeItem(item.id)"
              @update:quantity="(qty) => updateQuantity(item.id, qty)" />
          </div>
        </div>

        <div class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <OrderSummary :subtotal="subtotal" :shipping="shipping" :tax="tax" :total="total" />
        </div>
      </div>
    </div>
  </div>
</template>
