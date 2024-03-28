<script setup lang="ts">
import { Header, Sidebar } from '@/components/layouts'
</script>

<template>
  <main class="antialiased min-h-screen">
    <div class="flex">
      <Sidebar />

      <div class="flex-1 content-container">
        <Header />
        <slot></slot>
      </div>
    </div>
  </main>
</template>
