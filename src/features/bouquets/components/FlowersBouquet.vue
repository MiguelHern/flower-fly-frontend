<template>
  <div class="space-y-8 pt-0 rounded-xl">
    <div class="bg-pink-50 p-8 rounded-lg mb-10 border border-stone-100">
      <div class="flex items-start gap-4">
        <div class="bg-stone-100 p-3 rounded-full">
          <Flower className="h-5 w-5 text-stone-700" />
        </div>
        <div>
          <h2 class="font-serif text-2xl mb-2">Elige el estilo de tu arreglo</h2>
          <p class="text-muted-foreground text-sm">Define la forma y presentación de tus flores</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="(flor, index) in flores"
        :key="index"
        class="relative group bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md border border-pink-100"
      >

        <img
          :src="flor.img"
          :alt="flor.name"
          width="400"
          height="300"
          class="object-cover w-full aspect-[4/3] transition-transform duration-500 group-hover:scale-102"
        />

        <div class="p-5">
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-serif text-xl text-gray-800">{{ flor.name }}</h3>
            <div class="text-pink-600 text-sm font-medium">
              {{ '$' + flor.precio }}
            </div>
          </div>

          <p class="text-gray-500 text-sm mb-4 font-light">Flores frescas cultivadas con cuidado artesanal</p>

          <div class="flex items-center justify-between pt-3 border-t border-gray-100">
            <span class="text-gray-600 text-sm">Cantidad</span>
            <div class="flex items-center space-x-4">
              <button
                class="h-8 w-8 bg-white hover:bg-pink-50 border border-gray-200 rounded-md flex items-center justify-center transition-all duration-200"
                @click="decrementar(index)"
                :disabled="flor.cantidad === 0"
                :class="{'opacity-50 cursor-not-allowed': flor.cantidad === 0}"
              >
                <Minus class="h-3 w-3 text-gray-600" />
              </button>
              <span class="w-6 text-center font-medium text-gray-800">{{ flor.cantidad }}</span>
              <button
                class="h-8 w-8 bg-white hover:bg-pink-50 border border-gray-200 rounded-md flex items-center justify-center transition-all duration-200"
                @click="incrementar(index)"
              >
                <Plus class="h-3 w-3 text-gray-600" />
              </button>
            </div>
          </div>

          <ButtonBase
            class="w-full mt-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2 border border-pink-200"
            @click="agregarAlCarrito(flor)"
            variant="outline"
          >
            <ShoppingBag class="h-4 w-4" />
            Añadir al ramo
          </ButtonBase>
        </div>
      </div>
    </div>

    <div v-if="mensajeVisible" class="fixed bottom-6 right-6 bg-white text-gray-800 p-4 rounded-md shadow-md flex items-center gap-3 animate-fadeIn border border-pink-100">
      <CheckCircle class="h-5 w-5 text-pink-500" />
      <span class="text-sm">Flores añadidas a su selección</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Minus, Plus, ShoppingBag, CheckCircle, Flower } from 'lucide-vue-next';
import ButtonBase from '@/components/ui/ButtonBase.vue'

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

const mensajeVisible = ref(false);

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

// Función para agregar al carrito
const agregarAlCarrito = (flor) => {
  mensajeVisible.value = true;
  setTimeout(() => {
    mensajeVisible.value = false;
  }, 3000);
};
</script>

<style>

body {
  font-family: 'Montserrat', sans-serif;
}

.scale-102 {
  transform: scale(1.02);
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}

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
</style>
