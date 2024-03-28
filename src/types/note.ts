import type { Ref } from 'vue'

export interface NoteType {
  note: string
  date: string
  color: string
}

export interface NoteColor {
  name: string
  color: string
}

export interface NoteStateType {
  notes: Ref<NoteType[]>
  noteFormModal: { color: string; isOpen: boolean }
  isViewSelectColor: boolean
}
