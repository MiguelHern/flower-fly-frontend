<script setup>

import HeaderAdmin from '@/layouts/components/HeaderAdmin.vue'
</script>

<template>
  <HeaderAdmin/>
  <body class="p-4">
  <div class="p-4 dark:border-gray-700 mt-28">
    <router-view/>
  </div>
  </body>
</template>

<style scoped>

</style>
