<script setup lang="ts">
import PortadaView from './PortadaView.vue'
import ProblemaView from './ProblemaView.vue'
import RequerimientosView from './RequerimientosView.vue'
import CasosUsoView from './CasosUsoView.vue'
import DescripcionesView from './DescripcionesView.vue'
import ActividadView from './ActividadView.vue'
import MockupsView from './MockupsView.vue'
</script>

<template>
  <div class="mx-auto w-full max-w-5xl px-6 py-10 md:px-10 md:py-14 print:max-w-full print:px-0 print:py-0">
    <PortadaView />
    <ProblemaView />
    <RequerimientosView />
    <CasosUsoView />
    <DescripcionesView />
    <ActividadView />
    <MockupsView print-mode />
  </div>
</template>
