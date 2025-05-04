<template>
  <footer class="bg-pink-100 py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Información de contacto -->
        <div>
          <h3 class="font-serif text-lg mb-4">Flower Fly</h3>
          <p class="text-muted-foreground text-sm">
            Calle del Bosque 456<br />
            24000 Campeche, México<br />
            contacto@flowerfly.com<br />
            +52 981 123 45 67
          </p>
        </div>

        <!-- Horarios -->
        <div>
          <h3 class="font-serif text-lg mb-4">Horario</h3>
          <p class="text-muted-foreground text-sm">
            Martes a Viernes: 10:00 - 20:00<br />
            Sábado: 11:00 - 20:00<br />
            Domingo: 11:00 - 18:00<br />
            Lunes: Cerrado
          </p>
        </div>

        <!-- Sección eliminada -->
        <div>
          <!-- Ya no se muestra el formulario de suscripción ni la sección de recibir noticias -->
        </div>
      </div>

      <!-- Créditos -->
      <div class="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
        © {{ year }} Flower Fly. Todos los derechos reservados.
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
