<template>
  <ModalUi :model-value="modelValue" @close="$emit('close')">
  <div class="w-full mx-auto">
    <div class="bg-white rounded-xl shadow-xl overflow-hidden">
      <div
        class="relative h-48 transition-all duration-700"
        :class="cardFlipped ? 'opacity-0' : 'opacity-100'"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 p-6 flex flex-col justify-between">
          <div class="absolute top-0 left-0 w-full h-full bg-black opacity-10 pattern-dots-lg"></div>

          <div class="flex justify-between items-start relative z-10">
            <div class="text-white text-lg font-bold">Tarjeta de Pago</div>
            <div class="flex space-x-2">
              <div
                class="w-10 h-6 rounded flex items-center justify-center"
                :class="cardType === 'visa' ? 'bg-blue-100' : 'bg-white/20 backdrop-blur-sm'"
              >
                <span
                  class="text-xs font-bold"
                  :class="cardType === 'visa' ? 'text-blue-800' : 'text-white'"
                >
                  VISA
                </span>
              </div>
              <div
                class="w-10 h-6 rounded flex items-center justify-center"
                :class="cardType === 'mastercard' ? 'bg-red-100' : 'bg-white/20 backdrop-blur-sm'"
              >
                <span
                  class="text-xs font-bold"
                  :class="cardType === 'mastercard' ? 'text-red-800' : 'text-white'"
                >
                  MC
                </span>
              </div>
              <div
                class="w-10 h-6 rounded flex items-center justify-center"
                :class="cardType === 'amex' ? 'bg-blue-100' : 'bg-white/20 backdrop-blur-sm'"
              >
                <span
                  class="text-xs font-bold"
                  :class="cardType === 'amex' ? 'text-blue-800' : 'text-white'"
                >
                  AMEX
                </span>
              </div>
            </div>
          </div>

          <div class="relative z-10">
            <div class="text-white/80 text-xs mb-1">Número de Tarjeta</div>
            <div class="text-white text-xl tracking-wider font-mono">{{ cardNumber || "•••• •••• •••• ••••" }}</div>

            <div class="flex justify-between mt-4">
              <div>
                <div class="text-white/80 text-xs">Titular</div>
                <div class="text-white">{{ name || "NOMBRE DEL TITULAR" }}</div>
              </div>
              <div>
                <div class="text-white/80 text-xs">Expira</div>
                <div class="text-white">
                  {{ expMonth ? expMonth : "MM" }}/{{ expYear ? expYear : "AA" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="absolute inset-0 h-48 transition-all duration-700"
        :class="cardFlipped ? 'opacity-100' : 'opacity-0'"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 flex flex-col">
          <div class="h-12 bg-black mt-10"></div>
          <div class="relative mt-6 mx-6">
            <div class="bg-white/80 h-10 rounded-sm flex items-center justify-end pr-4">
              <div class="font-mono text-gray-800 tracking-widest">{{ cvc || "•••" }}</div>
            </div>
            <div class="text-white/80 text-xs mt-2 text-right">Código de seguridad</div>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-2">
            <label for="card-name" class="text-sm font-medium text-gray-700 flex items-center">
              Nombre del titular
              <CheckCircle2 v-if="name.length > 3" class="ml-2 h-4 w-4 text-green-500" />
            </label>
            <input
              id="card-name"
              v-model="name"
              @focus="focused = 'name'"
              @blur="focused = ''"
              placeholder="Como aparece en la tarjeta"
              class="w-full px-3 py-2 border rounded-md transition-all duration-200"
              :class="[
                'border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50',
                focused === 'name' ? 'border-rose-500 ring-1 ring-rose-500' : ''
              ]"
              required
            />
          </div>

          <div class="space-y-2">
            <label for="card-number" class="text-sm font-medium text-gray-700 flex items-center">
              Número de tarjeta
              <CheckCircle2 v-if="cardNumber.replace(/\s/g, '').length >= 15" class="ml-2 h-4 w-4 text-green-500" />
            </label>
            <div class="relative">
              <input
                id="card-number"
                v-model="cardNumber"
                @input="handleCardNumberChange"
                @focus="focused = 'number'"
                @blur="focused = ''"
                placeholder="1234 5678 9012 3456"
                class="w-full pl-10 px-3 py-2 border rounded-md transition-all duration-200"
                :class="[
                  'border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50',
                  focused === 'number' ? 'border-rose-500 ring-1 ring-rose-500' : ''
                ]"
                maxlength="19"
                required
              />
              <CreditCard
                class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200"
                :class="focused === 'number' ? 'text-rose-500' : 'text-gray-400'"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label for="expiry" class="text-sm font-medium text-gray-700 flex items-center">
                Fecha de expiración
                <CheckCircle2 v-if="expMonth.length === 2 && expYear.length === 2" class="ml-2 h-4 w-4 text-green-500" />
              </label>
              <div class="flex space-x-2">
                <input
                  id="exp-month"
                  v-model="expMonth"
                  @input="handleExpMonthChange"
                  @focus="focused = 'expiry'"
                  @blur="focused = ''"
                  placeholder="MM"
                  class="w-full px-3 py-2 border rounded-md transition-all duration-200"
                  :class="[
                    'border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50',
                    focused === 'expiry' ? 'border-rose-500 ring-1 ring-rose-500' : ''
                  ]"
                  maxlength="2"
                  required
                />
                <span class="flex items-center text-gray-500">/</span>
                <input
                  id="exp-year"
                  v-model="expYear"
                  @input="handleExpYearChange"
                  @focus="focused = 'expiry'"
                  @blur="focused = ''"
                  placeholder="AA"
                  class="w-full px-3 py-2 border rounded-md transition-all duration-200"
                  :class="[
                    'border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50',
                    focused === 'expiry' ? 'border-rose-500 ring-1 ring-rose-500' : ''
                  ]"
                  maxlength="2"
                  required
                />
              </div>
            </div>
            <div class="space-y-2">
              <label for="cvc" class="text-sm font-medium text-gray-700 flex items-center">
                CVC
                <CheckCircle2 v-if="cvc.length >= 3" class="ml-2 h-4 w-4 text-green-500" />
              </label>
              <input
                id="cvc"
                v-model="cvc"
                @input="handleCvcChange"
                @focus="handleCvcFocus"
                @blur="handleCvcBlur"
                placeholder="123"
                class="w-full px-3 py-2 border rounded-md transition-all duration-200"
                :class="[
                  'border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50',
                  focused === 'cvc' ? 'border-rose-500 ring-1 ring-rose-500' : ''
                ]"
                maxlength="4"
                required
              />
            </div>
          </div>

          <div class="pt-4">
            <button
              type="submit"
              class="w-full bg-rose-500 hover:bg-rose-600 text-white h-11 rounded-md transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-md flex items-center justify-center"
              :disabled="loading"
            >
              <template v-if="loading">
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Procesando...
              </template>
              <template v-else>
                <Lock class="mr-2 h-4 w-4" /> Finalizar Pago
              </template>
            </button>
          </div>
        </form>

        <div class="mt-6 flex items-center justify-center space-x-6 text-xs text-gray-500">
          <div class="flex items-center">
            <ShieldCheck class="h-4 w-4 mr-1 text-green-500" /> Pago Seguro
          </div>
          <div class="flex items-center">
            <Lock class="h-4 w-4 mr-1 text-green-500" /> Encriptado
          </div>
          <div class="flex items-center">
            <CheckCircle2 class="h-4 w-4 mr-1 text-green-500" /> Verificado
          </div>
        </div>
      </div>
    </div>
  </div>
  </ModalUi>

</template>

<script setup>
import { ref } from 'vue';
import { CreditCard, Lock, CheckCircle2, ShieldCheck } from 'lucide-vue-next';
import ModalUi from '@/components/ui/ModalUi.vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'update:modelValue', 'submitted'])


const loading = ref(false);
const cardNumber = ref('');
const cardType = ref('');
const name = ref('');
const expMonth = ref('');
const expYear = ref('');
const cvc = ref('');
const focused = ref('');
const cardFlipped = ref(false);

const formatCardNumber = (value) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(' ');
  } else {
    return value;
  }
};

const handleCardNumberChange = (e) => {
  const formattedValue = formatCardNumber(e.target.value);
  cardNumber.value = formattedValue;

  if (formattedValue.startsWith('4')) {
    cardType.value = 'visa';
  } else if (/^5[1-5]/.test(formattedValue.replace(/\s/g, ''))) {
    cardType.value = 'mastercard';
  } else if (/^3[47]/.test(formattedValue.replace(/\s/g, ''))) {
    cardType.value = 'amex';
  } else {
    cardType.value = '';
  }
};

const handleExpMonthChange = (e) => {
  const val = e.target.value.replace(/\D/g, '');
  if (val === '' || (parseInt(val) > 0 && parseInt(val) <= 12)) {
    expMonth.value = val;
  }
};

const handleExpYearChange = (e) => {
  const val = e.target.value.replace(/\D/g, '');
  expYear.value = val;
};

const handleCvcChange = (e) => {
  const val = e.target.value.replace(/\D/g, '');
  cvc.value = val;
};

const handleCvcFocus = () => {
  focused.value = 'cvc';
  cardFlipped.value = true;
};

const handleCvcBlur = () => {
  focused.value = '';
  cardFlipped.value = false;
};

const handleSubmit = () => {
  loading.value = true;
  emit('submitted')
  emit('close')
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};

// Convertir nombre a mayúsculas
const handleNameInput = (e) => {
  name.value = e.target.value.toUpperCase();
};
</script>

<style scoped>
/* Patrón de puntos para la tarjeta */
.pattern-dots-lg {
  background-image: radial-gradient(currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}

/* Estilos adicionales para mejorar la apariencia de los inputs */
input:focus {
  outline: none;
}

/* Animación suave para el botón */
button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
