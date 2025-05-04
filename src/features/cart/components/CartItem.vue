// components/CartItem.vue
<template>
  <div class="border-t border-gray-200 py-6">
    <div class="flex items-start">
      <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img :src="item.image" :alt="item.name" class="h-full w-full object-cover object-center" />
      </div>

      <div class="ml-4 flex flex-1 flex-col">
        <div class="flex justify-between">
          <div>
            <h3 class="text-base font-medium text-gray-900">{{ item.name }}</h3>
            <p class="mt-1 text-sm text-gray-500">{{ item.color }}</p>
            <p v-if="item.size" class="mt-1 text-sm text-gray-500">{{ item.size }}</p>
            <p class="mt-1 text-sm font-medium text-gray-900">${{ item.price.toFixed(2) }}</p>
          </div>

          <div class="flex">
            <button @click="$emit('remove')" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Eliminar</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="flex flex-1 items-end justify-between text-sm">
          <div class="flex items-center">
            <div v-if="item.inStock" class="flex items-center text-green-500">
              <svg class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
              <span>En stock</span>
            </div>
            <div v-else class="flex items-center text-gray-500">
              <svg class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd" />
              </svg>
              <span>Envío en {{ item.shipsIn }}</span>
            </div>
          </div>

          <div class="flex items-center">
            <Listbox :modelValue="item.quantity" @update:modelValue="handleQuantityChange">
              <div class="relative">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span class="block truncate">{{ item.quantity }}</span>
                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                  leave-to-class="opacity-0">
                  <ListboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    <ListboxOption v-for="n in 10" :key="n" :value="n" v-slot="{ active, selected }" as="template">
                      <li :class="[
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4'
                      ]">
                        <span :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate'
                        ]">
                          {{ n }}
                        </span>
                        <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['remove', 'update:quantity'])

const handleQuantityChange = (value) => {
  emit('update:quantity', value)
}
</script>
