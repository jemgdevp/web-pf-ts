<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import SidebarNav from './SidebarNav.vue'
import { sectionRoutes } from '@/router'
import { TooltipProvider } from '@/components/ui/tooltip'

const route = useRoute()

const hideShell = computed(() => route.name === 'imprimir')

const currentSection = computed(() => {
  const r = sectionRoutes.find((sr) => sr.name === route.name)
  return r?.meta?.seccion ?? null
})

const totalSections = sectionRoutes.length
</script>

<template>
  <TooltipProvider :delay-duration="200">
    <!-- Print/standalone mode: solo router-view sin shell -->
    <template v-if="hideShell">
      <RouterView />
    </template>

    <!-- Normal mode: shell con sidebar + main -->
    <template v-else>
      <div class="relative min-h-screen bg-background text-foreground">
        <SidebarNav />

        <main
          data-app-main
          class="min-h-screen md:pl-72"
        >
          <!-- Mobile topbar (cuando no hay sidebar) -->
          <div
            data-print-hide
            class="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur md:hidden"
          >
            <span class="font-heading text-sm font-bold">Logística — Análisis</span>
          </div>

          <!-- Breadcrumb / sección actual -->
          <div
            v-if="currentSection"
            data-print-hide
            class="sticky top-0 z-10 hidden border-b border-border bg-background/80 px-8 py-3 backdrop-blur md:flex md:items-center md:justify-between"
          >
            <div class="flex items-center gap-3 text-xs text-muted-foreground">
              <span class="font-mono">
                Sección {{ String(currentSection.numero).padStart(2, '0') }} / {{ String(totalSections).padStart(2, '0') }}
              </span>
              <span class="text-muted-foreground/50">·</span>
              <span class="text-foreground">{{ currentSection.titulo }}</span>
            </div>
          </div>

          <div class="mx-auto w-full max-w-5xl px-6 py-10 md:px-10 md:py-14">
            <RouterView v-slot="{ Component, route: r }">
              <Transition
                mode="out-in"
                enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-200 ease-in"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1"
              >
                <component :is="Component" :key="r.fullPath" />
              </Transition>
            </RouterView>
          </div>
        </main>
      </div>
    </template>
  </TooltipProvider>
</template>
