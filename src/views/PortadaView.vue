<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from '@/lib/gsap'
import { Truck, MapPin, ArrowRight } from 'lucide-vue-next'
import { projectInfo } from '@/data/project'

const eyebrow = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const subtitle = ref<HTMLElement | null>(null)
const card = ref<HTMLElement | null>(null)
const accentLine = ref<HTMLElement | null>(null)
const ornament = ref<HTMLElement | null>(null)
const cta = ref<HTMLElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from(eyebrow.value, { opacity: 0, x: -16, duration: 0.5 })
    .from(accentLine.value, { scaleX: 0, transformOrigin: 'left center', duration: 0.6 }, '-=0.3')
    .from(
      title.value?.querySelectorAll('.split-word') ?? [],
      { opacity: 0, y: 28, duration: 0.7, stagger: 0.08 },
      '-=0.4',
    )
    .from(subtitle.value, { opacity: 0, y: 14, duration: 0.5 }, '-=0.3')
    .from(
      card.value?.querySelectorAll('[data-info]') ?? [],
      { opacity: 0, y: 20, duration: 0.5, stagger: 0.06 },
      '-=0.2',
    )
    .from(cta.value, { opacity: 0, y: 10, duration: 0.4 }, '-=0.2')
    .from(
      ornament.value,
      { opacity: 0, scale: 0.85, rotate: -8, duration: 1.2, ease: 'power2.out' },
      0,
    )

  // Pulse en la flecha del CTA
  gsap.to('[data-cta-arrow]', {
    x: 6,
    duration: 0.9,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  })
})

const tituloWords = projectInfo.titulo.split(' ')
</script>

<template>
  <section
    data-print-page
    class="relative isolate flex min-h-[80vh] flex-col justify-center overflow-hidden"
  >
    <!-- Background grid + radial gradient -->
    <div
      class="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,_black_30%,_transparent_70%)] print:hidden"
      aria-hidden="true"
    />

    <!-- Ornamental truck icon (cosmético, oculto al imprimir) -->
    <div
      ref="ornament"
      class="pointer-events-none absolute -right-12 top-1/2 -z-10 hidden -translate-y-1/2 text-brand/8 md:block print:hidden"
      aria-hidden="true"
    >
      <Truck class="size-[28rem]" stroke-width="0.5" />
    </div>

    <div class="relative">
      <div ref="eyebrow" class="flex items-center gap-3">
        <span ref="accentLine" class="inline-block h-px w-10 bg-brand" aria-hidden="true" />
        <p class="font-mono text-xs uppercase tracking-[0.22em] text-brand">
          Proyecto Final · {{ projectInfo.asignatura }}
        </p>
      </div>

      <h1
        ref="title"
        class="mt-8 text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
      >
        <span
          v-for="(word, i) in tituloWords"
          :key="i"
          class="split-word mr-3 inline-block"
        >{{ word }}</span>
      </h1>

      <p
        ref="subtitle"
        class="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
      >
        {{ projectInfo.subtitulo }}
      </p>

      <div
        ref="card"
        class="mt-14 grid max-w-3xl gap-x-10 gap-y-6 rounded-xl border border-border bg-card/80 p-7 text-sm backdrop-blur sm:grid-cols-2 md:p-8"
      >
        <div data-info>
          <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Estudiante
          </p>
          <p class="mt-1.5 text-base font-medium">{{ projectInfo.estudiante.nombre }}</p>
        </div>
        <div data-info>
          <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Identificación
          </p>
          <p class="mt-1.5 text-base font-medium">{{ projectInfo.estudiante.identificacion }}</p>
        </div>
        <div data-info>
          <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Asignatura
          </p>
          <p class="mt-1.5 text-base font-medium">{{ projectInfo.asignatura }}</p>
        </div>
        <div data-info>
          <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Carrera
          </p>
          <p class="mt-1.5 text-base font-medium">{{ projectInfo.carrera }}</p>
        </div>
        <div data-info class="sm:col-span-2">
          <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Universidad
          </p>
          <p class="mt-1.5 flex items-center gap-2 text-base font-medium">
            <MapPin class="size-4 text-brand" />
            {{ projectInfo.universidad }}
            <span v-if="projectInfo.ciudad" class="font-normal text-muted-foreground">
              · {{ projectInfo.ciudad }}
            </span>
            <span class="ml-auto font-mono text-xs text-muted-foreground">
              {{ projectInfo.ano }}
            </span>
          </p>
        </div>
      </div>

      <div ref="cta" class="mt-12 flex items-center gap-2 print:hidden">
        <RouterLink
          to="/problema"
          class="group inline-flex items-center gap-3 rounded-md bg-brand px-5 py-3 text-sm font-medium text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          Comenzar el análisis
          <ArrowRight data-cta-arrow class="size-4" />
        </RouterLink>
        <span class="text-xs text-muted-foreground">— 7 secciones</span>
      </div>
    </div>
  </section>
</template>
