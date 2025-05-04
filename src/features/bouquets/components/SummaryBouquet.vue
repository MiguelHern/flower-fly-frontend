<template>
  <div class="bg-pink-50 p-6 rounded-lg">
    <!-- Información de flores seleccionadas -->
    <div v-if="selectedFlowers.length === 0" class="text-center py-8 text-muted-foreground">
      <p>Aún no has seleccionado ninguna flor</p>
    </div>
    <div v-else>
      <div class="space-y-4 mb-6">
        <h3 class="font-medium text-sm text-muted-foreground">Flores seleccionadas:</h3>
        <div v-for="flower in selectedFlowers" :key="flower.id" class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 relative rounded-full overflow-hidden">
              <img :src="flower.image" :alt="flower.name" class="object-cover" />
            </div>
            <span>{{ flower.name }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-sm">{{ flower.quantity }} × €{{ flower.price }}</span>
          </div>
        </div>
      </div>

      <!-- Precio total -->
      <div class="border-t pt-4 mt-6">
        <div class="flex justify-between items-center font-medium">
          <span>Total estimado:</span>
          <span>${{ totalPrice.toFixed(2) }}</span>
        </div>
      </div>
      <Button class="w-full text-white mt-4" >Agregar al carrito</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from '@/components/ui/ButtonBase.vue';

const selectedFlowers = ref([
  { id: 1, name: 'Rosa roja', quantity: 3, price: 3.5, image: '/images/rosa-roja.jpg' },
  { id: 2, name: 'Lirio', quantity: 2, price: 2.0, image: '/images/lirio.jpg' },
]);

const totalPrice = ref(
  selectedFlowers.value.reduce((total, flower) => total + flower.quantity * flower.price, 0)
);
</script>
