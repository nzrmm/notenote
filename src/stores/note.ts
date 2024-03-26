import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

import type { NoteType } from '@/types/note'

export const useNoteStore = defineStore('note', () => {
  const notes: Ref<NoteType[]> = ref(useLocalStorage('notes', []))
  const isOpenCreateModal = ref(false)

  const createNote = (note: NoteType) => {
    notes.value.push(note)
  }

  const setCloseCreateModal = () => {
    isOpenCreateModal.value = false
  }

  return { notes, isOpenCreateModal, createNote, setCloseCreateModal }
})
