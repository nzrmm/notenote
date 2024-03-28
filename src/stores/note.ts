import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

import type { NoteStateType, NoteType } from '@/types/note'

export const useNoteStore = defineStore('note', {
  state: (): NoteStateType => {
    return {
      notes: useLocalStorage('notes', []),
      noteFormModal: {
        isOpen: false,
        color: ''
      },
      isViewSelectColor: false
    }
  },
  actions: {
    createNote(note: NoteType) {
      this.notes.push(note)
    },
    setNoteFormModal(color: string, isOpen: boolean) {
      this.noteFormModal.isOpen = isOpen
      this.noteFormModal.color = color
    },
    setViewSelectColor(value: boolean) {
      this.isViewSelectColor = value
    }
  }
})
