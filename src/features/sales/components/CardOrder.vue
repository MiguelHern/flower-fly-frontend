<template>
  <RouterLink :to="{ name: 'order-detail', params: { id } }"
    class="bg-white block rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
  >
    <div class="flex">
      <div class="w-2 bg-rose-500"></div>
      <div class="p-5 flex-1">
        <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-lg font-semibold text-gray-900">Orden #{{ id }}</h3>
              <span
                class="px-2 py-0.5 text-xs rounded-full flex items-center gap-1"
                :class="statusColors[status].badge"
              >
                <component :is="statusIcons[status]" class="h-3.5 w-3.5" />
                {{ statusText[status] }}
              </span>
            </div>
            <p class="text-xl font-bold text-gray-800 mt-1">
              ${{ formatPrice(total) }}
            </p>
          </div>

        </div>

        <div class="mt-3 flex items-center gap-4 text-sm text-gray-500">
          <div class="flex items-center gap-1">
            <Calendar class="h-4 w-4" />
            <span>{{ formatDate(purchaseDate) }}</span>
          </div>
          <div v-if="items !== undefined" class="flex items-center gap-1">
            <ShoppingBag class="h-4 w-4" />
            <span>{{ items }} {{ items === 1 ? 'artículo' : 'artículos' }}</span>
          </div>
        </div>
      </div>
      <div class="h-9 w-9 rounded-full flex self-center mr-8 items-center justify-center bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-500 transition-colors">
        <ChevronRight class="h-5 w-5" />
      </div>
    </div>

  </RouterLink>
</template>

<script setup>
import { CheckCircle, Package, ChevronRight, Calendar, ShoppingBag } from 'lucide-vue-next';
import { RouterLink } from 'vue-router'
const props = defineProps({
  id: { type: String, required: true },
  total: { type: Number, required: true },
  purchaseDate: { type: [Date, String], required: true },
  status: { type: Number, required: true },
  items: { type: Number, default: undefined },
});

const emit = defineEmits(['click']);

const statusIcons = {
  0: Package,
  1: CheckCircle
};

const statusText = {
  0: "Pedido",
  1: "Finalizado",
};

const statusColors = {
  0: {
    badge: "bg-rose-50 text-rose-600",
    accent: "bg-rose-500"
  },
  1: {
    badge: "bg-green-50 text-green-600",
    accent: "bg-green-500"
  }
};

const formatPrice = (price) => {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

</script>
