<script setup lang="ts">
import { Search } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
</script>

<template>
  <header class="flex justify-between items-center py-4 mb-4">
    <h2>Note2</h2>

    <Button>
      <Search width="20" />
    </Button>
  </header>
</template>
