<template>
  <div class="space-y-8">
    <div class="bg-stone-50 p-6 rounded-lg mb-6">
      <h2 class="font-serif text-xl mb-2">Selecciona el envoltorio</h2>
      <p class="text-muted-foreground text-sm">El toque final para tu arreglo floral</p>
    </div>

    <RadioGroup v-model="selectedWrapper" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="envoltorio in envoltorios" :key="envoltorio.id" class="relative">
        <RadioGroupOption :value="envoltorio.id" :id="'wrap-' + envoltorio.id" class="peer sr-only" />
        <RadioGroupLabel :for="'wrap-' + envoltorio.id" class="flex flex-col border rounded-lg overflow-hidden cursor-pointer peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-black">
          <img :src="envoltorio.image || '/placeholder.svg'" :alt="envoltorio.name" width="400" height="300" class="object-cover w-full aspect-[4/3]" />
          <div class="p-4">
            <h3 class="font-serif">{{ envoltorio.name }}</h3>
            <p class="text-sm text-muted-foreground">{{ envoltorio.description }}</p>
            <p class="text-sm mt-1">+ €{{ envoltorio.price }}</p>
          </div>
        </RadioGroupLabel>
      </div>
    </RadioGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'

const selectedWrapper = ref(null);
const envoltorios = ref([
  {
    id: 1,
    name: 'Envoltorio Clásico',
    description: 'Un envoltorio elegante y atemporal, perfecto para cualquier ocasión.',
    price: 2.5,
    image: 'https://res.cloudinary.com/demo/image/upload/v1618274426/wrap1.jpg',
  },
  {
    id: 2,
    name: 'Envoltorio Moderno',
    description: 'Un diseño minimalista y sofisticado para un toque contemporáneo.',
    price: 3.0,
    image: 'https://res.cloudinary.com/demo/image/upload/v1618274426/wrap2.jpg',
  },
  {
    id: 3,
    name: 'Envoltorio Tropical',
    description: 'Colores vibrantes y motivos exóticos para una presentación única.',
    price: 3.5,
    image: 'https://res.cloudinary.com/demo/image/upload/v1618274426/wrap3.jpg',
  },
]);
</script>
