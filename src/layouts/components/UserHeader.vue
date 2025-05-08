<script setup>
import { RouterLink } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {  ShoppingCart, Box, User } from 'lucide-vue-next'
import LogOutButton from '@/components/common/LogOutButton.vue'


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
        <ul class="flex **:space-x-2 gap-1 items-center">
          <li>
            <RouterLink
              to="/"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <User />
              <span class="flex-1 whitespace-nowrap">Mi cuenta</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/cart"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <ShoppingCart />
              <span class="flex-1 whitespace-nowrap">Carrito</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/orders-user"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <Box />
              <span class="flex-1 whitespace-nowrap">Pedidos</span>
            </RouterLink>
          </li>
          <li>
            <LogOutButton/>
          </li>
        </ul>
      </div>
    </nav>

    <nav class="bg-pink-50 dark:bg-gray-700">
      <div class="max-w-screen-xl px-4 py-3 mx-auto">
        <div class="flex items-center">
          <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
            <li>
              <RouterLink
                to="/"
                class="text-gray-900 dark:text-white hover:underline"
                aria-current="page"
              >Inicio</RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'bouquets' }"
                class="text-gray-900 dark:text-white hover:underline"
              >
                <span class="flex-1 whitespace-nowrap">Ramo</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'custom-bouquets' }"
                class="text-gray-900 dark:text-white hover:underline"
              >
                <span class="flex-1 whitespace-nowrap">Personaliza tu ramo</span>
              </RouterLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
