<script setup>
import { ref, onMounted, computed } from 'vue'
import { bouquetQueries } from '@/api/bouquet/bouquetQueries'
import { Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-vue-next'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const flowers = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(0)
const totalItems = ref(0)
const searchTerm = ref('')

const colorFilters = ref([])
const typeFilters = ref([])
const seasonFilters = ref([])

const availableColors = ref(['Rojo', 'Blanco', 'Rosa', 'Amarillo', 'Morado', 'Azul', 'Naranja'])
const availableTypes = ref(['Rosa', 'Tulipán', 'Girasol', 'Lirio', 'Dalia', 'Orquídea'])
const availableSeasons = ref(['Primavera', 'Verano', 'Otoño', 'Invierno', 'Todo el año'])

const fetchFlowers = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await bouquetQueries.getFlowers({
      page: currentPage.value,
      pageSize: pageSize.value,
      colors: colorFilters.value,
      types: typeFilters.value,
      seasons: seasonFilters.value
    })

    flowers.value = response.items || response
    totalPages.value = response.totalPages || Math.ceil(response.totalCount / pageSize.value) || 1
    totalItems.value = response.totalCount || flowers.value.length || 0
  } catch (err) {
    error.value = 'Error al cargar datos de flores. Por favor, intente nuevamente.'
    console.error('Error fetching flowers:', err)
  } finally {
    loading.value = false
  }
}

const filteredFlowers = computed(() => {
  if (!searchTerm.value) return flowers.value

  const search = searchTerm.value.toLowerCase()
  return flowers.value.filter(flower =>
    flower.name.toLowerCase().includes(search) ||
    (flower.description && flower.description.toLowerCase().includes(search))
  )
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchFlowers()
  }
}

const applyFilters = () => {
  currentPage.value = 1
  fetchFlowers()
}

const resetFilters = () => {
  colorFilters.value = []
  typeFilters.value = []
  seasonFilters.value = []
  searchTerm.value = ''
  currentPage.value = 1
  fetchFlowers()
}

onMounted(() => {
  fetchFlowers()
})
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-4">Catálogo de Flores</h2>

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
          placeholder="Buscar flores..."
        />
      </div>

      <div class="flex flex-wrap gap-2">
        <!-- Filtro de colores -->
        <Menu as="div" class="relative inline-block text-left">
          <MenuButton class="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            Colores ({{ colorFilters.length }})
          </MenuButton>
          <MenuItems class="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div class="py-1 px-2">
              <div v-for="color in availableColors" :key="color" class="flex items-center px-2 py-1">
                <input
                  type="checkbox"
                  :id="`color-${color}`"
                  v-model="colorFilters"
                  :value="color"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label :for="`color-${color}`" class="ml-2 text-sm text-gray-700">{{ color }}</label>
              </div>
              <div class="flex justify-end mt-2 gap-2">
                <button @click="applyFilters" class="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">
                  Aplicar
                </button>
              </div>
            </div>
          </MenuItems>
        </Menu>

        <!-- Filtro de tipos -->
        <Menu as="div" class="relative inline-block text-left">
          <MenuButton class="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            Tipos ({{ typeFilters.length }})
          </MenuButton>
          <MenuItems class="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div class="py-1 px-2">
              <div v-for="type in availableTypes" :key="type" class="flex items-center px-2 py-1">
                <input
                  type="checkbox"
                  :id="`type-${type}`"
                  v-model="typeFilters"
                  :value="type"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label :for="`type-${type}`" class="ml-2 text-sm text-gray-700">{{ type }}</label>
              </div>
              <div class="flex justify-end mt-2 gap-2">
                <button @click="applyFilters" class="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">
                  Aplicar
                </button>
              </div>
            </div>
          </MenuItems>
        </Menu>

        <!-- Filtro de temporadas -->
        <Menu as="div" class="relative inline-block text-left">
          <MenuButton class="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            Temporadas ({{ seasonFilters.length }})
          </MenuButton>
          <MenuItems class="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div class="py-1 px-2">
              <div v-for="season in availableSeasons" :key="season" class="flex items-center px-2 py-1">
                <input
                  type="checkbox"
                  :id="`season-${season}`"
                  v-model="seasonFilters"
                  :value="season"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label :for="`season-${season}`" class="ml-2 text-sm text-gray-700">{{ season }}</label>
              </div>
              <div class="flex justify-end mt-2 gap-2">
                <button @click="applyFilters" class="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">
                  Aplicar
                </button>
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

    <!-- Tabla de flores -->
    <div class="overflow-x-auto mb-5 style_scroll">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b">
        <tr>
          <th scope="col" class="py-3 px-4">Nombre</th>
          <th scope="col" class="py-3 px-4">Tipo</th>
          <th scope="col" class="py-3 px-4">Precio</th>
          <th scope="col" class="py-3 px-4">Descripción</th>
          <th scope="col" class="py-3 px-4">Stock</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="loading">
          <tr>
            <td colspan="5" class="py-4 text-center">
              <div class="flex justify-center">
                <Loader2 class="w-6 h-6 text-blue-500 animate-spin" />
              </div>
            </td>
          </tr>
        </template>
        <template v-else-if="error">
          <tr>
            <td colspan="5" class="py-4 text-center text-red-500">{{ error }}</td>
          </tr>
        </template>
        <template v-else-if="filteredFlowers.length === 0">
          <tr>
            <td colspan="5" class="py-4 text-center text-gray-400">No se encontraron flores.</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="flower in filteredFlowers" :key="flower.id" class="bg-white border-b hover:bg-gray-50">
            <td class="py-3 px-4 font-medium text-gray-900">{{ flower.name }}</td>
            <td class="py-3 px-4">{{ flower.type }}</td>
            <td class="py-3 px-4">${{ flower.price?.toFixed(2) || '0.00' }}</td>
            <td class="py-3 px-4">
              <div class="max-w-xs truncate">{{ flower.description || 'Sin descripción' }}</div>
            </td>
            <td class="py-3 px-4">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    flower.stock > 10 ? 'bg-green-100 text-green-800' :
                    flower.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  ]"
                >
                  {{ flower.stock > 0 ? flower.stock : 'Agotado' }}
                </span>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>

    <!-- Paginación -->
    <div class="flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Mostrando <span class="font-medium">{{ filteredFlowers.length }}</span> de <span class="font-medium">{{ totalItems }}</span> flores
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
