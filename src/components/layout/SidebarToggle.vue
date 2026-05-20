<script setup lang="ts">
import { PanelLeftClose, PanelLeftOpen } from 'lucide-vue-next'
import { useSidebar } from '@/composables/useSidebar'

const { isCollapsed, toggle } = useSidebar()
</script>

<template>
  <button
    type="button"
    :aria-label="isCollapsed ? 'Expandir barra lateral' : 'Colapsar barra lateral'"
    class="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    @click="toggle"
  >
    <PanelLeftClose v-if="!isCollapsed" class="size-4" />
    <PanelLeftOpen v-else class="size-4" />
  </button>
</template>
