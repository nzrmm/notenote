import type { Ref } from 'vue'

export interface NoteType {
  title: string
  date: string
}

export interface NoteStateType {
  notes: Ref<NoteType[]>
  isOpenFormModal: boolean
}
