<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        @keydown.esc="$emit('close')"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
      >
        <Transition name="modal-scale">
          <div
            class="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto relative"
            v-show="modelValue"
            @click.stop
          >
            <!-- El contenido del modal se pasa como slot predeterminado -->
            <slot></slot>

            <!-- Botón de cierre absoluto en la esquina superior derecha -->
            <button
              v-if="!hideCloseButton"
              class="absolute top-3 right-3 text-gray-500 hover:text-black p-1 rounded-full hover:bg-gray-100"
              @click="$emit('close')"
              aria-label="Cerrar modal"
              type="button"
            >
              &times;
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  hideCloseButton: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close', 'update:modelValue', 'submitted'])
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-scale-enter-active,
.modal-scale-leave-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}
.modal-scale-enter-from,
.modal-scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>
