import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage } from '@vueuse/core'

import type { NoteStateType, NoteType } from '@/types/note'

export const useNoteStore = defineStore('note', {
  state: (): NoteStateType => {
    return {
      notes: useLocalStorage('notes', []),
      note: {},
      color: '',
      isOpenFormModal: false,
      isOpenShowModal: false,
      isViewSelectColor: false
    }
  },
  actions: {
    getNoteById(id: string) {
      this.note = this.notes.find((note) => note.id === id)
    },
    createNote(note: Omit<NoteType, 'id' | 'isFavorite'>) {
      this.notes.push({
        ...note,
        id: uuidv4(),
        isFavorite: false
      })
    },
    editNote(id: string, note: NoteType) {
      const index = this.notes.findIndex((note) => note.id === id)
      this.notes[index] = note
    },
    updateIsFavoriteNote(id: string, isFavorite: boolean) {
      const index = this.notes.findIndex((note) => note.id === id)
      this.notes[index].isFavorite = isFavorite
    },
    setColor(value: string) {
      this.color = value
    },
    setOpenFormModal(value: boolean) {
      this.isOpenFormModal = value
    },
    setOpenShowModal(value: boolean) {
      this.isOpenShowModal = value
    },
    setViewSelectColor(value: boolean) {
      this.isViewSelectColor = value
    }
  }
})
