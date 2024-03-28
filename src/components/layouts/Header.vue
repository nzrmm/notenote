<script setup lang="ts">
import { Search } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
</script>

<template>
  <header class="flex justify-between items-center py-4 mb-4">
    <h1>Note-note</h1>

    <Button>
      <Search width="20" />
    </Button>
  </header>
</template>
