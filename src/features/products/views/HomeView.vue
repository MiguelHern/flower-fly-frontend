<script setup>
import CardCategories from '@/features/products/components/CardCategories.vue'
import CardCustomBouquet from '@/features/products/components/CardCustomBouquet.vue'

const categories = [
  {
    id: 1,
    title: 'Flores Frescas',
    description: 'Las flores más frescas y hermosas para cualquier ocasión',
    imageUrl: 'https://res.cloudinary.com/djfokdod6/image/upload/f_webp/v1738641878/1f850362-b9c8-44d6-8d98-3ae7ce62d6ba-removebg-preview_g9fsyg.png',
    link: '/products/flores-frescas'
  },
  {
    id: 2,
    title: 'Arreglos Florales',
    description: 'Diseños únicos y elegantes para regalos especiales',
    imageUrl: 'https://res.cloudinary.com/djfokdod6/image/upload/f_webp/v1738641878/1f850362-b9c8-44d6-8d98-3ae7ce62d6ba-removebg-preview_g9fsyg.png',
    link: '/products/arreglos-florales'
  },
  {
    id: 3,
    title: 'Plantas de Interior',
    description: 'Variedad de plantas para decorar tu hogar',
    imageUrl: 'https://res.cloudinary.com/djfokdod6/image/upload/f_webp/v1738641878/1f850362-b9c8-44d6-8d98-3ae7ce62d6ba-removebg-preview_g9fsyg.png',
    link: '/products/plantas-interior'
  },
  {
    id: 4,
    title: 'Plantas de Exterior',
    description: 'Plantas perfectas para tu jardín o terraza',
    imageUrl: 'https://res.cloudinary.com/djfokdod6/image/upload/f_webp/v1738641878/1f850362-b9c8-44d6-8d98-3ae7ce62d6ba-removebg-preview_g9fsyg.png',
    link: '/products/plantas-exterior'
  }
]
</script>

<template>
  <div>
    <section class="container mx-auto py-16">
      <h2 class="text-3xl font-light text-center mb-12">Categorías</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardCategories v-for="category in categories" :key="category.id" :title="category.title"
          :description="category.description" :imageUrl="category.imageUrl" :link="category.link" />
      </div>
    </section>
    <CardCustomBouquet />
  </div>
</template>

<style scoped></style>
