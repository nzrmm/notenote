<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
</script>

<template>
  <footer class="fixed bottom-0 inset-x-0 py-4">
    <div class="flex justify-end w-[88%] mx-auto lg:max-w-4xl">
      <Button size="icon">
        <Plus width="20" />
      </Button>
    </div>
  </footer>
</template>
