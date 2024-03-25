<script setup lang="ts">
import { Header, Footer } from '@/components'
</script>

<template>
  <main class="antialiased w-[88%] lg:max-w-4xl mx-auto">
    <Header />
    <slot></slot>
    <Footer />
  </main>
</template>
