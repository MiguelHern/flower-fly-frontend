<script setup>
import OrderCard from '../components/CardOrder.vue';
import { onMounted, ref } from 'vue'
import { ordersQueries } from '@/api/orders/ordersQueries.js'

const orders = ref([])
const loading = ref(true)
const error = ref(false)

const fetchOrders = async () => {
  try {
    loading.value = true
    error.value = false

    const apiParams = {
      page: 1,
      pageSize: 20,
    }

    const response = await ordersQueries.getOrders(apiParams)

    if (response && response.items) {
      orders.value = response.items.map((orders) => ({
        ...orders,
        price: parseFloat(orders.price),
      }))
    }
  } catch (err) {
    console.error('Error fetching bouquets:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  fetchOrders()
})
</script>

<template>
  <div class="p-4">
    <OrderCard v-for="order in orders" :key="order.id" :order="order"
      :id="order.salesId"
      :status="order.status"
      :purchaseDate="13/12/2002"
      :total="order.total"
    />
  </div>
</template>
