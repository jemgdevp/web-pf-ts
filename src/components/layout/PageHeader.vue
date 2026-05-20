<script setup lang="ts">
interface Props {
  numero?: number
  titulo: string
  subtitulo?: string
  eyebrow?: string
}

defineProps<Props>()
</script>

<template>
  <header data-anim class="mb-10 border-b border-border pb-6">
    <div class="flex items-baseline gap-3">
      <span
        v-if="eyebrow ?? numero !== undefined"
        class="font-mono text-xs uppercase tracking-[0.18em] text-brand"
      >
        {{ eyebrow ?? `Sección ${String(numero).padStart(2, '0')}` }}
      </span>
    </div>
    <h1 class="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
      {{ titulo }}
    </h1>
    <p
      v-if="subtitulo"
      class="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg"
    >
      {{ subtitulo }}
    </p>
  </header>
</template>
