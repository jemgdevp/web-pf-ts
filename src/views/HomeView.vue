<script setup lang="ts">
import { Button } from '@/components/ui/button'

const appName = import.meta.env.VITE_APP_NAME
</script>

<template>
  <div>Home</div>
  <h1>{{ appName }}</h1>
  <Button>Click me</Button>
</template>

<style scoped> </style>
