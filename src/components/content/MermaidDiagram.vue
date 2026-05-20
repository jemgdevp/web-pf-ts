<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import mermaid from 'mermaid'

interface Props {
  source: string
  id?: string
  ariaLabel?: string
}

const props = defineProps<Props>()

const host = ref<HTMLElement | null>(null)
const rendered = ref<string>('')
const mode = useColorMode()

const diagramId = computed(() => `mmd-${props.id ?? Math.random().toString(36).slice(2, 9)}`)

async function render() {
  if (!host.value) return
  const theme = mode.value === 'dark' ? 'dark' : 'default'
  mermaid.initialize({
    startOnLoad: false,
    theme,
    securityLevel: 'loose',
    fontFamily: 'Inter, system-ui, sans-serif',
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
      padding: 12,
    },
  })
  try {
    const { svg } = await mermaid.render(diagramId.value, props.source)
    rendered.value = svg
  } catch (err) {
    console.error('Mermaid render error:', err)
    rendered.value = `<pre class="text-destructive text-xs whitespace-pre-wrap">${(err as Error).message}</pre>`
  }
}

onMounted(render)
watch(() => [props.source, mode.value], render)
</script>

<template>
  <div
    ref="host"
    class="mermaid-host flex w-full justify-center overflow-x-auto rounded-lg border border-border bg-card p-6"
    :aria-label="ariaLabel"
    role="img"
    v-html="rendered"
  />
</template>
