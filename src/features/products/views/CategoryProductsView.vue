<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CardProducts from '@/features/products/components/CardProducts.vue'

const route = useRoute()
const categorySlug = route.params.categorySlug

// Datos mockeados de productos por categoría
const products = ref([
  {
    id: 1,
    title: 'Rosa Roja',
    description: 'Hermosa rosa roja fresca',
    imageUrl: 'https://res.cloudinary.com/djfokdod6/image/upload/f_webp/v1738641878/1f850362-b9c8-44d6-8d98-3ae7ce62d6ba-removebg-preview_g9fsyg.png',
    link: `/products/${categorySlug}/rosa-roja`,
    price: 15.99,
    previousPrice: 19.99
  },
  {
    id: 2,
    title: 'Tulipán',
    description: 'Tulipán de colores variados',
    imageUrl: 'https://res.cloudinary.com/djfokdod6/image/upload/f_webp/v1738641878/1f850362-b9c8-44d6-8d98-3ae7ce62d6ba-removebg-preview_g9fsyg.png',
    link: `/products/${categorySlug}/tulipan`,
    price: 12.99,
    previousPrice: 15.99
  },
  {
    id: 3,
    title: 'Girasol',
    description: 'Girasol fresco y brillante',
    imageUrl: 'https://res.cloudinary.com/djfokdod6/image/upload/f_webp/v1738641878/1f850362-b9c8-44d6-8d98-3ae7ce62d6ba-removebg-preview_g9fsyg.png',
    link: `/products/${categorySlug}/girasol`,
    price: 18.99,
    previousPrice: 22.99
  }
])

// Función para obtener los productos de la categoría (mock)
const getCategoryProducts = () => {
  // Aquí iría la lógica para obtener los productos de la categoría
  console.log(`Obteniendo productos para la categoría: ${categorySlug}`)
}

onMounted(() => {
  getCategoryProducts()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 capitalize">{{ categorySlug.replace('-', ' ') }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardProducts v-for="product in products" :key="product.id" :title="product.title"
        :description="product.description" :imageUrl="product.imageUrl" :link="product.link" :price="product.price"
        :previousPrice="product.previousPrice" />
    </div>
  </div>
</template>

<style scoped></style>
