<template>
  <ModalUi :model-value="modelValue" @close="$emit('close')">
    <div class="bg-white p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Flor</h2>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="name" class="form-label">Nombre</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="form-input"
            :class="{ 'border-red-500': errors.name }"
          />
          <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
        </div>

        <div>
          <label for="price" class="form-label">Precio</label>
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              id="price"
              v-model="form.price"
              type="number"
              step="0.01"
              class="form-input pl-7"
              :class="{ 'border-red-500': errors.price }"
            />
          </div>
          <p v-if="errors.price" class="mt-1 text-sm text-red-600">{{ errors.price }}</p>
        </div>

        <div>
          <label for="stock" class="form-label">Stock</label>
          <input
            id="stock"
            v-model="form.stock"
            type="number"
            min="0"
            class="form-input"
            :class="{ 'border-red-500': errors.stock }"
          />
          <p v-if="errors.stock" class="mt-1 text-sm text-red-600">{{ errors.stock }}</p>
        </div>

        <div>
          <label for="type" class="form-label">Tipo</label>
          <select
            id="type"
            v-model="form.type"
            class="form-input"
            :class="{ 'border-red-500': errors.type }"
          >
            <option value="" disabled>Seleccione un tipo</option>
            <option v-for="type in flowerTypes" :key="type" :value="type">{{ type }}</option>
          </select>
          <p v-if="errors.type" class="mt-1 text-sm text-red-600">{{ errors.type }}</p>
        </div>

        <div>
          <label for="color" class="form-label">Color</label>
          <select
            id="color"
            v-model="form.color"
            class="form-input"
            :class="{ 'border-red-500': errors.color }"
          >
            <option value="" disabled>Seleccione un color</option>
            <option v-for="color in flowerColors" :key="color" :value="color">{{ color }}</option>
          </select>
          <p v-if="errors.color" class="mt-1 text-sm text-red-600">{{ errors.color }}</p>
        </div>

        <div>
          <label class="form-label mb-1">Temporadas</label>
          <div class="flex flex-wrap gap-4">
            <div v-for="season in seasons" :key="season.id" class="flex items-center">
              <input
                type="checkbox"
                :id="season.label"
                :value="season.id"
                v-model="form.season"
                class="form-input h-4 w-4"
              />
              <label :for="season.label" class="form-label ml-2 text-sm">{{ season.label }}</label>
            </div>
          </div>
          <p v-if="errors.season" class="mt-1 text-sm text-red-600">{{ errors.season }}</p>
        </div>

        <div class="w-full">
          <label class="form-label">Imagen</label>
          <div class="mt-1 flex items-center justify-center flex-col">
            <div v-if="imagePreview" class="relative flex-shrink-0 mr-4">
              <img
                :src="imagePreview"
                alt="Previsualización"
                class="h-32 w-32 object-cover rounded-md"
              />
              <button
                type="button"
                @click="removeImage"
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <XIcon class="h-4 w-4" />
              </button>
            </div>
            <label
              for="image-upload"
              class="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
            >
              Seleccionar imagen
              <input
                id="image-upload"
                ref="fileInput"
                type="file"
                accept="image/*"
                class="sr-only"
                @change="handleImageChange"
              />
            </label>
          </div>
          <p v-if="errors.image" class="mt-1 text-sm text-red-600">{{ errors.image }}</p>
        </div>

        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="flex items-center">
              <LoaderIcon class="animate-spin -ml-1 mr-2 h-4 w-4" />
              Guardando...
            </span>
            <span v-else>Guardar</span>
          </button>
        </div>
      </form>
    </div>
  </ModalUi>
  <ToastMessage v-if="toastValue" type="success">
    <span>Elemento agregado</span>
  </ToastMessage>
</template>

<script setup>
import { ref, reactive } from 'vue'
import * as yup from 'yup'
import { XIcon, LoaderIcon } from 'lucide-vue-next'
import { bouquetCommand } from '@/api/bouquet/bouquetCommand.js'
import ModalUi from '@/components/ui/ModalUi.vue'
import ToastMessage from '@/components/ui/ToastMessage.vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'update:modelValue', 'submitted'])

const fileInput = ref(null)
const imagePreview = ref(null)
const imageFile = ref(null)
const isSubmitting = ref(false)

const toastState = reactive({
  visible: false,
  message: '',
  type: 'info',
})

const showToast = (message, type = 'info') => {
  toastState.message = message
  toastState.type = type
  toastState.visible = true
  setTimeout(() => {
    toastState.visible = false
  }, 3000)
}

const flowerTypes = [
  'Rosa',
  'Tulipán',
  'Girasol',
  'Lirio',
  'Margarita',
  'Clavel',
  'Orquídea',
  'Dalia',
]
const flowerColors = ['Amarillo', 'Rosa', 'Rojo', 'Blanco']
const seasons = [
  { id: 1, label: 'Primavera' },
  { id: 2, label: 'Verano' },
  { id: 3, label: 'Otoño' },
  { id: 4, label: 'Invierno' },
]

const schema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  price: yup.number().positive('El precio debe ser mayor a 0').required('El precio es obligatorio'),
  stock: yup.number().min(0, 'El stock no puede ser negativo').required('El stock es obligatorio'),
  type: yup.string().required('El tipo es obligatorio'),
  color: yup.string().required('El color es obligatorio'),
  season: yup.array().min(1, 'Seleccione al menos una temporada'),
  image: yup.mixed().required('La imagen es obligatoria'),
})

const form = reactive({
  name: '',
  price: '',
  stock: 0,
  type: '',
  color: '',
  season: [], // Corregido
})

const errors = reactive({
  name: '',
  price: '',
  stock: '',
  type: '',
  color: '',
  season: '',
  image: '',
})

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!file.type.includes('image/')) {
    errors.image = 'El archivo debe ser una imagen'
    return
  }

  imageFile.value = file
  errors.image = ''

  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
  imagePreview.value = URL.createObjectURL(file)
}

const removeImage = () => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
  imagePreview.value = null
  imageFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const closeModal = () => {
  resetForm()
  emit('close')
}

const resetForm = () => {
  Object.keys(form).forEach((key) => {
    form[key] = key === 'stock' ? 0 : key === 'season' ? [] : ''
  })
  removeImage()
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
}

const validateForm = async () => {
  try {
    await schema.validate(
      {
        ...form,
        image: imageFile.value,
      },
      { abortEarly: false },
    )

    Object.keys(errors).forEach((key) => {
      errors[key] = ''
    })

    return true
  } catch (validationErrors) {
    validationErrors.inner.forEach((error) => {
      errors[error.path] = error.message
    })

    return false
  }
}
const toastValue = ref(false)
const handleSubmit = async () => {
  const isValid = await validateForm()

  if (!isValid) return

  isSubmitting.value = true

  try {
    const result = await bouquetCommand.createFlower(
      form.name,
      form.price,
      imageFile.value,
      form.type,
      form.color,
      form.season,
      form.stock,
    )

    if (result !== null) {
      showToast(result, 'error')
    } else {
      showToast('Flor creada con éxito', 'success')
      emit('submitted', result)
      resetForm()
      emit('close')
    }
  } catch (error) {
    showToast('Error al crear la flor', 'error')
    console.error(error)
  } finally {
    isSubmitting.value = false
    emit('submitted')
    emit('close')
  }
}
</script>
