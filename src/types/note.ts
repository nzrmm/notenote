import type { Ref } from 'vue'

export interface NoteType {
  title: string
  description: string
  date: string
  color: string
}

export interface NoteColor {
  name: string
  color: string
}

export interface NoteStateType {
  notes: Ref<NoteType[]>
  isOpenFormModal: boolean
}
