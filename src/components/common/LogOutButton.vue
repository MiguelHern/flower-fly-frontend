<script setup>

import { logOut } from '@/router/Utils.js'
import Button from '@/components/ui/ButtonBase.vue'
</script>

<template>
  <Button
    @click="logOut()"
    data-tooltip-target="Sesion"
    variant="outline"
    to="/cart"
    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
  >
    <span class="flex-1 whitespace-nowrap">Cerrar sesión</span>
  </Button>
</template>

<style scoped>

</style>
