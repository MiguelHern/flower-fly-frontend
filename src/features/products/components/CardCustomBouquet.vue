<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="container mx-auto py-16">
    <div class="bg-stone-50 p-8 md:p-16 flex flex-col md:flex-row gap-8 items-center rounded-4xl">
      <div class="md:w-1/2">
        <h2 class="text-3xl font-light mb-4">Arma tu Ramo</h2>
        <p class="text-muted-foreground mb-6">
          Crea el ramo perfecto para esa persona especial. Combina tus flores favoritas, elige el estilo que más te
          guste y
          déjanos ayudarte a expresar tus sentimientos de la manera más hermosa. Cada flor cuenta una historia, ¿cuál
          será la tuya?
        </p>
        <RouterLink to="">
          <button class="bg-black hover:bg-black/80 text-white px-4 py-2 rounded transition-colors">
            Crear mi ramo
          </button>
        </RouterLink>
      </div>
      <div class="md:w-1/2">
        <img
          src="https://res.cloudinary.com/djfokdod6/image/upload/f_webp/v1738641878/1f850362-b9c8-44d6-8d98-3ae7ce62d6ba-removebg-preview_g9fsyg.png"
          alt="Ramo personalizado" class="w-full h-auto object-cover rounded-xl bg-white" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
