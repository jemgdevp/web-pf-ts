<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const appName = import.meta.env.VITE_APP_NAME
</script>

<template>
  <div>Home</div>
  <h1>{{ appName }}</h1>
  <Button>Click me</Button>
  <Accordion>
    <AccordionItem value="item-1">
      <AccordionTrigger>Click me</AccordionTrigger>
      <AccordionContent>Hello</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<style scoped> </style>
