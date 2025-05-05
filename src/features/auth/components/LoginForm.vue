<script setup>
import router from '@/router/index.js'
import { Flower2 } from 'lucide-vue-next'
import { ref } from 'vue'
import { usuarioCommand } from '@/api/user/userCommand.js'
import SpinnerUi from '@/components/ui/SpinnerUi.vue'

let spinner = ref(false)
let alertError = ref(false)
let messageError = ref("")
//modelo
let email = ref("")
let password = ref("")

const login = async () =>{
  spinner.value = true
  let response = await usuarioCommand.login(email.value, password.value)

  if(response !== null){
    alertError.value = true
    messageError.value = response
  }

  spinner.value = false
}
</script>

<template>
  <div class="w-full flex items-center justify-center">
    <div class="w-[70%]">
      <div class="mb-7">
        <div class="flex items-center justify-center mb-2">
          <Flower2 class="h-10 w-10 text-pink-500" />
        </div>
        <h1 class="text-3xl text-center font-bold text-pink-700">Florería Flower Fly</h1>
        <h3 class="text-center text-gray-500">Ingresa a tu cuenta para realizar pedidos</h3>
      </div>
      <form @submit.prevent="login()" class="space-y-4">
        <TransitionRec>
          <div class="w-full h-[40px] bg-[#FED0D1] flex items-center justify-center rounded-sm" v-if="alertError">
            <img src="/src/assets/img/error.png" class="p-1 h-[24px]">
            <h5 class="p-1 text-gray-900 text-sm">{{ messageError }}</h5>
          </div>
        </TransitionRec>
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium">Correo electrónico</label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="tu@email.com"
            required
            class="text-sm text-gray-400 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium">Contraseña</label>
            <a href="#" class="text-sm text-pink-600 hover:text-pink-800">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            class="text-sm text-gray-400 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>
        <button
          type="submit"
          class="w-full cursor-pointer py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md"
        >
          <span v-if="spinner === false">
            Iniciar sesión
          </span>
          <SpinnerUi v-if="spinner === true" role="status" class="flex justify-center items-center">
            <svg aria-hidden="true" role="status" class="inline w-5 h-5 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            Iniciar sesión
          </SpinnerUi>
        </button>
      </form>

      <div class="mt-6 text-center">
        <span class="text-sm text-gray-500">¿No tienes cuenta? </span>
        <button @click="router.push({ name: 'register' })" class="text-sm cursor-pointer text-gray-900 dark:text-white hover:underline">
          Regístrate
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
