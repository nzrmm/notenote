<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { NoteType } from '@/types/note'

interface Props {
  data: NoteType
}

const { data } = defineProps<Props>()
</script>

<template>
  <div :class="cn('bg-slate-900/10 rounded-lg p-4 break-inside-avoid cursor-pointer', data.color)">
    <h6 class="mb-4">{{ data.title }}</h6>
    <time :dateTime="data.date">{{ data.date }}</time>
  </div>
</template>
