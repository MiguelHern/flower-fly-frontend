<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'
import InventoryForm from '@/features/admin/components/InventoryForm.vue'

const isOpen = ref(false)

function setIsOpen(value) {
  isOpen.value = value
}

</script>

<template>
  <div class="overflow-x-auto mb-5 style_scroll">
    <Dialog :open="isOpen" @close="setIsOpen">
      <DialogPanel>
        <DialogTitle>Deactivate account</DialogTitle>
        <DialogDescription>
          This will permanently deactivate your account
        </DialogDescription>

        <p>
          <InventoryForm/>
        </p>

        <button @click="setIsOpen(false)">Deactivate</button>
        <button @click="setIsOpen(false)">Cancel</button>
      </DialogPanel>
    </Dialog>
    <button @click="setIsOpen(true)">Deactivate</button>

    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b">
      <tr>
        <th scope="col" class="py-3 px-4">Nombre</th>
        <th scope="col" class="py-3 px-4">Tipo</th>
        <th scope="col" class="py-3 px-4">Precio</th>
        <th scope="col" class="py-3 px-4">Descripción</th>
        <th scope="col" class="py-3 px-4">Stock</th>
      </tr>
      </thead>
      <tbody>
      <!-- Aquí irán las filas de productos -->
      <tr>
        <td colspan="5" class="py-4 text-center text-gray-400">Esperando datos...</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
