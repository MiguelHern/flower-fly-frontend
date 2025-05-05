<template>
  <div class="bg-pink-50 p-6 rounded-lg">
    <!-- Información de flores seleccionadas -->
    <div v-if="selectedFlowers.length === 0" class="text-center py-8 text-muted-foreground">
      <div class="flex flex-col items-center gap-3">
        <ShoppingBagIcon class="h-10 w-10 text-pink-300" />
        <p>Aún no has seleccionado ninguna flor</p>
      </div>
    </div>
    <div v-else>
      <div class="space-y-4 mb-6">
        <h3 class="font-medium text-sm text-muted-foreground">Flores seleccionadas:</h3>
        <div
          v-for="flower in selectedFlowers"
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

      <div class="border-t border-pink-200 pt-4 mt-6">
        <div class="flex flex-col gap-3 mt-6">
          <label class="form-label" for="bouquet-name">Agrega un nombre a tu ramo!</label>
          <input class="form-input" v-model="bouquet_name" type="text" />
        </div>
      </div>

      <!-- Precio total -->
      <div class="border-t border-pink-200 pt-4 mt-6">
        <div class="flex justify-between items-center font-medium">
          <span>Total estimado:</span>
          <span class="text-lg text-pink-600">${{ totalPrice.toFixed(2) }}</span>
        </div>

        <div class="flex flex-col gap-3 mt-6">
          <ButtonBase class="w-full text-white bg-pink-600 hover:bg-pink-700">
            Agregar al carrito
          </ButtonBase>
          <ButtonBase @click="createBouquet" class="" variant="outline"> Guardar ramo </ButtonBase>
        </div>
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
import { useFlowerStore } from '@/features/bouquets/stores/flowerStore.js'
import { bouquetCommand } from '@/api/bouquet/bouquetCommand.js'
import ToastMessage from '@/components/ui/ToastMessage.vue'
import * as yup from 'yup'

// Estado del componente
const spinner = ref(false)
const showNotification = ref(false)
const messageStatus = ref('')
const toastType = ref('success')
const bouquet_name = ref('')
const validationErrors = ref({})

// Utilizar el store para acceder a las flores seleccionadas
const flowerStore = useFlowerStore()

// Computar las flores seleccionadas desde el store
const selectedFlowers = computed(() => flowerStore.selectedFlowers)

// Calcular el precio total
const totalPrice = computed(() => {
  return selectedFlowers.value.reduce((total, flower) => total + flower.quantity * flower.price, 0)
})

// Función para eliminar una flor del carrito
const removeFlower = (flowerId) => {
  flowerStore.removeSelectedFlower(flowerId)
}

const bouquetSchema = yup.object({
  name: yup.string().required('El nombre del ramo es obligatorio').min(3, 'El nombre debe tener al menos 3 caracteres'),
  flowers: yup.array().min(1, 'Debes seleccionar al menos una flor')
})

const validateForm = async () => {
  try {
    await bouquetSchema.validate(
      {
        name: bouquet_name.value,
        flowers: selectedFlowers.value
      },
      { abortEarly: false }
    )
    validationErrors.value = {}
    return true
  } catch (error) {
    // Convertir los errores de Yup a un objeto más fácil de usar
    const newErrors = {}
    if (error.inner) {
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message
      })
    }
    validationErrors.value = newErrors
    return false
  }
}

const createBouquet = async () => {
  spinner.value = true
  messageStatus.value = ''

  const isValid = await validateForm()

  if (!isValid) {
    const firstError = Object.values(validationErrors.value)[0]
    messageStatus.value = firstError
    toastType.value = 'error'
    showNotification.value = true
    spinner.value = false
    return
  }

  try {
    const price = totalPrice.value
    const stock = 1
    const isCustomizable = true
    const flowers = selectedFlowers.value
    const name = bouquet_name.value

    await bouquetCommand.createBouquet(name, price, stock, isCustomizable, flowers)

    messageStatus.value = '¡Ramo guardado correctamente!'
    toastType.value = 'success'
    showNotification.value = true

    bouquet_name.value = ''
    flowerStore.clearSelectedFlowers()
  } catch (error) {
    messageStatus.value = error?.message || 'Ocurrió un error al guardar el ramo'
    toastType.value = 'error'
    showNotification.value = true
  } finally {
    spinner.value = false

    setTimeout(() => {
      showNotification.value = false
    }, 3000)
  }
}
</script>
