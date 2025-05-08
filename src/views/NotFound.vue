<script setup>
import { Flower, Home } from 'lucide-vue-next'
import router from '@/router/index.js'

</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-white to-white p-4">
    <div class="mx-auto max-w-md text-center">
      <div class="mb-8 inline-flex items-center justify-center rounded-full bg-white p-3 shadow-sm">
        <div class="relative">
          <Flower class="h-12 w-12 text-rose-300" :stroke-width="1.5" />
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="h-1.5 w-1.5 rounded-full bg-rose-500"></div>
          </div>
        </div>
      </div>

      <h1 class="mb-2 text-5xl font-extralight text-gray-800">404</h1>
      <h2 class="mb-4 text-xl font-light text-gray-700">
        Rosa marchita
      </h2>
      <p class="mb-8 text-gray-500">
        Lo sentimos, la página que buscas se ha marchitado o nunca floreció.
      </p>

      <div class="mb-8 flex justify-center space-x-4">
        <button
          @click="()=> router.push('/')"
          class="inline-flex items-center rounded-md bg-rose-50 px-5 py-2 text-sm text-rose-600 shadow-sm transition-all hover:bg-rose-100"
        >
          <Home class="mr-2 h-4 w-4" />
          Regresar al inicio
        </button>
      </div>

      <div class="text-sm text-gray-400">
        <p>¿Necesitas un ramo fresco? Visita nuestra colección.</p>
      </div>
    </div>
  </div>
</template>
