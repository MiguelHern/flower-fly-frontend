<script setup>

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { Search } from 'lucide-vue-next'
import { ref } from 'vue'

const isOpen = ref(false)

function openModal() {
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}
</script>

<template>

  <Dialog :open="isOpen" @close="closeModal" class="relative z-50">
    <div class="fixed inset-0 bg-black/20" aria-hidden="true" />

    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="mx-auto max-w-md rounded-lg bg-white p-6 shadow-xl">
        <DialogTitle class="mb-4 text-lg font-medium text-gray-900">
          Buscar en nuestra tienda
        </DialogTitle>

        <div class="mb-4">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              class="w-full rounded-md border border-gray-200 py-2 pl-10 pr-4 text-gray-800 shadow-sm focus:border-rose-300 focus:outline-none focus:ring-1 focus:ring-rose-300"
              placeholder="Rosas, tulipanes, lirios..."
              ref="searchInput"
            />
          </div>
        </div>

        <div class="flex justify-end">
          <button
            @click="closeModal"
            class="rounded-md bg-rose-50 px-4 py-2 text-sm text-rose-600 hover:bg-rose-100"
          >
            Cerrar
          </button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<style scoped>

</style>
