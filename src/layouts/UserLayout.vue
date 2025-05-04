<script setup>

import UserHeader from '@/layouts/components/UserHeader.vue'
import UserFooter from '@/layouts/components/UserFooter.vue'
</script>

<template>
  <UserHeader/>
  <body class="p-4">
    <div class="p-4 dark:border-gray-700 mt-28">
      <router-view/>
    </div>
  </body>
  <UserFooter/>
</template>

<style scoped>

</style>
