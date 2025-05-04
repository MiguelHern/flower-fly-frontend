// components/OrderSummary.vue
<template>
  <div class="bg-gray-50 rounded-lg p-6">
    <h2 class="text-lg font-medium text-gray-900 mb-6">Resumen del pedido</h2>

    <div class="space-y-4">
      <div class="flex justify-between">
        <p class="text-base text-gray-500">Subtotal</p>
        <p class="text-base font-medium text-gray-900">${{ subtotal.toFixed(2) }}</p>
      </div>

      <div class="flex justify-between">
        <div class="flex">
          <p class="text-base text-gray-500">Costo de envío</p>
          <button type="button" class="ml-2 text-gray-400 hover:text-gray-500">
            <span class="sr-only">Más información sobre el envío</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <p class="text-base font-medium text-gray-900">${{ shipping.toFixed(2) }}</p>
      </div>

      <div class="flex justify-between">
        <div class="flex">
          <p class="text-base text-gray-500">Impuestos</p>
          <button type="button" class="ml-2 text-gray-400 hover:text-gray-500">
            <span class="sr-only">Más información sobre impuestos</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <p class="text-base font-medium text-gray-900">${{ tax.toFixed(2) }}</p>
      </div>

      <div class="border-t border-gray-200 pt-4 flex justify-between">
        <p class="text-base font-medium text-gray-900">Total del pedido</p>
        <p class="text-base font-medium text-gray-900">${{ total.toFixed(2) }}</p>
      </div>
    </div>

    <div class="mt-6">
      <ButtonBase type="button"
        class="w-full ">
        Proceder al pago
      </ButtonBase>
    </div>
  </div>
</template>

<script setup>
import ButtonBase from '@/components/ui/ButtonBase.vue'

defineProps({
  subtotal: {
    type: Number,
    required: true
  },
  shipping: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})
</script>
