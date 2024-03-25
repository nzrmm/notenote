<script setup lang="ts">
import { ref } from 'vue'

import { NoteCard } from '@/components'

const notes = ref([
  { title: 'How to make your personal brand stand out line', date: 'March 23, 2024' },
  {
    title: 'Spotify Reeme Bhagat on product design, music, and the key to a happy career',
    date: 'March 24, 2024'
  },
  { title: 'Beautifull weather app UI concept we wish existed', date: 'March 25, 2024' },
  { title: '10 Excellent font pairing tools for designers', date: 'March 26, 2024' },
  { title: '10 Excellent font pairing tools for designers', date: 'March 27, 2024' },
  {
    title: 'Spotify Reeme Bhagat on product design, music, and the key to a happy career',
    date: 'March 28, 2024'
  }
])
</script>

<template>
  <div class="columns-2 space-y-4">
    <NoteCard v-for="note in notes" :key="note.date" :data="note" />
  </div>
</template>
