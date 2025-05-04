<script setup>
import { Flower2 } from 'lucide-vue-next';
</script>

<template>
  <!-- component -->
  <div class="bg-white flex justify-center items-center h-screen">
    <!-- Left: Image -->
    <div class="w-full h-full md:w-1/2 relative flex items-center justify-center">
      <img src="/src/assets/img/flowers.png" alt="Arreglo floral hermoso" class="w-2xl object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-pink-500/60 to-transparent flex flex-col items-center justify-end pb-8 px-4">
        <h2 class="text-white text-5xl font-bold text-center drop-shadow-lg mb-2">Flower Fly</h2>
        <p class="text-white text-xl text-center drop-shadow-md mb-6">"Flores que hablan por ti"</p>
      </div>
    </div>
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 h-full ">

      <div class="flex flex-col justify-center h-full">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
