<script setup lang="ts">
interface Props {
  data: {
    title: string
    date: string
  }
}

const props = defineProps<Props>()
</script>

<template>
  <div class="bg-slate-900/20 rounded-lg p-4 break-inside-avoid cursor-pointer">
    <h6 class="mb-4">{{ props.data.title }}</h6>
    <time :dateTime="props.data.date">{{ props.data.date }}</time>
  </div>
</template>
