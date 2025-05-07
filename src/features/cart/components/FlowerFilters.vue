<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border border-pink-100 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-medium text-gray-800">Filtros</h3>
      <button
        @click="resetFilters"
        class="text-xs text-pink-600 hover:text-pink-800 transition-colors"
      >
        Limpiar filtros
      </button>
    </div>

    <!-- Búsqueda por nombre -->
    <div class="mb-5">
      <label for="searchName" class="block text-sm text-gray-600 mb-1">Buscar por nombre</label>
      <div class="relative">
        <input
          id="searchName"
          v-model="filters.search"
          type="text"
          placeholder="Escribe un nombre..."
          class="w-full p-2 pl-8 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 text-sm"
          @input="applyFilters"
        />
        <Search class="h-4 w-4 text-gray-400 absolute left-2.5 top-2.5" />
      </div>
    </div>

    <!-- Filtro por colores -->
    <div class="mb-5">
      <label class="block text-sm text-gray-600 mb-2">Colores</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="color in colorOptions"
          :key="color.id"
          @click="toggleColorFilter(color.id)"
          class="h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all duration-200"
          :class="[
            { 'border-pink-500 ring-2 ring-pink-200': filters.colors.includes(color.id) },
            { 'border-gray-200': !filters.colors.includes(color.id) },
            color.bgClass
          ]"
        >
          <Check
            v-if="filters.colors.includes(color.id)"
            class="h-4 w-4 text-white"
          />
        </button>
      </div>
    </div>

    <!-- Filtro por temporada -->
    <div class="mb-5">
      <label class="block text-sm text-gray-600 mb-2">Temporada</label>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="season in seasonOptions"
          :key="season.id"
          @click="toggleSeasonFilter(season.id)"
          class="px-3 py-2 text-sm rounded-md flex items-center justify-center transition-all duration-200"
          :class="[
            filters.seasons.includes(season.id)
              ? 'bg-pink-100 text-pink-700 font-medium'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          ]"
        >
          <component :is="season.icon" class="h-3.5 w-3.5 mr-1.5" />
          {{ season.name }}
        </button>
      </div>
    </div>

    <!-- Filtro por rango de precio -->
    <div class="mb-5">
      <div class="flex justify-between mb-2">
        <label class="block text-sm text-gray-600">Rango de precio</label>
        <span class="text-xs text-gray-500">
          ${{ filters.priceRange[0] }} - ${{ filters.priceRange[1] }}
        </span>
      </div>
      <div class="px-2">
        <input
          type="range"
          v-model.number="filters.priceRange[0]"
          :min="priceRange.min"
          :max="filters.priceRange[1]"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
          @change="applyFilters"
        />
        <input
          type="range"
          v-model.number="filters.priceRange[1]"
          :min="filters.priceRange[0]"
          :max="priceRange.max"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
          @change="applyFilters"
        />
      </div>
    </div>

    <!-- Solo mostrar disponibles -->
    <div class="flex items-center">
      <input
        id="stockOnly"
        type="checkbox"
        v-model="filters.inStock"
        class="h-4 w-4 text-pink-600 rounded accent-pink-500"
        @change="applyFilters"
      />
      <label for="stockOnly" class="ml-2 text-sm text-gray-600">
        Solo mostrar flores disponibles
      </label>
    </div>

    <!-- Botón de aplicar filtros para móvil (opcional) -->
    <button
      class="w-full mt-6 bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors md:hidden"
      @click="applyFilters"
    >
      Aplicar filtros
    </button>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { Search, Check, Snowflake, Sun, Leaf, Cloud } from 'lucide-vue-next';

const props = defineProps({
  initialPriceRange: {
    type: Object,
    default: () => ({ min: 0, max: 500 })
  }
});

const emit = defineEmits(['update-filters']);

// Opciones de colores
const colorOptions = [
  { id: 1, name: 'Amarillo', bgClass: 'bg-yellow-500' },
  { id: 2, name: "Rojo", bgClass: 'bg-red-500' },
  { id: 3, name: 'Rosa', bgClass: 'bg-pink-400' },
  { id: 4, name: 'Blanco', bgClass: 'bg-white' },
];

// Opciones de temporada
const seasonOptions = [
  { id: 1, name: 'Invierno', icon: Snowflake },
  { id: 2, name: 'Primavera', icon: Leaf },
  { id: 3, name: 'Verano', icon: Sun },
  { id: 4, name: 'Otoño', icon: Cloud }
];

// Estado del rango de precios
const priceRange = ref({...props.initialPriceRange});

// Estado de los filtros
const filters = reactive({
  search: '',
  colors: [],
  seasons: [],
  priceRange: [priceRange.value.min, priceRange.value.max],
  inStock: true
});

const toggleColorFilter = (colorId) => {
  const index = filters.colors.indexOf(colorId);
  if (index === -1) {
    filters.colors.push(colorId);
  } else {
    filters.colors.splice(index, 1);
  }
  applyFilters();
};

const toggleSeasonFilter = (seasonId) => {
  const index = filters.seasons.indexOf(seasonId);
  if (index === -1) {
    filters.seasons.push(seasonId);
  } else {
    filters.seasons.splice(index, 1);
  }
  applyFilters();
};

const resetFilters = () => {
  filters.search = '';
  filters.colors = [];
  filters.seasons = [];
  filters.priceRange = [priceRange.value.min, priceRange.value.max];
  filters.inStock = true;
  applyFilters();
};

const applyFilters = () => {
  emit('update-filters', { ...filters });
};

let searchTimeout;
watch(() => filters.search, (newVal) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    applyFilters();
  }, 300);
});

onMounted(() => {
  applyFilters();
});
</script>

<style scoped>
input[type="range"] {
  height: 4px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #ec4899;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;
}
input[type="range"]::-moz-range-thumb {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #ec4899;
  cursor: pointer;
}
</style>
