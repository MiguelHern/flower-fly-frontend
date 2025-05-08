<template>
  <div class="space-y-8 pt-0 rounded-xl">
    <section>
      <div class="bg-pink-50 p-8 rounded-lg mb-10 border border-stone-100">
      <div class="flex items-start gap-4">
        <div class="bg-stone-100 p-3 rounded-full">
          <Flower2 class="h-5 w-5 text-stone-700" />
        </div>
        <div>
          <h2 class="font-serif text-2xl mb-2">Elige entre nuestros ramos mas comprados</h2>
          <p class="text-muted-foreground text-sm">
            Elige entre nuestros ramos y los creados por ti!
          </p>
        </div>
      </div>
    </div>

    <!-- Filtros y contenedor principal -->
    <div class="">
      <!-- Columna de contenido -->
      <div class="md:col-span-3">
        <!-- Loading state -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"
          ></div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="bg-red-50 p-6 rounded-lg text-center">
          <AlertCircle class="h-8 w-8 text-red-500 mx-auto mb-3" />
          <p class="text-red-700">No pudimos cargar las flores. Por favor intenta nuevamente.</p>
          <button
            @click="fetchBouquetsAdmin"
            class="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
          >
            Reintentar
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <CardBouquet
            v-for="bouquet in bouquetsAdmin"
            :key="bouquet.id"
            :id="bouquet.id"
            :name="bouquet.name"
            :image="bouquet.image"
            :price="bouquet.price"
            :bouquet="bouquet.bouquet"
          />
        </div>
      </div>
    </div>
    </section>

    <section>
      <div class="mt-20  bg-pink-50 p-8 rounded-lg mb-10 border border-stone-100">
      <div class="flex items-start gap-4">
        <div class="bg-stone-100 p-3 rounded-full">
          <Flower2 class="h-5 w-5 text-stone-700" />
        </div>
        <div>
          <h2 class="font-serif text-2xl mb-2">Elige entre tus ramos creados antes</h2>
          <p class="text-muted-foreground text-sm">
            Ramos hechos anteriormente
          </p>
        </div>
      </div>
    </div>

    <!-- Filtros y contenedor principal -->
    <div class="">
      <!-- Columna de contenido -->
      <div class="md:col-span-3">
        <!-- Loading state -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"
          ></div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="bg-red-50 p-6 rounded-lg text-center">
          <AlertCircle class="h-8 w-8 text-red-500 mx-auto mb-3" />
          <p class="text-red-700">No pudimos cargar las flores. Por favor intenta nuevamente.</p>
          <button
            @click="fetchBouquets"
            class="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
          >
            Reintentar
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <CardBouquet
            v-for="bouquet in bouquets"
            :key="bouquet.id"
            :id="bouquet.id"
            :name="bouquet.name"
            :image="bouquet.image"
            :price="bouquet.price"
            :bouquet="bouquet.bouquet"
          />
        </div>
      </div>
    </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { bouquetQueries } from '@/api/bouquet/bouquetQueries.js'
import { AlertCircle, Flower2 } from 'lucide-vue-next'
import CardBouquet from '@/features/bouquets/components/BouquetsHome/CardBouquet.vue'

// Store para gestionar el estado global

// Estado local
const bouquets = ref([])
const bouquetsAdmin = ref([])
const loading = ref(true)
const error = ref(false)

const fetchBouquets = async () => {
  try {
    loading.value = true
    error.value = false

    const apiParams = {
      page: 1,
      pageSize: 20,
    }

    const response = await bouquetQueries.getBouquets(apiParams)

    if (response && response.items) {
      bouquets.value = response.items.map((bouquet) => ({
        ...bouquet,
        price: parseFloat(bouquet.price),
      }))

      // Mostrar quantity y flower.name de cada item.bouquet
      bouquets.value.forEach((item, index) => {
        console.log(`Bouquet #${index + 1}:`)
        item.bouquet.forEach((bq, i) => {
          console.log(`  Item ${i + 1} - Quantity: ${bq.quantity}, Flower Name: ${bq.flower?.name}`)
        })
      })
    }
  } catch (err) {
    console.error('Error fetching bouquets:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

const fetchBouquetsAdmin = async () => {
  try {
    loading.value = true
    error.value = false

    const apiParams = {
      page: 1,
      pageSize: 20,
    }

    const response = await bouquetQueries.getBouquetsNoCustomized(apiParams)

    if (response && response.items) {
      bouquetsAdmin.value = response.items.map((bouquetsAdmin) => ({
        ...bouquetsAdmin,
        price: parseFloat(bouquetsAdmin.price),
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
  fetchBouquets()
  fetchBouquetsAdmin()
})
</script>

<style scoped></style>
