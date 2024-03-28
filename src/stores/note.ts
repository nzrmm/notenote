import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

import type { NoteStateType, NoteType } from '@/types/note'

export const useNoteStore = defineStore('note', {
  state: (): NoteStateType => {
    return {
      notes: useLocalStorage('notes', []),
      isOpenFormModal: false
    }
  },
  actions: {
    createNote(note: NoteType) {
      this.notes.push(note)
    },
    setCloseFormModal() {
      this.isOpenFormModal = false
    }
  }
})
