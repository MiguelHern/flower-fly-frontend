<script setup>
import { RouterLink } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {  ShoppingCart, Heart, User } from 'lucide-vue-next'
import Button from '@/components/ui/ButtonBase.vue'
import { logOut } from '@/router/Utils.js'
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
              <User />
              <span class="flex-1 whitespace-nowrap">Mi cuenta</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <Heart />
              <span class="flex-1 whitespace-nowrap">Favoritos</span>
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
            <Button
              @click="logOut()"
              data-tooltip-target="Sesion"
              variant="outline"
              to="/cart"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 whitespace-nowrap">Cerrar sesión</span>
            </Button>
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
            <li>
              <a href="#" class="text-gray-900 dark:text-white hover:underline">Decoración</a>
            </li>
            <li>
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton class="text-gray-900 dark:text-white hover:underline">
                    Opciones
                  </MenuButton>
                </div>

                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50"
                  >
                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                        <RouterLink
                          to="/editar"
                          :class="[
                            active ? 'bg-violet-500 text-white' : 'text-gray-900',
                            'block w-full text-left rounded-md px-2 py-2 text-sm',
                          ]"
                        >
                          Editar
                        </RouterLink>
                      </MenuItem>
                    </div>
                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                        <RouterLink
                          to="/archivar"
                          :class="[
                            active ? 'bg-violet-500 text-white' : 'text-gray-900',
                            'block w-full text-left rounded-md px-2 py-2 text-sm',
                          ]"
                        >
                          Archivar
                        </RouterLink>
                      </MenuItem>
                    </div>
                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                        <RouterLink
                          to="/opcion-extra"
                          :class="[
                            active ? 'bg-violet-500 text-white' : 'text-gray-900',
                            'block w-full text-left rounded-md px-2 py-2 text-sm',
                          ]"
                        >
                          Otra opción
                        </RouterLink>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
