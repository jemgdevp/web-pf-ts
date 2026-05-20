<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  BookOpenText,
  FileQuestion,
  ListChecks,
  Workflow,
  NotebookText,
  GitBranch,
  MonitorSmartphone,
  Printer,
  Truck,
  type LucideIcon,
} from 'lucide-vue-next'
import { sectionRoutes } from '@/router'
import { projectInfo } from '@/data/project'
import ThemeToggle from './ThemeToggle.vue'
import PrintExportButton from './PrintExportButton.vue'

const iconMap: Record<string, LucideIcon> = {
  BookOpenText,
  FileQuestion,
  ListChecks,
  Workflow,
  NotebookText,
  GitBranch,
  MonitorSmartphone,
  Printer,
}

const route = useRoute()

const sections = computed(() =>
  sectionRoutes
    .filter((r) => r.meta?.seccion)
    .map((r) => ({
      name: r.name as string,
      path: r.path,
      meta: r.meta!.seccion!,
    })),
)

const activeName = computed(() => route.name)
</script>

<template>
  <aside
    data-print-hide
    class="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-border bg-sidebar text-sidebar-foreground md:flex"
  >
    <!-- Brand -->
    <div class="flex items-center gap-3 border-b border-border px-6 py-5">
      <span class="flex size-9 items-center justify-center rounded-md bg-brand text-brand-foreground">
        <Truck class="size-5" />
      </span>
      <div class="flex flex-col">
        <span class="font-heading text-sm font-bold leading-tight">
          {{ projectInfo.titulo }}
        </span>
        <span class="text-[11px] uppercase tracking-wider text-muted-foreground">
          {{ projectInfo.asignatura }}
        </span>
      </div>
    </div>

    <!-- Section nav -->
    <nav class="flex-1 overflow-y-auto px-3 py-4">
      <p class="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Secciones
      </p>
      <ul class="flex flex-col gap-0.5">
        <li v-for="s in sections" :key="s.name">
          <RouterLink
            :to="s.path"
            class="group flex items-start gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            :class="{
              'bg-sidebar-accent text-sidebar-accent-foreground font-medium': activeName === s.name,
            }"
          >
            <span
              class="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded text-[10px] font-mono font-semibold"
              :class="
                activeName === s.name
                  ? 'bg-brand text-brand-foreground'
                  : 'bg-muted text-muted-foreground group-hover:bg-brand/15 group-hover:text-brand'
              "
            >
              {{ String(s.meta.numero).padStart(2, '0') }}
            </span>
            <span class="flex flex-col leading-tight">
              <span class="flex items-center gap-2">
                <component :is="iconMap[s.meta.icon] ?? BookOpenText" class="size-3.5" />
                <span>{{ s.meta.titulo }}</span>
              </span>
              <span class="mt-0.5 text-[11px] text-muted-foreground">
                {{ s.meta.subtitulo }}
              </span>
            </span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Footer actions -->
    <div class="flex flex-col gap-3 border-t border-border px-4 py-4">
      <PrintExportButton />
      <div class="flex items-center justify-between">
        <span class="text-[11px] text-muted-foreground">Tema</span>
        <ThemeToggle />
      </div>
      <p class="text-[10px] leading-relaxed text-muted-foreground">
        {{ projectInfo.universidad }} · {{ projectInfo.ano }}
      </p>
    </div>
  </aside>
</template>
