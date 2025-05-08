<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="font-serif text-3xl md:text-4xl text-gray-800 mb-2">Crea tu ramo personalizado</h1>
      <p class="text-gray-600">Selecciona las flores que más te gusten para tu arreglo perfecto</p>
    </div>

    <div class="w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Componente de flores (ocupa 3/4 en pantallas grandes) -->
      <div class="lg:col-span-3">
        <Items />
      </div>

      <!-- Componente de resumen (ocupa 1/4 en pantallas grandes y se mantiene fijo al hacer scroll) -->
      <div class="lg:col-span-1">
        <div class="sticky top-8">
          <Summary />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Items from '@/features/cart/components/CartItems.vue';
import Summary from '@/features/cart/components/CartSummary.vue'

onMounted(() => {
  // Puedes realizar inicializaciones adicionales aquí si es necesario
});
</script>
