<script setup lang="ts">
import { computed } from 'vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import RequirementCategory from '@/components/content/RequirementCategory.vue'
import { useSectionAnimation } from '@/composables/useSectionAnimation'
import { requirementGroups } from '@/data/requirements'

useSectionAnimation()

const totalRequerimientos = computed(() =>
  requirementGroups.reduce((acc, g) => acc + g.items.length, 0),
)
</script>

<template>
  <section data-print-page>
    <PageHeader
      :numero="3"
      titulo="Requerimientos"
      subtitulo="Especificación organizada de requerimientos de negocio, de usuario, del sistema, y funcionales/no funcionales identificados para el sistema de gestión logística."
    />

    <!-- Resumen rápido -->
    <div data-anim class="mb-10 flex flex-wrap items-center gap-2 text-sm">
      <span class="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-xs">
        {{ totalRequerimientos }} requerimientos totales
      </span>
      <span
        v-for="g in requirementGroups"
        :key="g.categoria"
        class="rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"
      >
        {{ g.items.length }} de {{ g.titulo.toLowerCase() }}
      </span>
    </div>

    <div class="space-y-7">
      <div
        v-for="group in requirementGroups"
        :key="group.categoria"
        data-anim
      >
        <RequirementCategory :group="group" />
      </div>
    </div>
  </section>
</template>
