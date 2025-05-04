<script setup>
import router from '@/router/index.js'
import ButtonBase from '@/components/ui/ButtonBase.vue'
</script>

<template>
  <h2 class="text-2xl font-semibold mb-4">Inicia sesión</h2>
  <form action="#" method="POST">
    <div class="mb-4">
      <label for="username" class="form-label">Correo</label>
      <input
        type="text"
        id="username"
        name="username"
        class="form-input"
        autocomplete="off"
        placeholder="Correo"
      />
    </div>
    <div class="mb-4">
      <label for="email" class="form-label">
        Correo electrónico
      </label>
      <input
        id="email"
        type="email"
        placeholder="ejemplo@correo.com"
        class="form-input"
      />
    </div>
    <!--    <div class="mb-4 flex items-center">-->
    <!--      <input type="checkbox" id="remember" name="remember" class="text-blue-500">-->
    <!--      <label for="remember" class="text-gray-600 ml-2">Remember Me</label>-->
    <!--    </div>-->

    <!--    <div class="mb-6 text-blue-500">-->
    <!--      <a href="#" class="hover:underline">Forgot Password?</a>-->
    <!--    </div>-->
    <ButtonBase
      type="submit"
      class="bg-black hover:bg-black/80 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Login
    </ButtonBase>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-center">
    <span class="text-gray-500">¿No tienes cuenta? </span>
    <button @click="router.push({ name: 'register' })" class="text-gray-900 dark:text-white hover:underline">
      Regístrate
    </button>
  </div>
</template>

<style scoped></style>
