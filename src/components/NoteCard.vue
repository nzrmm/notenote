<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { NoteType } from '@/types/note'

interface Props {
  data: NoteType
}

const { data } = defineProps<Props>()
</script>

<template>
  <div :class="cn('h-56 flex flex-col justify-between rounded-lg p-4 cursor-pointer', data.color)">
    <p>{{ data.note }}</p>
    <time :dateTime="data.date">{{ data.date }}</time>
  </div>
</template>
