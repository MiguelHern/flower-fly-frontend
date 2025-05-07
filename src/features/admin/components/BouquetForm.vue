<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Crear Nuevo Bouquet</h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Nombre -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.name }"
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
      </div>

      <!-- Precio -->
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700">Precio</label>
        <div class="mt-1 relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            id="price"
            v-model="form.price"
            type="number"
            step="0.01"
            class="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            :class="{ 'border-red-500': errors.price }"
          />
        </div>
        <p v-if="errors.price" class="mt-1 text-sm text-red-600">{{ errors.price }}</p>
      </div>

      <!-- Stock -->
      <div>
        <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
        <input
          id="stock"
          v-model="form.stock"
          type="number"
          min="0"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.stock }"
        />
        <p v-if="errors.stock" class="mt-1 text-sm text-red-600">{{ errors.stock }}</p>
      </div>

      <!-- Es personalizable -->
      <div class="flex items-center">
        <input
          id="isCustomizable"
          v-model="form.isCustomizable"
          type="checkbox"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label for="isCustomizable" class="ml-2 block text-sm text-gray-700">
          Es personalizable
        </label>
      </div>

      <!-- Flores -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <label class="block text-sm font-medium text-gray-700">Flores</label>
          <button
            type="button"
            @click="openFlowerModal"
            class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon class="h-4 w-4 mr-1" />
            Agregar flor
          </button>
        </div>

        <div v-if="form.flowers.length === 0" class="text-center py-4 border-2 border-dashed border-gray-300 rounded-md">
          <p class="text-sm text-gray-500">No hay flores agregadas</p>
        </div>

        <div v-else class="space-y-3 max-h-60 overflow-y-auto border border-gray-200 rounded-md p-2">
          <div
            v-for="(flower, index) in form.flowers"
            :key="index"
            class="flex items-center justify-between p-2 bg-gray-50 rounded-md"
          >
            <div class="flex items-center">
              <div class="bg-gray-200 h-10 w-10 rounded-md flex items-center justify-center mr-3">
                <Flower class="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p class="font-medium text-gray-800">{{ flower.name }}</p>
                <p class="text-sm text-gray-500">Cantidad: {{ flower.quantity }}</p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button
                type="button"
                @click="editFlower(index)"
                class="p-1 text-blue-600 hover:text-blue-800"
              >
                <EditIcon class="h-4 w-4" />
              </button>
              <button
                type="button"
                @click="removeFlower(index)"
                class="p-1 text-red-600 hover:text-red-800"
              >
                <TrashIcon class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <p v-if="errors.flowers" class="mt-1 text-sm text-red-600">{{ errors.flowers }}</p>
      </div>

      <!-- Imagen -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Imagen</label>
        <div class="mt-1 flex items-center">
          <div
            v-if="imagePreview"
            class="relative flex-shrink-0 mr-4"
          >
            <img
              :src="imagePreview"
              alt="Previsualización"
              class="h-24 w-24 object-cover rounded-md"
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
            for="bouquet-image-upload"
            class="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
          >
            Seleccionar imagen
            <input
              id="bouquet-image-upload"
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

      <!-- Botones -->
      <div class="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          @click="resetForm"
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

    <!-- Modal para agregar/editar flores -->
    <TransitionRoot appear :show="isFlowerModalOpen" as="template">
      <Dialog as="div" @close="closeFlowerModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  {{ editingFlowerIndex === null ? 'Agregar flor al bouquet' : 'Editar flor del bouquet' }}
                </DialogTitle>

                <div class="mt-4 space-y-4">
                  <!-- Selección de flor -->
                  <div>
                    <label for="flower-select" class="block text-sm font-medium text-gray-700">Flor</label>
                    <select
                      id="flower-select"
                      v-model="selectedFlower"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      :disabled="editingFlowerIndex !== null"
                    >
                      <option value="" disabled>Seleccione una flor</option>
                      <option v-for="flower in availableFlowers" :key="flower.id" :value="flower">
                        {{ flower.name }} - ${{ flower.price }}
                      </option>
                    </select>
                  </div>

                  <!-- Cantidad -->
                  <div>
                    <label for="flower-quantity" class="block text-sm font-medium text-gray-700">Cantidad</label>
                    <input
                      id="flower-quantity"
                      v-model="flowerQuantity"
                      type="number"
                      min="1"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div class="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      @click="closeFlowerModal"
                      class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      @click="addOrUpdateFlower"
                      class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      :disabled="!selectedFlower || flowerQuantity < 1"
                    >
                      {{ editingFlowerIndex === null ? 'Agregar' : 'Actualizar' }}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useToast } from 'vue-toastification';
import * as yup from 'yup';
import { XIcon, PlusIcon, Flower, EditIcon, TrashIcon, LoaderIcon } from 'lucide-vue-next';
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
import { bouquetCommand } from '@/api/bouquetService';

const toast = useToast();
const fileInput = ref(null);
const imagePreview = ref(null);
const imageFile = ref(null);
const isSubmitting = ref(false);

// Estado para el modal de flores
const isFlowerModalOpen = ref(false);
const selectedFlower = ref('');
const flowerQuantity = ref(1);
const editingFlowerIndex = ref(null);

// Esquema de validación
const schema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  price: yup.number().positive('El precio debe ser mayor a 0').required('El precio es obligatorio'),
  stock: yup.number().min(0, 'El stock no puede ser negativo').required('El stock es obligatorio'),
  flowers: yup.array().min(1, 'Debe agregar al menos una flor').required('Debe agregar flores'),
  image: yup.mixed().required('La imagen es obligatoria')
});

// Estado del formulario
const form = reactive({
  name: '',
  price: '',
  stock: 0,
  isCustomizable: false,
  flowers: []
});

// Estado de errores
const errors = reactive({
  name: '',
  price: '',
  stock: '',
  flowers: '',
  image: ''
});

// Simulación de flores disponibles (en un caso real, estos datos vendrían de una API)
const availableFlowers = [
  { id: 1, name: 'Rosa Roja', price: 5.99 },
  { id: 2, name: 'Tulipán Blanco', price: 4.50 },
  { id: 3, name: 'Girasol', price: 6.75 },
  { id: 4, name: 'Lirio Blanco', price: 7.25 },
  { id: 5, name: 'Margarita', price: 3.50 },
  { id: 6, name: 'Orquídea', price: 12.99 }
];

// Manejar cambio de imagen
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validar tipo de archivo
  if (!file.type.includes('image/')) {
    errors.image = 'El archivo debe ser una imagen';
    return;
  }

  imageFile.value = file;
  errors.image = '';

  // Crear URL para previsualización
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value);
  }
  imagePreview.value = URL.createObjectURL(file);
};

// Eliminar imagen
const removeImage = () => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value);
  }
  imagePreview.value = null;
  imageFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// Resetear formulario
const resetForm = () => {
  form.name = '';
  form.price = '';
  form.stock = 0;
  form.isCustomizable = false;
  form.flowers = [];
  removeImage();
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });
};

// Abrir modal para agregar flor
const openFlowerModal = () => {
  selectedFlower.value = '';
  flowerQuantity.value = 1;
  editingFlowerIndex.value = null;
  isFlowerModalOpen.value = true;
};

// Cerrar modal de flor
const closeFlowerModal = () => {
  isFlowerModalOpen.value = false;
};

// Editar flor
const editFlower = (index) => {
  const flower = form.flowers[index];
  const originalFlower = availableFlowers.find(f => f.id === flower.id);
  selectedFlower.value = originalFlower;
  flowerQuantity.value = flower.quantity;
  editingFlowerIndex.value = index;
  isFlowerModalOpen.value = true;
};

// Eliminar flor
const removeFlower = (index) => {
  form.flowers.splice(index, 1
