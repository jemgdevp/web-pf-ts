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
  Truck,
  type LucideIcon,
} from 'lucide-vue-next'
import { sectionRoutes } from '@/router'
import { projectInfo } from '@/data/project'
import { useSidebar } from '@/composables/useSidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import ThemeToggle from './ThemeToggle.vue'
import ShortcutsButton from './ShortcutsButton.vue'
import SidebarToggle from './SidebarToggle.vue'

const iconMap: Record<string, LucideIcon> = {
  BookOpenText,
  FileQuestion,
  ListChecks,
  Workflow,
  NotebookText,
  GitBranch,
  MonitorSmartphone,
}

const route = useRoute()
const { isCollapsed } = useSidebar()

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
    :class="[
      'fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 md:flex',
      isCollapsed ? 'w-16' : 'w-72',
    ]"
  >
    <!-- Brand -->
    <div
      :class="[
        'flex items-center gap-3 border-b border-border py-5',
        isCollapsed ? 'justify-center px-2' : 'px-6',
      ]"
    >
      <span
        class="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand text-brand-foreground"
      >
        <Truck class="size-5" />
      </span>
      <div v-if="!isCollapsed" class="flex min-w-0 flex-1 flex-col">
        <span class="truncate font-heading text-sm font-bold leading-tight">
          {{ projectInfo.titulo }}
        </span>
        <span class="text-[11px] uppercase tracking-wider text-muted-foreground">
          {{ projectInfo.asignatura }}
        </span>
      </div>
      <SidebarToggle v-if="!isCollapsed" />
    </div>

    <!-- Toggle solo (cuando colapsado) -->
    <div
      v-if="isCollapsed"
      class="flex justify-center border-b border-border p-1.5"
    >
      <SidebarToggle />
    </div>

    <!-- Section nav -->
    <nav
      :class="[
        'flex-1 overflow-y-auto py-4',
        isCollapsed ? 'px-2' : 'px-3',
      ]"
    >
      <p
        v-if="!isCollapsed"
        class="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
      >
        Secciones
      </p>

      <ul class="flex flex-col gap-0.5">
        <li v-for="s in sections" :key="s.name">
          <!-- Variante colapsada con Tooltip -->
          <Tooltip v-if="isCollapsed">
            <TooltipTrigger as-child>
              <RouterLink
                :to="s.path"
                class="group flex items-center justify-center rounded-md px-2 py-2.5 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                :class="{
                  'bg-sidebar-accent text-sidebar-accent-foreground': activeName === s.name,
                }"
              >
                <span
                  class="inline-flex size-7 items-center justify-center rounded text-[10px] font-mono font-semibold"
                  :class="
                    activeName === s.name
                      ? 'bg-brand text-brand-foreground'
                      : 'bg-muted text-muted-foreground group-hover:bg-brand/15 group-hover:text-brand'
                  "
                >
                  {{ String(s.meta.numero).padStart(2, '0') }}
                </span>
              </RouterLink>
            </TooltipTrigger>
            <TooltipContent side="right" class="max-w-xs">
              <div class="flex items-center gap-2">
                <component :is="iconMap[s.meta.icon] ?? BookOpenText" class="size-3.5 text-brand" />
                <span class="text-xs font-semibold">{{ s.meta.titulo }}</span>
              </div>
              <p class="mt-0.5 text-[10px] text-muted-foreground">
                {{ s.meta.subtitulo }}
              </p>
            </TooltipContent>
          </Tooltip>

          <!-- Variante expandida -->
          <RouterLink
            v-else
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

    <!-- Footer -->
    <div
      :class="[
        'border-t border-border',
        isCollapsed
          ? 'flex flex-col items-center gap-2 p-2'
          : 'flex flex-col gap-3 px-4 py-4',
      ]"
    >
      <template v-if="isCollapsed">
        <ShortcutsButton />
        <ThemeToggle />
      </template>

      <template v-else>
        <div class="flex items-center justify-between">
          <span class="text-[11px] text-muted-foreground">Atajos · Tema</span>
          <div class="flex items-center gap-1.5">
            <ShortcutsButton />
            <ThemeToggle />
          </div>
        </div>
        <p class="text-[10px] leading-relaxed text-muted-foreground">
          {{ projectInfo.universidad }} · {{ projectInfo.ano }}
        </p>
      </template>
    </div>
  </aside>
</template>
