<script setup>

</script>

<template>
  <!-- component -->
  <div class="bg-gray-100 flex justify-center items-center h-screen">
    <!-- Left: Image -->
    <div class="w-1/2 h-screen hidden lg:block">
      <img src="https://res.cloudinary.com/djfokdod6/image/upload/f_webp,q_auto:good,w_500/v1746248087/31f88fa2944166e13d1d42e57cab31e9e5a36ab8_ojv02a.png" alt="Floreria" class="object-cover w-full h-full">
    </div>
    <!-- Right: Login Form -->
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 h-full ">
      <h1 class="text-center text-5xl">Flower Fly</h1>
      <div class="flex flex-col justify-center h-full">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
