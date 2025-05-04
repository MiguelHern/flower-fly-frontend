<template>
  <div class="space-y-8">
    <div class="bg-stone-50 p-6 rounded-lg mb-6">
      <h2 class="font-serif text-xl mb-2">Selecciona tus flores</h2>
      <p class="text-muted-foreground text-sm">Añade la cantidad que desees de cada tipo de flor</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div v-for="(flor, index) in flores" :key="index" class="relative group border rounded-lg overflow-hidden ring-1 ring-black">
        <img :src="flor.img" alt="flor.name" width="400" height="300" class="object-cover w-full aspect-[4/3]" />
        <div class="absolute top-2 right-2 bg-black text-white">{{ flor.cantidad }}</div>
        <div class="p-4">
          <h3 class="font-serif">{{ flor.name }}</h3>
          <p class="text-sm text-muted-foreground">{{ '$' + flor.precio }}</p>
          <div class="flex items-center justify-between mt-3">
            <div class="flex items-center space-x-2">
              <button class="h-8 w-8 border-2 rounded-full flex items-center justify-center" @click="decrementar(index)" :disabled="flor.cantidad === 0">
                <Minus class="h-4 w-4" />
              </button>
              <span class="w-8 text-center">{{ flor.cantidad }}</span>
              <button class="h-8 w-8 border-2 rounded-full flex items-center justify-center" @click="incrementar(index)">
                <Plus class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Minus, Plus } from 'lucide-vue-next';

// Mock de flores
const flores = ref([
  {
    name: 'Rosa',
    img: 'https://res.cloudinary.com/djfokdod6/image/upload/f_webp/v1738641878/1f850362-b9c8-44d6-8d98-3ae7ce62d6ba-removebg-preview_g9fsyg.png',
    precio: 10,
    cantidad: 2
  },
  {
    name: 'Tulipán',
    img: 'https://res.cloudinary.com/djfokdod6/image/upload/f_webp/v1738641878/1f850362-b9c8-44d6-8d98-3ae7ce62d6ba-removebg-preview_g9fsyg.png',
    precio: 15,
    cantidad: 1
  }
]);

// Función para incrementar la cantidad de flores
const incrementar = (index) => {
  flores.value[index].cantidad++;
};

// Función para decrementar la cantidad de flores
const decrementar = (index) => {
  if (flores.value[index].cantidad > 0) {
    flores.value[index].cantidad--;
  }
};
</script>
