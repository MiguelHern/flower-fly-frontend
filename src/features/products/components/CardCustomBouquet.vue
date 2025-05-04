<script setup>
import { RouterLink } from 'vue-router'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { Flower2 } from 'lucide-vue-next'
</script>

<template>
  <section class="container mx-auto py-16">
    <div class="p-8 md:p-16 flex flex-col md:flex-row gap-8 items-center card-lg">
      <div class="md:w-1/2">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
            <Flower2 class="text-rose-500 h-5 w-5" />
          </div>
          <div class="h-px flex-grow bg-rose-200"></div>
        </div>
        <h2 class="text-5xl font-bold text-rose-500 mb-4">Arma tu Ramo</h2>
        <p class="text-muted-foreground mb-6">
          Crea el ramo perfecto para esa persona especial. Combina tus flores favoritas, elige el estilo que más te
          guste y
          déjanos ayudarte a expresar tus sentimientos de la manera más hermosa. Cada flor cuenta una historia, ¿cuál
          será la tuya?
        </p>
        <RouterLink to="">
          <ButtonBase class="">
            Personalizar
          </ButtonBase>
        </RouterLink>
      </div>
      <div class="md:w-1/2 rotate-45 ">
        <img
          src="https://res.cloudinary.com/djfokdod6/image/upload/v1746389071/image-from-rawpixel-id-13714567-png_omlfen.png"
          alt="Ramo personalizado" class="w-full h-auto object-cover rounded-xl" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
