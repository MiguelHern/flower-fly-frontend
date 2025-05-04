<template>
  <div class="w-full grid grid-cols-3 items-center gap-8">
    <div class="col-span-2 mt-0 h-full">
      <flowers-bouquet/>
    </div>
    <div class="col-span-1 mt-0 h-full">
      <SummaryBouquet/>
    </div>
  </div>
</template>

<script setup>

import FlowersBouquet from '@/features/bouquets/components/FlowersBouquet.vue'
import SummaryBouquet from '@/features/bouquets/components/SummaryBouquet.vue'


</script>
