<script setup lang="ts">
import { computed } from 'vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import UseCaseDescriptionCard from '@/components/content/UseCaseDescriptionCard.vue'
import { useSectionAnimation } from '@/composables/useSectionAnimation'
import { useCases } from '@/data/useCases'

useSectionAnimation()

const principales = computed(() => useCases.filter((uc) => uc.tipo === 'principal'))
const secundarios = computed(() => useCases.filter((uc) => uc.tipo === 'secundario'))
</script>

<template>
  <section data-print-page>
    <PageHeader
      :numero="5"
      titulo="Descripciones de casos de uso"
      subtitulo="Especificación detallada de los dos casos de uso principales y los dos secundarios siguiendo la plantilla estándar: nombre, actores, tipo, precondiciones, descripción, flujo normal, flujos alternos, excepciones y postcondiciones."
    />

    <!-- Principales -->
    <div data-anim class="mb-12">
      <div class="mb-5 flex items-center gap-3">
        <span class="h-px flex-1 bg-border" aria-hidden="true" />
        <span class="font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
          Casos de uso principales · {{ principales.length }}
        </span>
        <span class="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <div class="space-y-7">
        <div v-for="uc in principales" :key="uc.codigo" data-anim>
          <UseCaseDescriptionCard :use-case="uc" />
        </div>
      </div>
    </div>

    <!-- Secundarios -->
    <div data-anim>
      <div class="mb-5 flex items-center gap-3">
        <span class="h-px flex-1 bg-border" aria-hidden="true" />
        <span class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Casos de uso secundarios · {{ secundarios.length }}
        </span>
        <span class="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <div class="space-y-7">
        <div v-for="uc in secundarios" :key="uc.codigo" data-anim>
          <UseCaseDescriptionCard :use-case="uc" />
        </div>
      </div>
    </div>
  </section>
</template>
