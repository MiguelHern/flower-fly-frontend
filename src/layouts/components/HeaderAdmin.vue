<script setup>
import { RouterLink } from 'vue-router'
import {  ShoppingCart, Heart, User } from 'lucide-vue-next'
</script>

<template>
  <header
    class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <h1 class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flower Fly
          </h1>
        </RouterLink>
        <ul class="flex **:space-x-2 gap-1">
          <li>
            <RouterLink
              to="/"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 whitespace-nowrap">Inventario</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 whitespace-nowrap">Ajustes</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 whitespace-nowrap">Pedidos</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

  </header>
</template>

<style scoped></style>
