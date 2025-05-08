<template>
  <div class="bg-pink-50 p-6 rounded-lg">
    <!-- Información de flores seleccionadas -->
    <div v-if="selectedItems.length === 0" class="text-center py-8 text-muted-foreground">
      <div class="flex flex-col items-center gap-3">
        <ShoppingBagIcon class="h-10 w-10 text-pink-300" />
        <p>Empieza a agregar productos a tu carrito</p>
      </div>
    </div>
    <div v-else>
      <div class="space-y-4 mb-6">
        <h3 class="font-medium text-sm text-muted-foreground">Flores seleccionadas:</h3>
        <div
          v-for="flower in selectedItems"
          :key="flower.id"
          class="flex justify-between items-center py-2 border-b border-pink-100 last:border-0"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 relative rounded-full overflow-hidden bg-white p-1 border border-pink-100"
            >
              <img
                :src="flower.image"
                :alt="flower.name"
                class="object-cover w-full h-full rounded-full"
              />
            </div>
            <div>
              <span class="font-medium text-gray-800">{{ flower.name }}</span>
              <div class="text-xs text-gray-500">Cantidad: {{ flower.quantity }}</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium"
              >${{ (flower.quantity * flower.price).toFixed(2) }}</span
            >
            <button
              @click="removeFlower(flower.id)"
              class="text-gray-400 hover:text-red-500 transition-colors"
            >
              <XIcon class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Precio total -->
      <div class="border-t border-pink-200 pt-4 mt-6">
        <div class="flex justify-between items-center font-medium">
          <span>Total estimado:</span>
          <span class="text-lg text-pink-600">${{ totalPrice.toFixed(2) }}</span>
        </div>

        <div class="flex flex-col gap-3 mt-6">
                    <ButtonBase
                      @click="addFromStore"
                      class="w-full text-white"
                      :class="paymentMethodAdded ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-400 cursor-not-allowed'"
                      :disabled="!paymentMethodAdded"
                    >
                      Ordenar
                    </ButtonBase>
<!--          <ButtonBase @click="addFromStore" class="w-full text-white bg-pink-600 hover:bg-pink-700">-->
<!--            Ordenar-->
<!--          </ButtonBase>-->
          <ButtonBase @click="showCrearFlor = true" class="" variant="secondary">
            Agregar método de pago
          </ButtonBase>
        </div>
        <PaymentForm
          v-if="showCrearFlor"
          :model-value="showCrearFlor"
          @close="showCrearFlor = false"
          @submitted="handleFlorCreada"
        />
      </div>

      <!-- Promociones o información adicional -->
      <div class="mt-6 pt-6 border-t border-pink-200">
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <TruckIcon class="h-4 w-4" />
          <span>Envío gratuito en pedidos +$500</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-600 mt-2">
          <CalendarIcon class="h-4 w-4" />
          <span>Entrega en 24-48 horas</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Notificación de estado (éxito o error) -->
  <ToastMessage type="success" v-if="showNotification">
    <span>{{ messageStatus }}</span>
  </ToastMessage>
</template>

<script setup>
import { computed, ref } from 'vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { ShoppingBagIcon, XIcon, TruckIcon, CalendarIcon } from 'lucide-vue-next'
import { useCartStore } from '@/features/cart/stores/cartStore.js'
import ToastMessage from '@/components/ui/ToastMessage.vue'
import BouquetForm from '@/features/admin/components/inventory/BouquetForm.vue'
import PaymentForm from '@/features/sales/components/PaymentForm.vue'
import { cartCommand } from '@/api/cart/cartCommand.js'
import { ordersCommand } from '@/api/orders/ordersCommand.js'

const showCrearFlor = ref(false)
const paymentMethodAdded = ref(false)

const handleFlorCreada = () => {
  showCrearFlor.value = false
  paymentMethodAdded.value = true
}

// Estado del componente
const spinner = ref(false)
const showNotification = ref(false)
const messageStatus = ref('')
const toastType = ref('success')
const bouquet_name = ref('')

// Utilizar el store para acceder a las flores seleccionadas
const cartStore = useCartStore()

// Computar las flores seleccionadas desde el store
const selectedItems = computed(() => cartStore.selectedItems)

// Calcular el precio total
const totalPrice = computed(() => {
  return selectedItems.value.reduce((total, flower) => total + flower.quantity * flower.price, 0)
})

// Función para eliminar una flor del carrito
const removeFlower = (flowerId) => {
  cartStore.removeSelectedItem(flowerId)
}

const addFromStore = async () => {
  try {
    const items = selectedItems.value.map(item => ({
      bouquetId: item.id,
      quantity: item.quantity
    }))
    const result = await cartCommand.addBulked(items)

    if (result === null) {
      await payCart()
      deleteStorage()
      messageStatus.value = 'Orden creada con éxito'
      toastType.value = 'success'
    } else {
      messageStatus.value = result
      toastType.value = 'error'
    }

    showNotification.value = true
    setTimeout(() => {
      showNotification.value = false
    }, 3000)
  } catch (error) {
    messageStatus.value = 'Error inesperado'
    toastType.value = 'error'
    showNotification.value = true
  }
}

const deleteStorage = () => {
  cartStore.clearSelectedItems() // Limpiar el carrito en el store y en el LSC
}

const payCart = async () => {
  try {
    await ordersCommand.pay()
  } catch (error) {
    console.log(error)
  }
}
</script>
