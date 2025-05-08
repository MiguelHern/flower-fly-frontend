<template>
  <RouterLink
    :to="{ name: 'order-detail', params: { id } }"
    class="bg-white block rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
  >
    <div class="flex">
      <div class="w-1.5 h-full" :class="statusColors[status].accent"></div>
      <div class="p-5 flex-1">
        <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-semibold text-gray-900">Orden #{{ id }}</h3>
              <span
                class="px-2 py-0.5 text-xs rounded-full flex items-center gap-1"
                :class="statusColors[status].badge"
              >
                <component :is="statusIcons[status]" class="h-3 w-3" />
                {{ statusText[status] }}
              </span>
            </div>
            <p class="text-xl font-bold text-gray-800 mt-1">
              ${{ formatPrice(total) }}
            </p>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <div class="flex items-center gap-1.5">
            <Calendar class="h-3.5 w-3.5" />
            <span>{{ formatDate(purchaseDate) }}</span>
          </div>
          <div v-if="items !== undefined" class="flex items-center gap-1.5">
            <ShoppingBag class="h-3.5 w-3.5" />
            <span>{{ items }} {{ items === 1 ? 'artículo' : 'artículos' }}</span>
          </div>
          <div v-if="shippingAddress" class="flex items-center gap-1.5">
            <MapPin class="h-3.5 w-3.5" />
            <span>{{ shippingAddress }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center pr-4">
        <div class="h-8 w-8 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
          <ChevronRight class="h-4 w-4" />
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { CheckCircle, Package, ChevronRight, Calendar, ShoppingBag, MapPin, Clock } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

defineProps({
  id: { type: String, required: true },
  total: { type: Number, required: true },
  purchaseDate: { type: [Date, String], required: true },
  status: { type: Number, required: true },
  items: { type: Number, default: undefined },
  shippingAddress: { type: String, default: undefined },
  paymentMethod: { type: String, default: undefined }
});

const statusIcons = {
  0: Package,
  1: CheckCircle,
  2: Clock
};

const statusText = {
  0: "Pedido",
  1: "Finalizado",
  2: "En proceso"
};

const statusColors = {
  0: {
    badge: "bg-rose-50 text-rose-600",
    accent: "bg-rose-500"
  },
  1: {
    badge: "bg-green-50 text-green-600",
    accent: "bg-green-500"
  },
  2: {
    badge: "bg-amber-50 text-amber-600",
    accent: "bg-amber-500"
  }
};

const formatPrice = (price) => {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatDate = (date, format = 'long') => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const options = format === 'short'
    ? { month: 'short', day: 'numeric' }
    : { year: 'numeric', month: 'long', day: 'numeric' };

  return new Intl.DateTimeFormat('es-ES', options).format(date);
};
</script>

<style scoped>
/* Añade animación sutil al hover */
.router-link-active {
  border-color: rgba(var(--color-primary), 0.5);
}
</style>
