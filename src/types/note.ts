import type { Ref } from 'vue'

export interface NoteType {
  id: string
  note: string
  date: string
  color: string
  isFavorite: boolean
}

export interface NoteStateType {
  note: any
  notes: Ref<NoteType[]>
  color: string
  isOpenFormModal: boolean
  isViewSelectColor: boolean
}
