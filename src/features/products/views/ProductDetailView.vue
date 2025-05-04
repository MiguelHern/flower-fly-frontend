<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { ArrowLeft, Heart } from 'lucide-vue-next'
import Button from '@/components/ui/ButtonBase.vue'
import CardProducts from '../components/CardProducts.vue'
const route = useRoute()
const { categorySlug, productSlug } = route.params

// Datos mockeados del producto
const product = ref({
  id: 1,
  title: 'Rosa Roja',
  artist: 'Flower Fly',
  price: '$1125',
  imageUrl: 'https://res.cloudinary.com/djfokdod6/image/upload/f_webp/v1738641878/1f850362-b9c8-44d6-8d98-3ae7ce62d6ba-removebg-preview_g9fsyg.png',
  technique: 'Fresca',
  dimensions: '50 cm',
  year: '2024',
  description: 'Hermosa rosa roja fresca, perfecta para regalos especiales. Cada rosa es cuidadosamente seleccionada para garantizar su frescura y belleza.',
  details: [
    'Altura aproximada: 50cm',
    'Vida útil: 7-10 días',
    'Incluye cuidado especial',
    'Entrega en 24 horas'
  ]
})

// Datos mockeados de productos relacionados
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

// Función para obtener los detalles del producto (mock)
const getProductDetails = () => {
  console.log(`Obteniendo detalles del producto: ${productSlug} de la categoría: ${categorySlug}`)
}

onMounted(() => {
  getProductDetails()
})
</script>

<template>
  <div class="container mx-auto py-12">
    <RouterLink :to="`/products/${categorySlug}`" class="flex items-center text-sm mb-8 hover:underline">
      <ArrowLeft class="h-4 w-4 mr-2" /> Volver a la categoría
    </RouterLink>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div class="relative">
        <img :src="product.imageUrl" :alt="product.title" width="800" height="1000"
          class="object-cover w-full rounded-lg" />
        <Button variant="outline" size="icon" class="absolute top-4 right-4 rounded-full bg-white/80 hover:bg-white">
          <Heart class="h-5 w-5" />
          <span class="sr-only">Añadir a favoritos</span>
        </Button>
      </div>

      <div class="space-y-6">
        <div>
          <h1 class="text-3xl md:text-4xl font-light">{{ product.title }}</h1>
          <p class="text-lg text-muted-foreground mt-2">{{ product.artist }}</p>
        </div>

        <div class="text-2xl font-light">{{ product.price }}</div>
        <div class="h-px bg-gray-200 w-full"></div>

        <div>
          <h2 class="text-lg font-medium mb-2">Detalles</h2>
          <dl class="grid grid-cols-2 gap-y-3 text-sm">
            <dt class="text-muted-foreground">Técnica</dt>
            <dd>{{ product.technique }}</dd>
            <dt class="text-muted-foreground">Dimensiones</dt>
            <dd>{{ product.dimensions }}</dd>
            <dt class="text-muted-foreground">Año</dt>
            <dd>{{ product.year }}</dd>
            <dt class="text-muted-foreground">Certificado</dt>
            <dd>Incluye certificado de frescura</dd>
          </dl>
        </div>

        <div>
          <h2 class="text-lg font-medium mb-2">Descripción</h2>
          <p class="text-muted-foreground">{{ product.description }}</p>
        </div>

        <div class="pt-4 space-y-4">
          <Button class="w-full bg-black hover:bg-black/80 text-white" variant="destructive">Agregar al carrito</Button>
        </div>

        <div class="text-sm text-muted-foreground">
          <p>Envío gratuito en compras superiores a €50. Entrega en 24-48 horas.</p>
          <p class="mt-1">Política de devolución de 7 días.</p>
        </div>
      </div>
    </div>

    <section class="mt-24">
      <h2 class="text-2xl font-light mb-8">Productos relacionados</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardProducts v-for="related in products" :key="related.id" :title="related.title"
        :description="related.description" :imageUrl="related.imageUrl" :link="related.link" :price="related.price"
        :previousPrice="related.previousPrice" />
      </div>
    </section>
  </div>
</template>

<style scoped></style>
