<script setup>
import router from '@/router/index.js'
import ButtonBase from '@/components/ui/ButtonBase.vue'
</script>

<template>
  <h1 class="text-2xl font-semibold mb-4">Registrate</h1>
  <form action="#" method="POST">
    <!-- Nombre y Apellido en la misma fila -->
    <div class="mb-4 flex gap-4">
      <div class="flex-1">
        <label for="nombre" class="form-label">Nombre</label>
        <input type="text" id="nombre" name="nombre" class="form-input" autocomplete="off">
      </div>
      <div class="flex-1">
        <label for="apellido" class="form-label">Apellido</label>
        <input type="text" id="apellido" name="apellido" class="form-input" autocomplete="off">
      </div>
    </div>
    <!-- Correo Electrónico -->
    <div class="mb-4">
      <label for="email" class="form-label">Correo Electrónico</label>
      <input type="email" id="email" name="email" class="form-input" autocomplete="off">
    </div>
    <!-- Contraseña -->
    <div class="mb-4">
      <label for="password" class="form-label">Contraseña</label>
      <input type="password" id="password" name="password" class="form-input" autocomplete="off">
    </div>
    <!-- Confirmar Contraseña -->
    <div class="mb-6">
      <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
      <input type="password" id="confirmPassword" name="confirmPassword" class="form-input" autocomplete="off">
    </div>
    <!-- Botón de Registro -->
    <ButtonBase
      type="submit"
      class="bg-black hover:bg-black/80 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Login
    </ButtonBase>
  </form>
  <!-- Enlace para Iniciar Sesión -->
  <div class="mt-6 text-center">
    <span class="text-gray-500">¿Ya tienes cuenta? </span>
    <button @click="router.push({ name: 'login' })" class="text-gray-900 dark:text-white hover:underline">
      Inicia sesión
    </button>
  </div>
</template>

<style scoped>

</style>
