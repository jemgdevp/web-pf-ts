<script setup lang="ts">
import { computed } from 'vue'
import { AlertOctagon, GitFork, ListOrdered, Lock, Unlock } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import type { UseCase } from '@/types/domain'
import { actorById } from '@/data/actors'

interface Props {
  useCase: UseCase
}

const props = defineProps<Props>()

const actorNames = computed(() =>
  props.useCase.actores.map((id) => actorById(id)?.nombre ?? id),
)
</script>

<template>
  <article
    class="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
  >
    <!-- Header -->
    <header class="border-b border-border bg-gradient-to-br from-brand/10 via-transparent to-transparent p-6">
      <div class="flex items-center justify-between gap-3">
        <Badge
          class="font-mono text-[11px]"
          :class="
            useCase.tipo === 'principal'
              ? 'bg-brand text-brand-foreground hover:bg-brand/90'
              : ''
          "
          :variant="useCase.tipo === 'principal' ? 'default' : 'secondary'"
        >
          {{ useCase.codigo }}
        </Badge>
        <span class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Caso de uso · {{ useCase.tipo }}
        </span>
      </div>
      <h3 class="mt-4 font-heading text-2xl font-bold tracking-tight">
        {{ useCase.nombre }}
      </h3>
      <div class="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span class="text-muted-foreground">Actor(es):</span>
        <Badge
          v-for="name in actorNames"
          :key="name"
          variant="outline"
          class="text-[11px]"
        >
          {{ name }}
        </Badge>
      </div>
    </header>

    <!-- Cuerpo -->
    <div class="space-y-7 p-6">
      <!-- Descripción -->
      <section>
        <h4 class="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
          Descripción
        </h4>
        <p class="text-sm leading-relaxed text-foreground">
          {{ useCase.descripcion }}
        </p>
      </section>

      <!-- Precondiciones -->
      <section>
        <h4 class="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
          <Lock class="size-3.5" />
          Precondiciones
        </h4>
        <ul class="space-y-1.5">
          <li
            v-for="(p, i) in useCase.precondiciones"
            :key="i"
            class="flex gap-2 text-sm leading-relaxed text-foreground"
          >
            <span aria-hidden="true" class="mt-2 inline-block size-1 shrink-0 rounded-full bg-brand" />
            <span>{{ p }}</span>
          </li>
        </ul>
      </section>

      <!-- Flujo normal -->
      <section>
        <h4 class="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
          <ListOrdered class="size-3.5" />
          Flujo normal de eventos
        </h4>
        <ol class="space-y-2">
          <li
            v-for="(p, i) in useCase.flujoNormal"
            :key="i"
            class="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed"
          >
            <span class="font-mono text-xs text-muted-foreground">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <span>{{ p }}</span>
          </li>
        </ol>
      </section>

      <!-- Flujos alternos -->
      <section v-if="useCase.flujosAlternos.length">
        <h4 class="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
          <GitFork class="size-3.5" />
          Flujos alternos
        </h4>
        <div class="space-y-4">
          <div
            v-for="(fa, i) in useCase.flujosAlternos"
            :key="i"
            class="rounded-md border border-border bg-accent/30 p-4"
          >
            <p class="text-sm font-medium text-foreground">{{ fa.titulo }}</p>
            <ol class="mt-2 space-y-1.5">
              <li
                v-for="(p, j) in fa.pasos"
                :key="j"
                class="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span class="font-mono text-[11px]">{{ String(j + 1).padStart(2, '0') }}</span>
                <span>{{ p }}</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <!-- Excepciones -->
      <section v-if="useCase.excepciones.length">
        <h4 class="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
          <AlertOctagon class="size-3.5" />
          Excepciones
        </h4>
        <div class="space-y-3">
          <div
            v-for="(e, i) in useCase.excepciones"
            :key="i"
            class="rounded-md border border-destructive/30 bg-destructive/[0.04] p-4"
          >
            <p class="text-sm font-medium text-foreground">{{ e.titulo }}</p>
            <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
              {{ e.descripcion }}
            </p>
          </div>
        </div>
      </section>

      <!-- Postcondiciones -->
      <section>
        <h4 class="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
          <Unlock class="size-3.5" />
          Postcondiciones
        </h4>
        <ul class="space-y-1.5">
          <li
            v-for="(p, i) in useCase.postcondiciones"
            :key="i"
            class="flex gap-2 text-sm leading-relaxed text-foreground"
          >
            <span aria-hidden="true" class="mt-2 inline-block size-1 shrink-0 rounded-full bg-brand" />
            <span>{{ p }}</span>
          </li>
        </ul>
      </section>
    </div>
  </article>
</template>
