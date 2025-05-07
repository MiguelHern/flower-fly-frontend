<template>
  <div class="container mx-auto p-4">
    <!-- Encabezado -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Inventario</h1>
    </div>

    <!-- Pestañas -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="flex space-x-2" aria-label="Tabs">
        <button
          @click="activeTab = 'flowers'"
          :class="[
            'px-4 py-2 border-b-2 font-medium text-sm flex items-center transition',
            activeTab === 'flowers'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          ]"
        >
          <Flower class="w-5 h-5 mr-2" />
          <span>Flores individuales</span>
        </button>
        <button
          @click="activeTab = 'bouquets'"
          :class="[
            'px-4 py-2 border-b-2 font-medium text-sm flex items-center transition',
            activeTab === 'bouquets'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          ]"
        >
          <Gift class="w-5 h-5 mr-2" />
          <span>Ramos</span>
        </button>
      </nav>
    </div>

    <!-- Contenido dinámico -->
    <div>
      <FlowerTable v-if="activeTab === 'flowers'" />
      <BouquetTable v-else @view-bouquet="handleViewBouquet" />
    </div>
    <FlowerForm />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FlowerTable from '../components/FlowerProductTable.vue'
import BouquetTable from '../components/BouquetProductTable.vue'
import { Flower, Gift, ShoppingBag } from 'lucide-vue-next'
import FlowerForm from '@/features/admin/components/FlowerForm.vue'

const activeTab = ref('flowers')

const handleViewBouquet = (bouquetId) => {
  console.log(`Ver detalles del ramo ID: ${bouquetId}`)
}
</script>

<style scoped>
/* Estilos adicionales opcionales */
</style>
