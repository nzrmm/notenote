<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { NoteCard } from '@/components'

import { useNoteStore } from '@/stores/note'

const noteStore = useNoteStore()
const { notes } = storeToRefs(noteStore)
</script>

<template>
  <h1 class="mb-16">Notes</h1>

  <div v-if="!notes.length" class="content-container grid place-items-center">
    <div class="text-center">
      <p class="font-bold">No Notes</p>
      <span>Click the Add Button to create a note.</span>
    </div>
  </div>

  <div
    v-else
    class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
  >
    <NoteCard v-for="note in notes" :key="note.date" :data="note" />
  </div>
</template>
