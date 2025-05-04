<script setup>

import router from '@/router/index.js'
</script>

<template>
  <h1 class="text-2xl font-semibold mb-4">Registrate</h1>
  <form action="#" method="POST">
    <!-- Nombre y Apellido en la misma fila -->
    <div class="mb-4 flex gap-4">
      <div class="flex-1">
        <label for="nombre" class="block text-gray-600">Nombre</label>
        <input type="text" id="nombre" name="nombre"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off">
      </div>
      <div class="flex-1">
        <label for="apellido" class="block text-gray-600">Apellido</label>
        <input type="text" id="apellido" name="apellido"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off">
      </div>
    </div>
    <!-- Correo Electrónico -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Correo Electrónico</label>
      <input type="email" id="email" name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off">
    </div>
    <!-- Contraseña -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input type="password" id="password" name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off">
    </div>
    <!-- Confirmar Contraseña -->
    <div class="mb-6">
      <label for="confirmPassword" class="block text-gray-600">Confirmar Contraseña</label>
      <input type="password" id="confirmPassword" name="confirmPassword"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off">
    </div>
    <!-- Botón de Registro -->
    <button type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Registrarse</button>
  </form>
  <!-- Enlace para Iniciar Sesión -->
  <div class="mt-6 text-center">
    <span>¿Ya tienes cuenta? </span>
    <button @click="router.push({ name: 'login' })" class="hover:underline text-blue-500">
       Inicia sesión
    </button>
  </div>
</template>

<style scoped></style>
