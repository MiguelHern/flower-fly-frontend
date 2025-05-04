<script setup>
import router from '@/router/index.js'
import { Flower2 } from 'lucide-vue-next'
</script>

<template>
  <div class="w-full flex items-center justify-center">
    <div class="w-[70%]">
      <div class="mb-7">
        <div class="flex items-center justify-center mb-2">
          <Flower2 class="h-10 w-10 text-pink-500" />
        </div>
        <h1 class="text-3xl text-center font-bold text-pink-700">Florería Flower Fly</h1>
        <h3 class="text-center text-gray-500">Ingresa a tu cuenta para realizar pedidos</h3>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium">Correo electrónico</label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="tu@email.com"
            required
            class="text-sm text-gray-400 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium">Contraseña</label>
            <a href="#" class="text-sm text-pink-600 hover:text-pink-800">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            class="text-sm text-gray-400 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>
        <button
          type="submit"
          class="w-full cursor-pointer py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md"
        >
          Iniciar sesión
        </button>
      </form>

      <div class="mt-6 text-center">
        <span class="text-sm text-gray-500">¿No tienes cuenta? </span>
        <button @click="router.push({ name: 'register' })" class="text-sm cursor-pointer text-gray-900 dark:text-white hover:underline">
          Regístrate
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
