<script setup>
import { ref, onMounted, computed } from 'vue'
import { bouquetQueries } from '@/api/bouquet/bouquetQueries'
import { Search, ChevronLeft, ChevronRight, Loader2, EyeIcon } from 'lucide-vue-next'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import FlowerForm from '@/features/admin/components/FlowerForm.vue'
import Button from '@/components/ui/ButtonBase.vue'
import BouquetForm from '@/features/admin/components/BouquetForm.vue'

const bouquets = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(0)
const totalItems = ref(0)
const searchTerm = ref('')

// Opciones de filtrado específicas para ramos
const priceRanges = ref([
  { id: 'under20', label: 'Menos de €20', selected: false },
  { id: '20to50', label: '€20 - €50', selected: false },
  { id: '50to100', label: '€50 - €100', selected: false },
  { id: 'over100', label: 'Más de €100', selected: false }
])

const fetchBouquets = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await bouquetQueries.getBouquetsNoCustomized({
      page: currentPage.value,
      pageSize: pageSize.value
    })

    bouquets.value = response.items || response
    totalPages.value = response.totalPages || Math.ceil(response.totalCount / pageSize.value) || 1
    totalItems.value = response.totalCount || bouquets.value.length || 0
  } catch (err) {
    error.value = 'Error al cargar datos de ramos. Por favor, intente nuevamente.'
    console.error('Error fetching bouquets:', err)
  } finally {
    loading.value = false
  }
}

const filteredBouquets = computed(() => {
  if (!searchTerm.value && !priceRanges.value.some(range => range.selected)) {
    return bouquets.value
  }

  return bouquets.value.filter(bouquet => {
    // Filtro de búsqueda
    const searchMatch = !searchTerm.value || (
      bouquet.name?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      bouquet.description?.toLowerCase().includes(searchTerm.value.toLowerCase())
    )

    // Filtro de rango de precios
    let priceMatch = true
    if (priceRanges.value.some(range => range.selected)) {
      priceMatch = false
      const price = bouquet.price || 0

      if (priceRanges.value.find(r => r.id === 'under20')?.selected && price < 20) {
        priceMatch = true
      } else if (priceRanges.value.find(r => r.id === '20to50')?.selected && price >= 20 && price <= 50) {
        priceMatch = true
      } else if (priceRanges.value.find(r => r.id === '50to100')?.selected && price > 50 && price <= 100) {
        priceMatch = true
      } else if (priceRanges.value.find(r => r.id === 'over100')?.selected && price > 100) {
        priceMatch = true
      }
    }

    return searchMatch && priceMatch
  })
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchBouquets()
  }
}

const togglePriceRange = (rangeId) => {
  const range = priceRanges.value.find(r => r.id === rangeId)
  if (range) {
    range.selected = !range.selected
  }
}

const resetFilters = () => {
  priceRanges.value.forEach(range => range.selected = false)
  searchTerm.value = ''
}

const viewBouquetDetails = (bouquetId) => {
  // Aquí podrías implementar la lógica para ver los detalles del ramo
  console.log('Ver detalles del ramo:', bouquetId)
  // Por ejemplo, podrías emitir un evento
  emit('view-bouquet', bouquetId)
}

const formatFlowerList = (flowers) => {
  if (!flowers || !Array.isArray(flowers) || flowers.length === 0) {
    return 'Sin flores'
  }

  return flowers.map(flower => flower.name || 'Flor').join(', ')
}

// Definir emits para comunicarse con el componente padre
const emit = defineEmits(['view-bouquet'])

onMounted(() => {
  fetchBouquets()
})

const showCrearFlor = ref(false)

function handleFlorCreada() {
  showCrearFlor.value = false
  fetchBouquets()
}
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between">
      <h2 class="text-xl font-semibold mb-4">Catálogo de Flores</h2>
      <Button @click="showCrearFlor = true"> Agregar producto </Button>
    </div>
    <BouquetForm
      v-if="showCrearFlor"
      :model-value="showCrearFlor"
      @close="showCrearFlor = false"
      @submitted="handleFlorCreada"
    />
    <!-- Filtros y búsqueda -->
    <div class="mb-6 flex flex-wrap gap-4">
      <div class="relative flex-1 min-w-64">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search class="w-5 h-5 text-gray-400" />
        </div>
        <input
          v-model="searchTerm"
          type="text"
          class="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Buscar ramos..."
        />
      </div>

      <div class="flex flex-wrap gap-2">
        <!-- Filtro de rango de precios -->
        <Menu as="div" class="relative inline-block text-left">
          <MenuButton class="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            Rango de precios
          </MenuButton>
          <MenuItems class="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div class="py-1 px-2">
              <div v-for="range in priceRanges" :key="range.id" class="flex items-center px-2 py-1">
                <input
                  type="checkbox"
                  :id="`price-${range.id}`"
                  :checked="range.selected"
                  @change="togglePriceRange(range.id)"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label :for="`price-${range.id}`" class="ml-2 text-sm text-gray-700">{{ range.label }}</label>
              </div>
            </div>
          </MenuItems>
        </Menu>

        <button
          @click="resetFilters"
          class="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Limpiar filtros
        </button>
      </div>
    </div>

    <!-- Tabla de ramos -->
    <div class="overflow-x-auto mb-5 style_scroll">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b">
        <tr>
          <th scope="col" class="py-3 px-4">Nombre</th>
          <th scope="col" class="py-3 px-4">Precio</th>
          <th scope="col" class="py-3 px-4">Descripción</th>
          <th scope="col" class="py-3 px-4">Flores incluidas</th>
          <th scope="col" class="py-3 px-4">Stock</th>
          <th scope="col" class="py-3 px-4">Acciones</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="loading">
          <tr>
            <td colspan="6" class="py-4 text-center">
              <div class="flex justify-center">
                <Loader2 class="w-6 h-6 text-blue-500 animate-spin" />
              </div>
            </td>
          </tr>
        </template>
        <template v-else-if="error">
          <tr>
            <td colspan="6" class="py-4 text-center text-red-500">{{ error }}</td>
          </tr>
        </template>
        <template v-else-if="filteredBouquets.length === 0">
          <tr>
            <td colspan="6" class="py-4 text-center text-gray-400">No se encontraron ramos.</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="bouquet in filteredBouquets" :key="bouquet.id" class="bg-white border-b hover:bg-gray-50">
            <td class="py-3 px-4 font-medium text-gray-900">{{ bouquet.name }}</td>
            <td class="py-3 px-4">${{ bouquet.price?.toFixed(2) || '0.00' }}</td>
            <td class="py-3 px-4">
              <div class="max-w-xs truncate">{{ bouquet.description || 'Sin descripción' }}</div>
            </td>
            <td class="py-3 px-4">
              <div class="max-w-xs truncate">{{ formatFlowerList(bouquet.flowers) }}</div>
            </td>
            <td class="py-3 px-4">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    bouquet.stock > 5 ? 'bg-green-100 text-green-800' :
                    bouquet.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  ]"
                >
                  {{ bouquet.stock > 0 ? bouquet.stock : 'Agotado' }}
                </span>
            </td>
            <td class="py-3 px-4">
              <button
                @click="viewBouquetDetails(bouquet.id)"
                class="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                title="Ver detalles"
              >
                <EyeIcon class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>

    <!-- Paginación -->
    <div class="flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Mostrando <span class="font-medium">{{ filteredBouquets.length }}</span> de <span class="font-medium">{{ totalItems }}</span> ramos
      </div>
      <div class="flex gap-1">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="p-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        <div class="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg">
          <span>{{ currentPage }} de {{ totalPages }}</span>
        </div>
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="p-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.style_scroll {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.style_scroll::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.style_scroll::-webkit-scrollbar-track {
  background: #f7fafc;
}

.style_scroll::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 3px;
}
</style>
