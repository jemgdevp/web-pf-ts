<script setup lang="ts">
import { RouterView } from 'vue-router'

const appName = import.meta.env.VITE_APP_NAME

import { Button } from '@/components/ui/button'
</script>

<template>
  <h1>{{ appName }}</h1>
  <Button>Click me</Button>
  <RouterView />
</template>

<style scoped>

</style>
