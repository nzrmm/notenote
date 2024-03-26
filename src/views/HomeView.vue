<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { NoteCard } from '@/components'

import { useNoteStore } from '@/stores/note'

const noteStore = useNoteStore()
const { notes } = storeToRefs(noteStore)
</script>

<template>
  <div v-if="!notes.length" class="content-container grid place-items-center">
    <div class="text-center">
      <h5>No Notes</h5>
      <span>Click the Add button to create a note.</span>
    </div>
  </div>

  <div v-else class="columns-2 space-y-4">
    <NoteCard v-for="note in notes" :key="note.date" :data="note" />
  </div>
</template>
