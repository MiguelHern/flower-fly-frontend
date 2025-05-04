<script setup>
import ButtonBase from '@/components/ui/ButtonBase.vue'
</script>

<template>
  <h2 class="text-2xl font-semibold mb-4">Agregar producto</h2>
  <form action="#" method="POST" enctype="multipart/form-data">
    <div class="mb-4">
      <label for="name" class="form-label">Nombre</label>
      <input
        type="text"
        id="name"
        name="name"
        class="form-input"
        placeholder="Nombre del producto"
      />
    </div>

    <div class="mb-4">
      <label for="type" class="form-label">Tipo</label>
      <input
        type="text"
        id="type"
        name="type"
        class="form-input"
        placeholder="Tipo de producto"
      />
    </div>

    <div class="mb-4">
      <label for="price" class="form-label">Precio</label>
      <input
        type="number"
        id="price"
        name="price"
        class="form-input"
        placeholder="$0.00"
        step="0.01"
        min="0"
      />
    </div>

    <div class="mb-4">
      <label for="description" class="form-label">Descripción</label>
      <textarea
        id="description"
        name="description"
        class="form-input"
        rows="3"
        placeholder="Describe el producto"
      ></textarea>
    </div>

    <div class="mb-4">
      <label for="stock" class="form-label">Stock</label>
      <input
        type="number"
        id="stock"
        name="stock"
        class="form-input"
        min="0"
        placeholder="Cantidad disponible"
      />
    </div>

    <div class="mb-6">
      <label for="image" class="form-label">Imagen</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        class="form-input"
      />
    </div>

    <ButtonBase
      type="submit"
      class="bg-black hover:bg-black/80 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Guardar producto
    </ButtonBase>
  </form>
</template>

<style scoped></style>
