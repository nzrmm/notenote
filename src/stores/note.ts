import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
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
    createNote(note: Omit<NoteType, 'id' | 'isFavorite'>) {
      this.notes.push({
        ...note,
        id: uuidv4(),
        isFavorite: false
      })
    },
    updateIsFavoriteNote(id: string, isFavorite: boolean) {
      const index = this.notes.findIndex((note) => note.id === id)
      this.notes[index].isFavorite = isFavorite
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
