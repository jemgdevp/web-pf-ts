<script setup lang="ts">
import { useRouter } from 'vue-router'
import { nextTick } from 'vue'
import { Printer } from 'lucide-vue-next'

const router = useRouter()

async function exportar() {
  await router.push({ name: 'imprimir' })
  await nextTick()
  setTimeout(() => window.print(), 600)
}
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center gap-2 rounded-md bg-brand px-3 py-2 text-sm font-medium text-brand-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    @click="exportar"
  >
    <Printer class="size-4" />
    Exportar PDF
  </button>
</template>
