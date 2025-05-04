<template>
  <div class="space-y-8">
    <div class="bg-stone-50 p-6 rounded-lg mb-6">
      <h2 class="font-serif text-xl mb-2">Elige el estilo de tu arreglo</h2>
      <p class="text-muted-foreground text-sm">Define la forma y presentación de tus flores</p>
    </div>

    <RadioGroup v-model="selectedStyle" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="estilo in estilos" :key="estilo.id" class="relative">
        <RadioGroupLabel :value="estilo.id" :id="estilo.id" class="peer sr-only" />
        <RadioGroupOption :for="estilo.id" class="flex flex-col border rounded-lg overflow-hidden cursor-pointer peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-black">
          <img :src="estilo.image || '/placeholder.svg'" :alt="estilo.name" width="400" height="300" class="object-cover w-full aspect-[4/3]" />
          <div class="p-4">
            <h3 class="font-serif">{{ estilo.name }}</h3>
            <p class="text-sm text-muted-foreground">{{ estilo.description }}</p>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';

const selectedStyle = ref(null);
const estilos = ref([
  {
    id: 1,
    name: 'Estilo Clásico',
    description: 'Un arreglo tradicional y elegante con flores seleccionadas a mano.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1618274426/flower1.jpg',
  },
  {
    id: 2,
    name: 'Estilo Moderno',
    description: 'Un toque contemporáneo con flores frescas y minimalistas.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1618274426/flower2.jpg',
  },
  {
    id: 3,
    name: 'Estilo Tropical',
    description: 'Colores vibrantes y flores exóticas que traen un aire tropical.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1618274426/flower3.jpg',
  },
]);
</script>
