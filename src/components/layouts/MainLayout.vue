<script setup lang="ts">
import { Header, Footer } from '@/components/layouts'
</script>

<template>
  <main class="antialiased w-[88%] lg:max-w-4xl min-h-screen mx-auto">
    <Header />
    <slot></slot>
    <Footer />
  </main>
</template>
