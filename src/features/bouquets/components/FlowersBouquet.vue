<template>
  <div class="space-y-8 pt-0 rounded-xl">
    <div class="bg-pink-50 p-8 rounded-lg mb-10 border border-stone-100">
      <div class="flex items-start gap-4">
        <div class="bg-stone-100 p-3 rounded-full">
          <Flower class="h-5 w-5 text-stone-700" />
        </div>
        <div>
          <h2 class="font-serif text-2xl mb-2">Elige el estilo de tu arreglo</h2>
          <p class="text-muted-foreground text-sm">Define la forma y presentación de tus flores</p>
        </div>
      </div>
    </div>

    <!-- Filtros y contenedor principal -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Columna de filtros -->
      <div class="md:col-span-1">
        <FlowerFilters
          :initial-price-range="priceRange"
          @update-filters="updateFilters"
        />
      </div>

      <!-- Columna de contenido -->
      <div class="md:col-span-3">
        <!-- Loading state -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="bg-red-50 p-6 rounded-lg text-center">
          <AlertCircle class="h-8 w-8 text-red-500 mx-auto mb-3" />
          <p class="text-red-700">No pudimos cargar las flores. Por favor intenta nuevamente.</p>
          <button
            @click="fetchFlowers"
            class="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
          >
            Reintentar
          </button>
        </div>

        <!-- No results state -->
        <div v-else-if="filteredFlowers.length === 0" class="bg-gray-50 p-8 rounded-lg text-center">
          <SearchX class="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <h3 class="text-lg font-medium text-gray-700 mb-1">No encontramos resultados</h3>
          <p class="text-gray-500 mb-4">Prueba modificando tus filtros de búsqueda</p>
          <button
            @click="resetFilters"
            class="px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-md transition-colors"
          >
            Limpiar filtros
          </button>
        </div>

        <!-- Flowers grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div
            v-for="flower in filteredFlowers"
            :key="flower.id"
            class="relative group bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md border border-pink-100"
          >
            <img
              :src="flower.image"
              :alt="flower.name"
              width="400"
              height="300"
              class="object-cover w-full aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
            />

            <div class="p-5">
              <div class="flex justify-between items-center mb-3">
                <h3 class="font-serif text-xl text-gray-800">{{ flower.name }}</h3>
                <div class="text-pink-600 text-sm font-medium">
                  {{ '$' + flower.price.toFixed(2) }}
                </div>
              </div>

              <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                <span class="text-gray-600 text-sm">Cantidad</span>
                <div class="flex items-center space-x-4">
                  <button
                    class="h-8 w-8 bg-white hover:bg-pink-50 border border-gray-200 rounded-md flex items-center justify-center transition-all duration-200"
                    @click="decrementQuantity(flower)"
                    :disabled="getFlowerQuantity(flower.id) === 0"
                    :class="{'opacity-50 cursor-not-allowed': getFlowerQuantity(flower.id) === 0}"
                  >
                    <Minus class="h-3 w-3 text-gray-600" />
                  </button>
                  <span class="w-6 text-center font-medium text-gray-800">{{ getFlowerQuantity(flower.id) }}</span>
                  <button
                    class="h-8 w-8 bg-white hover:bg-pink-50 border border-gray-200 rounded-md flex items-center justify-center transition-all duration-200"
                    @click="incrementQuantity(flower)"
                    :disabled="getFlowerQuantity(flower.id) >= flower.stock"
                    :class="{'opacity-50 cursor-not-allowed': getFlowerQuantity(flower.id) >= flower.stock}"
                  >
                    <Plus class="h-3 w-3 text-gray-600" />
                  </button>
                </div>
              </div>

              <ButtonBase
                class="w-full mt-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2 border border-pink-200"
                @click="addToCart(flower)"
                variant="outline"
                :disabled="getFlowerQuantity(flower.id) === 0"
                :class="{'opacity-50 cursor-not-allowed': getFlowerQuantity(flower.id) === 0}"
              >
                <ShoppingBag class="h-4 w-4" />
                Añadir al ramo
              </ButtonBase>
            </div>
          </div>
        </div>

        <ToastMessage type="success" v-if="showNotification">
          <span>Añadido al ramo</span>
        </ToastMessage>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { bouquetQueries } from '@/api/bouquet/bouquetQueries.js';
import { Flower, Minus, Plus, ShoppingBag, AlertCircle, SearchX} from 'lucide-vue-next';
import ButtonBase from '@/components/ui/ButtonBase.vue';
import { useFlowerStore } from '@/features/bouquets/stores/flowerStore.js';
import FlowerFilters from './FlowerFilters.vue';
import ToastMessage from '@/components/ui/ToastMessage.vue'

// Store para gestionar el estado global
const flowerStore = useFlowerStore();

// Estado local
const flowers = ref([]);
const loading = ref(true);
const error = ref(false);
const showNotification = ref(false);
const selectedItems = ref({});

// Estado para filtros
const activeFilters = ref({
  search: '',
  colors: [],
  seasons: [],
  priceRange: [0, 500],
  inStock: true
});

// Rango de precios disponible
const priceRange = ref({
  min: 0,
  max: 500
});

// Obtener las flores desde la API
const fetchFlowers = async () => {
  try {
    loading.value = true;
    error.value = false;

    // Crear objeto de parámetros para la API
    const apiParams = {
      page: 1,
      pageSize: 10 // Pedir más resultados para filtrar en cliente
    };

    // Añadir colores si están seleccionados
    if (activeFilters.value.colors.length > 0) {
      apiParams.colors = activeFilters.value.colors;
    }

    // Añadir temporadas si están seleccionadas
    if (activeFilters.value.seasons.length > 0) {
      apiParams.seasons = activeFilters.value.seasons;
    }

    // Llamar a la API con los parámetros correctos
    const response = await bouquetQueries.getFlowers(apiParams);

    // Si la respuesta incluye 'items', extraemos esos datos
    if (response && response.items) {
      flowers.value = response.items.map(flower => ({
        ...flower,
        price: parseFloat(flower.price)
      }));

      // Actualizar el rango de precios basado en los datos reales
      if (flowers.value.length > 0) {
        const prices = flowers.value.map(flower => flower.price);
        priceRange.value = {
          min: Math.floor(Math.min(...prices)),
          max: Math.ceil(Math.max(...prices))
        };

        // Actualizar el rango de precios en los filtros si es la primera carga
        if (activeFilters.value.priceRange[1] === 500) {
          activeFilters.value.priceRange = [priceRange.value.min, priceRange.value.max];
        }
      }

      // Inicializar cantidades
      flowers.value.forEach(flower => {
        if (!selectedItems.value[flower.id]) {
          selectedItems.value[flower.id] = 0;
        }
      });
    }
  } catch (err) {
    console.error('Error fetching flowers:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

// Funciones para manipular cantidades
const getFlowerQuantity = (flowerId) => {
  return selectedItems.value[flowerId] || 0;
};

const incrementQuantity = (flower) => {
  const currentQuantity = getFlowerQuantity(flower.id);
  if (currentQuantity < flower.stock) {
    selectedItems.value[flower.id] = currentQuantity + 1;
  }
};

const decrementQuantity = (flower) => {
  const currentQuantity = getFlowerQuantity(flower.id);
  if (currentQuantity > 0) {
    selectedItems.value[flower.id] = currentQuantity - 1;
  }
};

// Añadir al carrito/selección
const  addToCart = (flower) => {
  const quantity = getFlowerQuantity(flower.id);

  if (quantity > 0) {
    // Añadir al store global
    flowerStore.addSelectedFlower({
      id: flower.id,
      name: flower.name,
      quantity: quantity,
      price: flower.price,
      image: flower.image
    });

    // Mostrar notificación
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);

    // Resetear cantidad después de añadir
    selectedItems.value[flower.id] = 0;
  }
};

// Filtrar flores basado en los filtros activos
const filteredFlowers = computed(() => {
  if (!flowers.value.length) return [];

  return flowers.value.filter(flower => {
    // Filtrar por búsqueda de texto
    if (activeFilters.value.search &&
      !flower.name.toLowerCase().includes(activeFilters.value.search.toLowerCase())) {
      return false;
    }

    // Filtrar por colores (si hay alguno seleccionado)
    if (activeFilters.value.colors.length > 0 &&
      !activeFilters.value.colors.includes(flower.color)) {
      return false;
    }

    // Filtrar por temporadas (si hay alguna seleccionada)
    if (activeFilters.value.seasons.length > 0) {
      // Verificar si al menos una temporada de la flor está en las temporadas filtradas
      const hasMatchingSeason = flower.season.some(season =>
        activeFilters.value.seasons.includes(season));
      if (!hasMatchingSeason) {
        return false;
      }
    }

    // Filtrar por rango de precio
    if (flower.price < activeFilters.value.priceRange[0] ||
      flower.price > activeFilters.value.priceRange[1]) {
      return false;
    }

    // Filtrar por stock disponible
    if (activeFilters.value.inStock && flower.stock <= 0) {
      return false;
    }

    return true;
  });
});

// Actualizar filtros desde el componente hijo
const updateFilters = (newFilters) => {
  activeFilters.value = { ...newFilters };
};

// Resetear filtros
const resetFilters = () => {
  activeFilters.value = {
    search: '',
    colors: [],
    seasons: [],
    priceRange: [priceRange.value.min, priceRange.value.max],
    inStock: true
  };
};

// Cargar datos al montar el componente
onMounted(() => {
  fetchFlowers();
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
